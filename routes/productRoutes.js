import express from "express";
import requireSignIn from "../middlewares/authMiddleware.js";
import isAdmin from "../middlewares/adminAccessMiddleware.js";
import {
  createProductController,
  getProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";
const router = express.Router();

//routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);
//get products
router.get("/get-products", getProductController);
export default router;
