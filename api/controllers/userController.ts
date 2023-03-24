import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { validate } from "email-validator";
import { User } from "../models/userModel";
import { IUser } from "../typings";
import getErrorMessage from "../utils/dbErrorHandler";
import { config } from "../config/config";
export const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    if (password.length < 8) {
      return res
        .status(409)
        .json({ message: "Password must be at least 8 characters" });
    }
    const user = new User({ firstName, lastName, email, password });
    await user.save();
    res.json({ message: "User registered successfully" });
  } catch (error: any) {
    console.log(getErrorMessage(error));

    return res.status(400).json({ message: "Validation error", error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!validate(email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.status(401).json({ message: "Incorrect Password" });
  }
  const token = jwt.sign({ id: user._id }, config.secret, {
    expiresIn: "7d",
  });
  res.cookie("token", token, { httpOnly: true });
  if (!token) {
    return res.status(400).json({ message: "Jwt error" });
  }
  res.json({ user, message: "login successful" });
};

export const profile = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const { token } = req.cookies;
    jwt.verify(token, config.secret, async (err: any, user: any) => {
      if (err || !user) {
        console.log(getErrorMessage(err));
        return res.status(400).json({ message: "Jwt error" });
      }

      const userDoc = await User.findById(user.id).select(
        "firstName lastName email _id"
      );
      console.log(userDoc);

      return res.json(userDoc);
    });
  } catch (error) {
    console.log(getErrorMessage(error));
    return res.status(400).json({ message: "Authentication error", error });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.cookie("token", "");
    res.json({ message: "logged out successfully" });
  } catch (error) {
    console.log(getErrorMessage(error));
    return res
      .status(400)
      .json({ message: "Unable to logout. Please try again", error });
  }
};
