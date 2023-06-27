import Layout from "../components/layout/Layout";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ProductDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  //initial details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/products/get-products/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
      console.log(product._id);
    } catch (err) {
      console.log(err);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/products/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Layout>
      <h1>Product Details</h1>
      <div className="row container">
        <div className="col-md-6">
          <img
            src={`http://localhost:8080/api/v1/products/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height={"300px"}
            width={"300px"}
          />
        </div>
        <div className="col-md-6">
          <h1>Product Details</h1>
          <h6>Name: {product.name}</h6>
          <h6>Description: {product.name}</h6>
          <h6>Price: {product.price}</h6>

          <button className="btn btn-secondary ms-1">ADD TO CART</button>
        </div>
        <div className="row">
          <h4 className="text-center mt-3">Similar Products</h4>
          {relatedProducts.length < 1 && (
            <p className="text-center">No Similar Product Found</p>
          )}
          <div className="d-flex flex-wrap justify-content-center">
            {relatedProducts?.map((p) => (
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

export default ProductDetails;
