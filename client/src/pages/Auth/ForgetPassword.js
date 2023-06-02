import React from "react";
import Layout from "../../components/layout/Layout";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:8080/api/v1/auth/forgot-password`,
        {
          email,
          newPassword,
          answer,
        }
      );
      //console.log(res.data.sucess);
      if (res) {
        toast.success(res.data && res.data.message);

        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(`something Went wrong`);
    }
  };
  return (
    <Layout title={"Forgot-Password"}>
      <div className="register form-container">
        <h1 className="title">Forgot Password Page</h1>
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
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputsetAnswer1"
              aria-describedby="emailHelp"
              placeholder="Enter your favourite sports"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setnewPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="New Password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            RESET
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgetPassword;
