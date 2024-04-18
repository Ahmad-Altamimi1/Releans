import { Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
export default function () {
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    try {
      const csrfResponse = await axios.get("/get-csrf-token");
      const csrfToken = csrfResponse.data.token;

      axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;

      const response = await axios.post("/logout");
      window.sessionStorage.clear();
      window.localStorage.clear();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="sidebar" id="sidebar">
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li className="menu-title">
                <span>Main</span>
              </li>
              <li className="submenu">
                <Link to="#">
                  <i className="la la-dashboard" /> <span> Dashboard</span>{" "}
                  <span className="menu-arrow" />
                </Link>
                <ul style={{ display: "none" }}>
                  <li>
                    <Link to="index.php">Admin Dashboard</Link>
                  </li>
                  <li>
                    <Link to="employee-dashboard.php">Employee Dashboard</Link>
                  </li>
                </ul>
              </li>
              <li className="menu-title">
                <span>Employees</span>
              </li>
              <li className="submenu">
                <Link to="#" className="noti-dot">
                  <i className="la la-user" /> <span> Employees</span>{" "}
                  <span className="menu-arrow" />
                </Link>
                <ul style={{ display: "none" }}>
                  <li>
                    <Link to="employees.php">All Employees</Link>
                  </li>
                  <li>
                    <Link to="holidays.php">Holidays</Link>
                  </li>
                  <li>
                    <Link to="leaves-employee.php">Employee Leave</Link>
                  </li>
                  <li>
                    <Link to="departments.php">Departments</Link>
                  </li>
                  <li>
                    <Link to="designations.php">Designations</Link>
                  </li>
                  <li>
                    <Link to="timesheet.php">Timesheet</Link>
                  </li>
                  <li>
                    <Link to="overtime.php">Overtime</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="clients.php">
                  <i className="la la-users" /> <span>Clients</span>
                </Link>
              </li>
              <li className="submenu">
                <Link to="#">
                  <i className="la la-rocket" /> <span> Projects</span>{" "}
                  <span className="menu-arrow" />
                </Link>
                <ul style={{ display: "none" }}>
                  <li>
                    <Link to="projects.php">Projects</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="leads.php">
                  <i className="la la-user-secret" /> <span>Leads</span>
                </Link>
              </li>
              <li className="menu-title">
                <span>HR</span>
              </li>
              <li className="submenu">
                <Link to="#">
                  <i className="la la-files-o" /> <span> Accounts </span>{" "}
                  <span className="menu-arrow" />
                </Link>
                <ul style={{ display: "none" }}>
                  <li>
                    <Link to="invoices.php">Invoices</Link>
                  </li>
                  <li>
                    <Link to="payments.php">Payments</Link>
                  </li>
                  <li>
                    <Link to="expenses.php">Expenses</Link>
                  </li>
                  <li>
                    <Link to="provident-fund.php">Provident Fund</Link>
                  </li>
                  <li>
                    <Link to="taxes.php">Taxes</Link>
                  </li>
                </ul>
              </li>
              <li className="submenu">
                <Link to="#">
                  <i className="la la-money" /> <span> Payroll </span>{" "}
                  <span className="menu-arrow" />
                </Link>
                <ul style={{ display: "none" }}>
                  <li>
                    <Link to="salary.php"> Employee Salary </Link>
                  </li>
                  <li>
                    <Link to="salary-view.php"> Payslip </Link>
                  </li>
                  <li>
                    <Link to="payroll-items.php"> Payroll Items </Link>
                  </li>
                </ul>
              </li>
              <li className="submenu">
                <Link to="#">
                  <i className="la la-crosshairs" /> <span> Goals </span>{" "}
                  <span className="menu-arrow" />
                </Link>
                <ul style={{ display: "none" }}>
                  <li>
                    <Link to="goal-tracking.php"> Goal List </Link>
                  </li>
                  <li>
                    <Link to="goal-type.php"> Goal Type </Link>
                  </li>
                </ul>
              </li>
              <li className="submenu">
                <Link to="#">
                  <i className="la la-edit" /> <span> Training </span>{" "}
                  <span className="menu-arrow" />
                </Link>
                <ul style={{ display: "none" }}>
                  <li>
                    <Link to="training.php"> Training List </Link>
                  </li>
                  <li>
                    <Link to="trainers.php"> Trainers</Link>
                  </li>
                  <li>
                    <Link to="training-type.php"> Training Type </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="promotion.php">
                  <i className="la la-bullhorn" /> <span>Promotion</span>
                </Link>
              </li>
              <li>
                <Link to="resignation.php">
                  <i className="la la-external-link-square" />{" "}
                  <span>Resignation</span>
                </Link>
              </li>
              <li>
                <Link to="termination.php">
                  <i className="la la-times-circle" /> <span>Termination</span>
                </Link>
              </li>
              <li className="menu-title">
                <span>Administration</span>
              </li>
              <li>
                <Link to="assets.php">
                  <i className="la la-object-ungroup" /> <span>Assets</span>
                </Link>
              </li>
              <li>
                <Link to="users.php">
                  <i className="la la-user-plus" /> <span>Users</span>
                </Link>
              </li>
              <li className="menu-title">
                <span>Pages</span>
              </li>
              <li className="submenu">
                <Link to="#">
                  <i className="la la-user" /> <span> Profile </span>{" "}
                  <span className="menu-arrow" />
                </Link>
                <ul style={{ display: "none" }}>
                  <li>
                    <Link to="profile.php"> Employee Profile </Link>
                  </li>
                  <li>
                    <Link to="client-profile.php"> Client Profile </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="settings.php">
                  <i className="la la-cogs" /> <span>Settings</span>
                </Link>
              </li>
              <li
                onClick={() => {
                  handleLogout();
                }}
              >
                <Link>
                  <i className="la la-power-off" /> <span>Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
