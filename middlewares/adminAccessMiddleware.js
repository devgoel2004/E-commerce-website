import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        sucess: false,
        message: "Unauthorized acess",
      });
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(401).send({
      sucess: false,
      error,
      message: "Error is admin middleware",
    });
  }
};

export default isAdmin;
