import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const { isAuth,logout,activeUser } = useAuth();
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  return (
    <nav id="header" style={{top: 0}} className="navbar shadow navbar-expand-lg position-sticky navbar-dark bg-primary p-3">
      <div className="container-fluid">
      <Link to="/" className="text-light text-decoration-none mb-0 font-weight-bold h1">
        Tech Kit
      </Link>
      <button className="custom-toggler navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample09" aria-controls="navbarsExample09" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}>
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item mx-2">
            <NavLink exact to="/" activeClassName="active" className="nav-link footer_link">
              Home
            </NavLink>
          </li>
          {
            isAuth && <li className="nav-item mx-2">
            <NavLink exact to="/profile" activeClassName="active" className="nav-link footer_link">
              Profile
            </NavLink>
          </li> 
          }
          <li className="nav-item mx-2">
            <a href="https://roioverload.com" className="nav-link active footer_link">
              ROIOverload.com
            </a>
          </li>
          <li className="nav-item mx-2">
            <a href="https://forms.gle/7arehbmitp5ZVgGG7" className="nav-link active footer_link">
              Add A Product
            </a>
          </li>
          {
            activeUser?.role === "admin" && <li className="nav-item mx-2">
            <NavLink exact to="/dashboard" activeClassName="active" className="nav-link footer_link">
              Dashboard
            </NavLink>
          </li>
          }
          <li className="nav-item mx-2">
            {
              isAuth ? <button onClick={logout} className="nav-link btn footer_link">
              Logout
            </button> : <NavLink to="/login" activeClassName="active" className="nav-link footer_link">
              Login
            </NavLink>
            }
          </li>
        </ul>
      </div>
      </div>
    </nav>
  );
};

export default Header;
