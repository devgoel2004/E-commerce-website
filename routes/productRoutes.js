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
  productFilterControllers,
  productCountController,
  productListController,
  searchProductController,
  relatedProductController,
  productCategoryController,
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
//filter product
router.post(`/product-filters`, productFilterControllers);
//product count
router.get(`/product-count`, productCountController);
//product per page
router.get(`/product-list/:page`, productListController);
//search product
router.get(`/search/:keyword`, searchProductController);
//similar product
router.get(`/related-product/:pid/:cid`, relatedProductController);
//category wise product
router.get(`/product-category/:slug`, productCategoryController);
export default router;
