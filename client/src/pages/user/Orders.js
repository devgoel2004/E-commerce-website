import React from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
const Orders = () => {
  return (
    <Layout title={"E commerce - Orders"}>
      <div className="container-fluid p-3">
        <div className="row">
          <div classNaame="col-md-3">
            <UserMenu />
          </div>
          <div classNaame="col-md-9">
            <h1>Orders</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
