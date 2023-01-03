import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminNav.css";
const AdminNav = () => {
  const auth = localStorage.getItem("admin");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/admin");
  };
  return (
    <div>
      {auth ? (
        <ul className="nav-ul-admin">
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <i style={{ color: "orange", fontSize: 22 }}>Welcome Admin</i>{" "}
          </li>
          <li><Link to="/users">Users</Link></li>

          <li>
            <Link onClick={logout} to="/admin">
              Logout
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul-admin nav-right">
          <li>
            {/* <Link to="/admin">login </Link> */}
          </li>
        </ul>
      )}
    </div>
  );
};

export default AdminNav;
