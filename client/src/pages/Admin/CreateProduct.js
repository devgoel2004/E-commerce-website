import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  //use State Hooks
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  //get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
      );
      console.log(data);
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
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      const { data } = axios.post(
        "http://localhost:8080/api/v1/products/create-product",
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
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
            <h1 className="text-center">Create Product</h1>
            <div className="d-flex justify-content-center">
              <div className="m-1 w-100">
                <Select
                  bordered={false}
                  placeholder="Select a Category"
                  showSearch
                  size="large"
                  className="form-select mb-3"
                  onChange={(value) => {
                    setCategory(value);
                  }}>
                  {categories?.map((c) => (
                    <Option key={c._id} value={c._id}>
                      {c.name}
                    </Option>
                  ))}
                </Select>
                <div className="mb-3 d-flex justify-content-center">
                  <label className="btn btn-outline-secondary col-md-12">
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
                  {photo && (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(photo)}
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
                    }}>
                    <Option value="0">No</Option>
                    <Option value="1">Yes</Option>
                  </Select>
                </div>
                <div className="mb-3">
                  <button className="btn btn-primary" onClick={handleCreate}>
                    CREATE PRODUCT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
