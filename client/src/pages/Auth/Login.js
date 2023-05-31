import React from "react";
import { useState } from "react";
import Layout from "../../components/layout/Layout";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/auth";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    try {
      const res = await axios.post(`http://localhost:8080/api/v1/auth/login`, {
        email,
        password,
      });
      //console.log(res.data.sucess);
      if (res) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(`something Went wrong`);
    }
  };
  return (
    <Layout title={"Login Page"}>
      <div className="register form-container">
        <h1 className="title">Login Page</h1>
        <form onSubmit={handleSubmit} className="form-div-box">
          <div className="form-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
