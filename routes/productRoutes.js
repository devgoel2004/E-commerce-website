import express from "express";
import requireSignIn from "../middlewares/authMiddleware.js";
import isAdmin from "../middlewares/adminAccessMiddleware.js";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  updateProductController,
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
//update products
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);
//get products
router.get("/get-products", getProductController);
//single products
router.get(`/get-products/:slug`, getSingleProductController);
//photo route
router.get("/product-photo/:pid", productPhotoController);
//delete product
router.delete(`/product/:pid`, requireSignIn, isAdmin, deleteProductController);
export default router;
