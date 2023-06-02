import express from "express";
import requireSignIn from "../middlewares/authMiddleware.js";
import isAdmin from "../middlewares/adminAccessMiddleware.js";
import {
  categoryController,
  createCategoryController,
  deleteCategoryController,
  getSingleCategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";

const router = express.Router();
//routes
//create category
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);
//update category
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);
//get all category
router.get("/get-category", categoryController);

//get single category
router.get("/single-category/:slug", getSingleCategoryController);

//delete category
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);
export default router;
