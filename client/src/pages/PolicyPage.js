import React from "react";
import Layout from "../components/layout/Layout";

const PolicyPage = () => {
  return (
    <Layout>
      <div className="container policy">
        <div className="row">
          <div
            className="col-lg-6 col-md-12"
            style={{ display: "flex", justifyContent: "center" }}>
            <img src="./images/security.jpg" alt="about" width={"100%"}></img>
          </div>

          <div className="col-lg-6 col-md-12 p-4">
            <p>1.privacy</p>
            <p>1.privacy</p>
            <p>1.privacy</p>
            <p>1.privacy</p>
            <p>1.privacy</p>
            <p>1.privacy</p>
            <p>1.privacy</p>
            <p>1.privacy</p>
            <p>1.privacy</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PolicyPage;
