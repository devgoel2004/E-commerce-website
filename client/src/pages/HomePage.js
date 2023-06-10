import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { Prices } from "../components/Prices";
import axios from "axios";
import { Link, useAsyncError } from "react-router-dom";
import { Checkbox, Radio } from "antd";
const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  //get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/products/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  //get Total Count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/products/product-count`
      );
      setTotal(data?.total);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/products/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  //filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filtered products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:8080/api/v1/products/product-filters`,
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Layout title={"All Products- Best Offers"}>
      <div className="container-fluid row mt-3">
        <div className="col-md-2">
          <h5 className="text-center"> Filter By Category</h5>
          <div className="d-flex flex-column ">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}>
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/*Price filter */}
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column ">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger w-100"
              onClick={() => window.location.reload()}>
              RESET FILTERS
            </button>
          </div>
        </div>

        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap justify-content-center">
            {products?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`http://localhost:8080/api/v1/products/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  height={"200px"}
                />
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h5 className="card-title">{p.name}</h5>
                    <h6 className="card-title">{p.price} Rs</h6>
                  </div>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <button className="btn btn-primary ms-1">More Details</button>
                  <button className="btn btn-secondary ms-2">
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="m-2 p-3">
          {products && products.length < total && (
            <button
              className="btn btn-warning"
              onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}>
              {loading ? "Loading ..." : "Loadmore"}
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
