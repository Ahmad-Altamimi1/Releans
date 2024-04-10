import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

import { Link } from "react-router-dom";

// const fetchMovements = async () => {
//   try {
//     const response = await axios.get("http://127.0.0.1:8000/api/movements");
//     console.log(response.data);
//     return response.data.movements;
//   } catch (error) {
//     throw new Error("Network response was not ok");
//   }
// };

// export default function () {

//   const {
//     data: Movements,
//     isLoading,
//     error,
//     refetch,
//   } = useQuery("Movements", fetchMovements);
//   const handleRefetch = () => {
//     refetch();
//   };
//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

// ------------------------------------------------------

const fetchNotifications = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/notifications");
    console.log(response.data);
    return response.data.notifications;
  } catch (error) {
    throw new Error("Network response was not ok");
  }
};

export default function () {
  const {
    data: notifications,
    isLoading,
    error,
    refetch,
  } = useQuery("notifications", fetchNotifications);
  const handleRefetch = () => {
    refetch();
  };
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, user-scalable=0"
      />
      <meta name="description" content="Smarthr - Bootstrap Admin Template" />
      <meta
        name="keywords"
        content="admin, estimates, bootstrap, business, corporate, creative, management, minimal, modern, accounts, invoice, html5, responsive, CRM, Projects"
      />
      <meta name="author" content="Dreamguys - Bootstrap Admin Template" />
      <meta name="robots" content="noindex, nofollow" />
      <title>Clients - HRMS admin template</title>
      {/* Favicon */}

      {/* Main CSS */}
      {/* HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries */}
      {/*[if lt IE 9]>
			
			
		<![endif]*/}
      {/* Main Wrapper */}
      <div className="main-wrapper"></div>

      <div className="header">
        {/* Logo */}
        <div className="header-left">
          <Link href="index.php" className="logo">
            <img src="assets/img/logo.png" width={40} height={40} alt="" />
          </Link>
        </div>
        {/* /Logo */}
        <Link id="toggle_btn" href="javascript:void(0);">
          <span className="bar-icon">
            <span />
            <span />
            <span />
          </span>
        </Link>
        {/* Header Title */}
        <div className="page-title-box">
          <h3>Dreamguy's Technologies</h3>
        </div>
        {/* /Header Title */}
        <Link id="mobile_btn" className="mobile_btn" href="#sidebar">
          <i className="fa fa-bars" />
        </Link>
        {/* Header Menu */}
        <ul className="nav user-menu">
          {/* Search */}
          <li className="nav-item">
            <div className="top-nav-search">
              <Link href="javascript:void(0);" className="responsive-search">
                <i className="fa fa-search" />
              </Link>
              <form action="search.php">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Search here"
                />
                <button className="btn" type="submit">
                  <i className="fa fa-search" />
                </button>
              </form>
            </div>
          </li>
          {/* /Search */}
          {/* Notifications */}
          <li className="nav-item dropdown">
            <Link
              href="#"
              className="dropdown-toggle nav-link"
              data-toggle="dropdown"
            >
              <i className="fa fa-bell-o" />{" "}
              <span className="badge badge-pill">
                {notifications && notifications.length}
              </span>
            </Link>
            <div className="dropdown-menu notifications">
              <div className="topnav-dropdown-header">
                <span className="notification-title">Notifications</span>
                <Link href="javascript:void(0)" className="clear-noti">
                  {" "}
                  Clear All{" "}
                </Link>
              </div>
              <div className="noti-content">
                <ul className="notification-list">
                  {notifications &&
                    notifications.map((notification) => (
                      <li className="notification-message">
                        <Link href="activities.php">
                          <div className="media">
                            <span className="avatar">
                              <img
                                alt=""
                                src="assets/img/profiles/avatar-02.jpg"
                              />
                            </span>
                            <div className="media-body">
                              <p className="noti-details">
                                <span className="noti-title">
                                  {notification.user.name}
                                </span>{" "}
                                <span className="noti-title">
                                  {notification.message}
                                </span>
                              </p>
                              <p className="noti-time">
                                <span className="notification-time">
                                  4 mins ago
                                </span>
                              </p>
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
              <div className="topnav-dropdown-footer">
                <Link href="activities.php">View all Notifications</Link>
              </div>
            </div>
          </li>
          {/* /Notifications */}
          {/* Message Notifications */}
          <li className="nav-item dropdown">
            <Link
              href="#"
              className="dropdown-toggle nav-link"
              data-toggle="dropdown"
            >
              <i className="fa fa-comment-o" />{" "}
              <span className="badge badge-pill">8</span>
            </Link>
            <div className="dropdown-menu notifications">
              <div className="topnav-dropdown-header">
                <span className="notification-title">Messages</span>
                <Link href="javascript:void(0)" className="clear-noti">
                  {" "}
                  Clear All{" "}
                </Link>
              </div>
              <div className="noti-content">
                <ul className="notification-list">
                  <li className="notification-message">
                    <Link href="chat.php">
                      <div className="list-item">
                        <div className="list-left">
                          <span className="avatar">
                            <img
                              alt=""
                              src="assets/img/profiles/avatar-09.jpg"
                            />
                          </span>
                        </div>
                        <div className="list-body">
                          <span className="message-author">Richard Miles </span>
                          <span className="message-time">12:28 AM</span>
                          <div className="clearfix" />
                          <span className="message-content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="notification-message">
                    <Link href="chat.php">
                      <div className="list-item">
                        <div className="list-left">
                          <span className="avatar">
                            <img
                              alt=""
                              src="assets/img/profiles/avatar-02.jpg"
                            />
                          </span>
                        </div>
                        <div className="list-body">
                          <span className="message-author">John Doe</span>
                          <span className="message-time">6 Mar</span>
                          <div className="clearfix" />
                          <span className="message-content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="notification-message">
                    <Link href="chat.php">
                      <div className="list-item">
                        <div className="list-left">
                          <span className="avatar">
                            <img
                              alt=""
                              src="assets/img/profiles/avatar-03.jpg"
                            />
                          </span>
                        </div>
                        <div className="list-body">
                          <span className="message-author">
                            {" "}
                            Tarah Shropshire{" "}
                          </span>
                          <span className="message-time">5 Mar</span>
                          <div className="clearfix" />
                          <span className="message-content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="notification-message">
                    <Link href="chat.php">
                      <div className="list-item">
                        <div className="list-left">
                          <span className="avatar">
                            <img
                              alt=""
                              src="assets/img/profiles/avatar-05.jpg"
                            />
                          </span>
                        </div>
                        <div className="list-body">
                          <span className="message-author">Mike Litorus</span>
                          <span className="message-time">3 Mar</span>
                          <div className="clearfix" />
                          <span className="message-content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="notification-message">
                    <Link href="chat.php">
                      <div className="list-item">
                        <div className="list-left">
                          <span className="avatar">
                            <img
                              alt=""
                              src="assets/img/profiles/avatar-08.jpg"
                            />
                          </span>
                        </div>
                        <div className="list-body">
                          <span className="message-author">
                            {" "}
                            Catherine Manseau{" "}
                          </span>
                          <span className="message-time">27 Feb</span>
                          <div className="clearfix" />
                          <span className="message-content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="topnav-dropdown-footer">
                <Link href="chat.php">View all Messages</Link>
              </div>
            </div>
          </li>
          {/* /Message Notifications */}

          <li className="nav-item dropdown has-arrow main-drop">
            <Link
              href="#"
              className="dropdown-toggle nav-link"
              data-toggle="dropdown"
            >
              <span className="user-img">
                <img
                  src="./profiles/<?php echo htmlentities($result->Picture);?>"
                  alt="User Picture"
                />
                <span className="status online" />
              </span>
              <span>
                {/*?php echo htmlentities(ucfirst($_SESSION['userlogin']));?*/}
              </span>
            </Link>
            <div className="dropdown-menu">
              <Link className="dropdown-item" href="profile.php">
                My Profile
              </Link>
              <Link className="dropdown-item" href="settings.php">
                Settings
              </Link>
              <Link className="dropdown-item" href="logout.php">
                Logout
              </Link>
            </div>
          </li>
        </ul>
        {/* /Header Menu */}
        {/* Mobile Menu */}
        <div className="dropdown mobile-user-menu">
          <Link
            href="#"
            className="nav-link dropdown-toggle"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-ellipsis-v" />
          </Link>
          <div className="dropdown-menu dropdown-menu-right">
            <Link className="dropdown-item" href="profile.php">
              My Profile
            </Link>
            <Link className="dropdown-item" href="settings.php">
              Settings
            </Link>
            <Link className="dropdown-item" href="login.php">
              Logout
            </Link>
          </div>
        </div>
        {/* /Mobile Menu */}
      </div>
    </>
  );
}
