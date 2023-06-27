import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
const CategoryProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getProductsByCat();
  }, [params?.slug]);
  const getProductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/products/product-category/${params.slug}`
      );
      setProducts(data?.product);
      setCategory(data?.category);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Layout>
      <div className="container mt-3">
        <h2 className="text-center">Category - {category?.name}</h2>
        <h6 className="text-center">{product?.length} result found</h6>
        <div className="row">
          <div className="d-flex flex-wrap justify-content-center">
            {product?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  height={"200px"}
                  src={`http://localhost:8080/api/v1/products/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text"> $ {p.price}</p>
                  <button
                    class="btn btn-primary ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}>
                    More Details
                  </button>
                  <button class="btn btn-secondary ms-1">ADD TO CART</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
