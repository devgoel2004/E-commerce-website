import React from "react";
import Layout from "../components/layout/Layout";

const About = () => {
  return (
    <Layout>
      <div className="container about-container">
        <div className="row">
          <div className="col-lg-6 col-md-12">
            <img width={"100%"} alt="about" src="./images/about.png"></img>
          </div>
          <div className="col-lg-6 col-md-12 mt-4">
            <p className="about-paragraph" style={{ padding: "10px" }}>
              Welcome to our E-commerce website!
              <br></br>
              <br />
              At <b> Balaji Feb Tex</b>, we are passionate about providing you
              with an exceptional online shopping experience. Our goal is to
              make your journey through our virtual aisles as smooth and
              enjoyable as possible.
              <br />
              <br />
              What sets us apart is our commitment to quality. We carefully
              select our suppliers and partners, ensuring that each item you
              find on our website meets our high standards. We believe in
              delivering products that not only meet but exceed your
              expectations.
              <br />
              <br />
              We also value the trust you place in us when you choose to shop
              with us. Our secure payment gateways and privacy measures are
              designed to safeguard your personal information. Rest assured,
              your data is treated with the utmost confidentiality.
              <br />
              <br />
              Thank you for choosing Balaji Feb Tex as your preferred online
              shopping destination. We hope you enjoy exploring our website and
              discovering the perfect products that enhance your lifestyle. We
              look forward to serving you and building a long-lasting
              relationship.
              <br></br>
              <br />
              Happy Shopping!
              <br />
              <br />
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
