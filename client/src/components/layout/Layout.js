import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";


const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content="Free Web tutorials"></meta>
        <meta name="keywords" content="HTML, CSS, JavaScript"></meta>
        <meta name="author" content="John Doe"></meta>
      </Helmet>
      <Header></Header>
      <main style={{ minHeight: "75.5vh" }}>
        <Toaster />

        {children}
      </main>
      <Footer></Footer>
    </div>
  );
};
Layout.defaultProps = {
  title: "E commerce App",
  description: "mern stack project",
  keywords: "mern,react,node,mongodb",
  author: "Dev Goel",
};
export default Layout;
