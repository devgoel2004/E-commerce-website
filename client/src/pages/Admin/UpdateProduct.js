import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;
const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  //use State Hooks
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [id, setId] = useState("");
  //get single products
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/products/get-products/${params.slug}`
      );
      setName(data.product.name);
      setDescription(data.product.description);
      setPrice(data.product.price);
      //console.log(data.product);
      setCategory(data.product.category._id);
      //console.log(category);
      setQuantity(data.product.quantity);
      setId(data.product._id);
      //console.log(id);
      setShipping(data.product.shipping);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getSingleProduct();
  }, []);
  //get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
      );

      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (err) {
      console.log(err);
      toast.error(`Something went wrong in getting category`);
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);
  //CREATE PRODUCT FUNCTION
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      const { data } = axios.put(
        `http://localhost:8080/api/v1/products/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  //delete a product
  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/products/product/${id}`
      );
      toast.success("Product Deleted Successfull");
      navigate("/dashboard/admin/products");
    } catch (err) {
      console.log(err);
      toast.error("Something went Wrong");
    }
  };
  return (
    <Layout title={"Dashboard - Create Products"}>
      <div className="container-fluid  p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center mt-2">Update Product</h1>
            <div className="m-1 w-90">
              <Select
                bordered={false}
                placeholder="Select a Category"
                showSearch
                size="large"
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category}>
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3 d-flex justify-content-center">
                <label className="btn btn-outline-secondary">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => {
                      setPhoto(e.target.files[0]);
                    }}
                    hidden></input>
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product-photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`http://localhost:8080/api/v1/products/product-photo/${id}`}
                      alt="product-photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Write a Name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}></input>
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="Write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}></textarea>
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="Write a Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}></input>
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="Write a Quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}></input>
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="select Shipping"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                  value={shipping ? "YES" : "NO"}>
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3 d-flex justify-content-between">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  UPDATE PRODUCT
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                  DELETE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
