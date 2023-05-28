import React from "react";
import Layout from "../components/layout/Layout";
import { Link } from "react-router-dom";
const PageNotFound = () => {
  return (
    <Layout>
      <div className="pageNotFound">
        <div className="text-center page-not-found">
          <h1>404</h1>
          <h2>Oops ! Page Not Found</h2>
          <Link to="/">
            <button>Go Back</button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default PageNotFound;
