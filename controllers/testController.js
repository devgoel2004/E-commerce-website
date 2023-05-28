import { hash } from "bcrypt";
import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";
const testController = (req, res) => {
  console.log("protected route");
};

export default testController;
