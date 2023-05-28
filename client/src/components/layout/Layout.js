import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Title</title>
        <meta name="description" content="Free Web tutorials"></meta>
        <meta name="keywords" content="HTML, CSS, JavaScript"></meta>
        <meta name="author" content="John Doe"></meta>
      </Helmet>
      <Header></Header>
      <main style={{ minHeight: "75.5vh" }}>{children}</main>
      <Footer></Footer>
    </div>
  );
};

export default Layout;
