import Layout from "../components/layout/Layout";
import React from "react";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "INR",
      });
    } catch (err) {
      console.log(err);
    }
  };
  //delete item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2">
              {`Hello ${auth?.token && auth?.user.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length >= 1
                ? `You Have ${cart.length} item in your cart ${
                    auth?.token ? " " : "PLease login to checkout"
                  }`
                : "Your cart is empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-8">
                {cart?.map((p) => (
                  <div className="row">
                    <div className="col-md-4">
                      <img
                        src={`http://localhost:8080/api/v1/products/product-photo/${p._id}`}
                        className="card-img-top"
                        alt={p.name}
                        width="120px"
                        height={"120px"}
                      />
                    </div>
                    <div className="col-md-8">
                      <h4>{p.name}</h4>
                      <p>{p.description.substring(0, 30)}</p>
                      <h4>Price : {p.price}</h4>
                      <button
                        className="btn btn-danger"
                        onClick={() => removeCartItem()}>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-md-4">
            {" "}
            Total | Checkout | Payment
            <hr />
            <h4>Total : {totalPrice()}</h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}>
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}>
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/login")}>
                    Please login to Checkout
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
