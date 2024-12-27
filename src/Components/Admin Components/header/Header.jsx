import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import adminImage from "../../../images/admin-photo.png";
import logo from "../../../images/Logo.png";
const Header = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  let name = JSON.parse(localStorage.getItem("user"))?.name || "Admin";

  // Logout Function
  const logout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
    window.location.href = "/login";
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
    document.body.classList.toggle("sidebar-icon-only", !sidebarVisible);
  };
  return (
    <div>
      <nav className="navbar default-layout-navbar  col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div className="navbar-menu-wrapper w-100 d-flex align-items-center justify-content-between">
        <button
            className="navbar-toggler navbar-toggler align-self-center"
            type="button"
            onClick={toggleSidebar}
          >
            <span className="mdi mdi-menu" />
          </button>

        

          <ul className="navbar-nav navbar-nav-left m-0">
            <li className="nav-item d-none d-lg-block full-screen-link">
              <Link className="nav-link">
                <i className="mdi mdi-fullscreen" id="fullscreen-button" />
              </Link>
            </li>

            {/* message dropdown */}
            <li className="nav-item dropdown">
              <a
                className="nav-link count-indicator dropdown-toggle"
                id="messageDropdown"
                href="#"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="mdi mdi-email-outline" />
                <span className="count-symbol bg-warning" />
              </a>
              <div
                className="dropdown-menu dropdown-menu-end navbar-dropdown preview-list"
                style={{ right: "-50px" }}
                aria-labelledby="messageDropdown"
              >
                <h6 className="p-3 mb-0 text-center">الرسائل</h6>
                <div className="dropdown-divider" />
                <a className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <img src={adminImage} alt="image" className="profile-pic" />
                  </div>
                  <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                    <h6 className="preview-subject ellipsis mb-1 font-weight-normal">
                      ارسل حسن اليك رسالة نصية
                    </h6>
                    <p className="text-gray mb-0"> منذ 4 ساعات </p>
                  </div>
                </a>
                <div className="dropdown-divider" />
                <h6 className="p-3 mb-0 text-center">4 رسائل جديدة</h6>
              </div>
            </li>
            {/* message dropdown */}

            {/* notification dropdown */}

            <li className="nav-item dropdown">
              <a
                className="nav-link count-indicator dropdown-toggle"
                id="notificationDropdown"
                href="#"
                data-bs-toggle="dropdown"
              >
                <i
                  className="mdi mdi-bell-outline"
                  style={{ color: "var(--main-color)" }}
                />
                <span className="count-symbol bg-danger" />
              </a>
              <div
                className="dropdown-menu dropdown-menu-end navbar-dropdown preview-list"
                style={{ right: "-15px" }}
                aria-labelledby="notificationDropdown"
              >
                <h6 className="p-3 mb-0 text-center">الاشعارات</h6>
                <div className="dropdown-divider" />
                <a className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-success">
                      <i className="mdi mdi-calendar" />
                    </div>
                  </div>
                  <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                    <h6 className="preview-subject font-weight-normal mb-1">
                      Event today
                    </h6>
                    <p className="text-gray ellipsis mb-0">
                      {" "}
                      Just a reminder that you have an event today{" "}
                    </p>
                  </div>
                </a>
                <div className="dropdown-divider" />
                <h6 className="p-3 mb-0 text-center">شاهد كل الاشعارات</h6>
              </div>
            </li>
            {/* notification dropdown */}
          </ul>
          <button
            className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
            type="button"
            data-toggle="offcanvas"
            onClick={() => document.body.classList.toggle("sidebar-icon-only")}
          >
            <span className="mdi mdi-menu" />
          </button>
        </div>
      </nav>
    </div>
  );
};
// Fullscreen toggle function
const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
};
export default Header;
