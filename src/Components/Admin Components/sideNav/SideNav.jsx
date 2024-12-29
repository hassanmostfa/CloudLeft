import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./sideNav.css";
import logo from "../../../images/HassanLogo.png";
import userImage from "../../../images/user-photo.jpg";
const SideNav = ({ isSidebarOpen }) => {
  const navigate = useNavigate();
  // const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to manage sidebar visibility

  const handleLogout = () => {
    localStorage.clear();
  };

  return (
    <div>
      <nav className={isSidebarOpen ? "sidebar" : "hidden sidebar"} id="sidebar">
        <ul className="nav">
          <li className="nav-item nav-profile mt-2">
            <NavLink className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
              {/* <Link className="navbar-brand brand-logo" to="#"><img src={logo} alt="logo" /></Link> */}
              {/* <Link className="navbar-brand brand-logo-mini" to="#"><img src={logo} alt="logo" /></Link> */}
              <Link className="d-flex align-items-center justify-content-center" to="#">
                <h3 style={{ fontWeight: "700" , color: "var(--main-color)" }} className="text-center">CLoudleft Team</h3>
              </Link>
            </NavLink>
           
          </li>
          

          
          <li className="nav-item">
            <NavLink
              className="nav-link justify-content-between"
              data-bs-toggle="collapse"
              to="#services"
              aria-expanded="false"
              aria-controls="ui-basic"
            >
              <div>
                <i class="fa fa-cutlery" aria-hidden="true" onClick={() => navigate("/")}></i>
                <span className="menu-title" style={{ fontWeight: "700" }}>
                  Food Products
                </span>
              </div>
              <i className="menu-arrow" style={{ marginLeft: "75px" }} />
            </NavLink>
            <div className="collapse" id="services">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    All Products 
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/add-product">
                     Add Product
                  </Link>
                </li>

              </ul>
            </div>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link justify-content-between"
              data-bs-toggle="collapse"
              to="#bookings"
              aria-expanded="false"
              aria-controls="ui-basic"
            >
              <div>
                <i class="fa fa-shopping-bag" aria-hidden="true" onClick={() => navigate("/admin/bookings")}></i>
                <span className="menu-title" style={{ fontWeight: "700" }}>
                  Non Food Products
                </span>
              </div>
              <i className="menu-arrow" style={{ marginLeft: "75px" }} />
            </Link>
            <div className="collapse" id="bookings">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/non-food/products">
                    All Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/add-product">
                     Add Product
                  </Link>
                </li>

              </ul>
            </div>
          </li>
          
{/* 
          <li className="nav-item" onClick={() => handleLogout()}>
            <Link className="nav-link" to="/login" >
            <i className="fa fa-sign-out" aria-hidden="true" />
            <span className="menu-title" style={{ fontWeight: "700" }}>
              تسجيل الخروج
            </span>
            </Link>
          </li> */}
        </ul>
      </nav>
    </div>
  );
};

export default SideNav;
