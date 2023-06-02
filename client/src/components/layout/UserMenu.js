import React from "react";

import { NavLink } from "react-router-dom";
const UserMenu = () => {
  return (
    <div>
      <div className="text-center">
        <h4>Admin Panel</h4>
        <ul className="list-group">
          <NavLink
            to="/dashboard/user/profile "
            className="list-group-item list-group-item-action">
            Profile
          </NavLink>
          <NavLink
            to="/dashboard/user/orders "
            className="list-group-item list-group-item-action">
            Orders
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default UserMenu;
