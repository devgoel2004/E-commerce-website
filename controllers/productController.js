import slugify from "slugify";
import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import fs from "fs";
export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is required" });
      case !description:
        return res.status(500).send({ error: "Description is required" });
      case !price:
        return res.status(500).send({ error: "Price is required" });
      case !category:
        return res.status(500).send({ error: "Category is required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is required" });
      case !photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "Photo is required & should be less than 1mb" });
    }
    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.Type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfull",
      products,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      err,
      message: "Error in creating product",
    });
  }
};

//get all products
export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate(`category`)
      .select("-photo")
      .limit(12)
      .sort({ createAt: -1 });
    res.status(200).send({
      success: true,
      message: "All products",
      products,
      counTotal: products.length,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      err,
      message: "Error in getting products",
    });
  }
};
//get single product
export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select(`photo`)
      .select(`name`)
      .select(`price`)
      .select(`description`)
      .select(`shipping`)
      .select(`quantity`)
      .populate(`category`);
    res.status(200).send({
      success: true,
      product,
      message: `Single product fetched`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error while getting singple products",
    });
  }
};
//
export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select(`photo`);
    if (product.photo.data) {
      res.set(`Content-type`, product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: `Error while get photo`,
      err,
    });
  }
};
//delete products
export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select(`-photo`);
    res.status(200).send({
      success: true,
      message: `Product deleted successfully`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: `Error while deleting`,
      err,
    });
  }
};
//update products
export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is required" });
      case !description:
        return res.status(500).send({ error: "Description is required" });
      case !price:
        return res.status(500).send({ error: "Price is required" });
      case !category:
        return res.status(500).send({ error: "Category is required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is required" });
      case !photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "Photo is required & should be less than 1mb" });
    }
    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { name: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.Type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product updated Successfull",
      products,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      err,
      message: "Error in updated product",
    });
  }
};
//const product filter
export const productFilterControllers = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      success: false,
      message: `Error while Filter Products`,
    });
  }
};
//product count
export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      message: `Error in product count`,
      err,
      success: false,
    });
  }
};
//product per page
export const productListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      success: false,
      message: `Error in per page ctrl`,
      err,
    });
  }
};
//search product controller
export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(results);
  } catch (err) {
    console.log(err);
    res.status(400).send({
      success: false,
      message: `Error in Search product API`,
      err,
    });
  }
};
//similar product controller
export const relatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      success: false,
      message: "Error while getting related product",
    });
  }
};

//get product by cat
export const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const product = await productModel.find({ category }).populate(`category`);
    res.status(200).send({
      success: true,
      category,
      product,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      success: false,
      err,
      message: `Error while getting products`,
    });
  }
};
