import React from "react";

import { NavLink } from "react-router-dom";
const AdminMenu = () => {
  return (
    <div className="text-center">
      <h4>Admin Panel</h4>
      <ul className="list-group">
        <NavLink
          to="/dashboard/admin/create-category "
          className="list-group-item list-group-item-action">
          Create Category
        </NavLink>
        <NavLink
          to="/dashboard/admin/create-products "
          className="list-group-item list-group-item-action">
          Create Products
        </NavLink>
        <NavLink
          to="/dashboard/admin/users "
          className="list-group-item list-group-item-action">
          Users
        </NavLink>
      </ul>
    </div>
  );
};

export default AdminMenu;
