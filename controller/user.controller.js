// user controller
import bcrypt from "bcrypt";
import { usermodel } from "../model/user.model.js";
import { generateToken } from "../utils/generateToken.js";
export const Newuser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // alredy exsting
    const alredyEx = await usermodel.findOne({ email });
    if (alredyEx) {
      return res.json({ message: "user alredy registered" });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const newuser = new usermodel({
      username,
      email,
      password: hashpassword,
    });
    // database save
    await newuser.save();
    // token
    const token = await generateToken({ id: newuser._id, email });

    // token failed
    if (!token) {
      console.error("Token generation failed");
      return res.json({ error: "someting wrong" });
    }
    //    cookies set

    res.cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000,
    });
    // response
    res.json({ message: "new user register", newuser, token });
  } catch (error) {
    console.error("Registration error:", error);
    res.json({ error: "registration failed" });
  }
};

// login user

export const loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user
    const user = await usermodel.findOne({
      email,
    });

    if (!user) {
      return res.json({ message: "user not found" });
    }
    // check password
    const passwordvalid = await bcrypt.compare(password, user.password);

    if (!passwordvalid) {
      return res.json({ message: "password not valid" });
    }
    // token
    const token = await generateToken({ id: user._id, email });
    // token failed
    if (!token) {
      return res.json({ error: "someting wrong" });
    }
    res.cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ message: "login successfully", user, token });
  } catch (error) {
    res.json({ error: "login failed" });
  }
};

// logout user
export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ message: "logout successfully" });
  } catch (error) {
    res.json({ error: "logout failed" });
  }
};
