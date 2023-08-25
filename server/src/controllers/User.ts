import { Response, Request, NextFunction } from "express";
import UserModel, { IUser } from "../models/User";
import { auth } from "../middlewares/auth";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const UserSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { firstName, lastName, email, password, budget } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email: email }).exec();
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await UserModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      budget,
    });
    console.log("aaa", newUser);

    return res.json(newUser);
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const UserSignIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const oldUser = await UserModel.findOne({ email });
    if (!oldUser) {
      console.log("first");
      return res.status(404).json({ message: "Email doesn't exists" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      {
        email: oldUser.email,
        id: oldUser._id,
      },
      "maarij"
    );
    res.status(200).json({ token });
  } catch (error) {
    console.log(`error ${error}`);
    res.status(500).json({ message: "Something went wrong" });
  }
};
