import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, email, password, address, phone);
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/register",
        { name, email, password, phone, address }
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
    <Layout title={"Register - Balaji Feb Tex"}>
      <div className="register form-container">
        <h1 className="title">Register Form</h1>
        <form onSubmit={handleSubmit} className="form-div-box">
          <div className="form-group">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputName1"
              aria-describedby="emailHelp"
              placeholder="Enter Name"
              required
            />
          </div>
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
          <div className="form-group">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="exampleInputPhone"
              aria-describedby="emailHelp"
              placeholder="Enter Mobile Number"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              className="form-control"
              id="exampleInputAddress"
              aria-describedby="emailHelp"
              placeholder="Enter Address"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
