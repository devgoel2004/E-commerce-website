import { hash } from "bcrypt";
import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    //validations
    if (!name) {
      return res.send({ message: `Name is required` });
    }
    if (!email) {
      return res.send({ message: `Email is required` });
    }
    if (!password) {
      return res.send({ message: `Password is required` });
    }
    if (!phone) {
      return res.send({ message: `Phone is required` });
    }
    if (!address) {
      return res.send({ message: `Address is required` });
    }
    if (!answer) {
      return res.send({ message: `Answer is required` });
    }
    //existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: `Already Register please Login!`,
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    }).save();
    res.status(201).json({
      success: true,
      message: `User registration is sucessfull`,
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: `Error in registeration`,
      error,
    });
  }
};
export default registerController;
//POST LOGIN
