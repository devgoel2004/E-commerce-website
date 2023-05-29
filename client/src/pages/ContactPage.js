import React from "react";
import Layout from "../components/layout/Layout";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { TfiHeadphoneAlt } from "react-icons/tfi";
const ContactPage = () => {
  return (
    <Layout title={"Contact Us - BalajiFabTex"}>
      <div className="container contact-page">
        <div className="row contact">
          <div className="contactImage col-lg-6 col-md-12">
            <img
              className="contactBanner"
              alt="contact"
              src="./Images/contact.jpg"></img>
          </div>
          <div className="col-lg-6 col-md-12 contact-heading">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <h1 className=" heading text-center bg-dark text-light mt-3">
                Contact Us
              </h1>
            </div>
            <p className="mt-3">
              Any query and info about product feel free to call anytime we 24X7
              vialiable
            </p>
            <p className="mt-3">
              <AiOutlineMail /> : www.help@BalajiFebTex.com
            </p>
            <p className="mt-3">
              <AiOutlinePhone /> : 9897525611
            </p>
            <p>
              <TfiHeadphoneAlt /> : 1800-0000-0000(toll-free)
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
