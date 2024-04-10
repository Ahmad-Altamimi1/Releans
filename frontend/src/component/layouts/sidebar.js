export default function () {
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
                <a href="#">
                  <i className="la la-dashboard" /> <span> Dashboard</span>{" "}
                  <span className="menu-arrow" />
                </a>
                <ul style={{ display: "none" }}>
                  <li>
                    <a href="index.php">Admin Dashboard</a>
                  </li>
                  <li>
                    <a href="employee-dashboard.php">Employee Dashboard</a>
                  </li>
                </ul>
              </li>
              <li className="menu-title">
                <span>Employees</span>
              </li>
              <li className="submenu">
                <a href="#" className="noti-dot">
                  <i className="la la-user" /> <span> Employees</span>{" "}
                  <span className="menu-arrow" />
                </a>
                <ul style={{ display: "none" }}>
                  <li>
                    <a href="employees.php">All Employees</a>
                  </li>
                  <li>
                    <a href="holidays.php">Holidays</a>
                  </li>
                  <li>
                    <a href="leaves-employee.php">Employee Leave</a>
                  </li>
                  <li>
                    <a href="departments.php">Departments</a>
                  </li>
                  <li>
                    <a href="designations.php">Designations</a>
                  </li>
                  <li>
                    <a href="timesheet.php">Timesheet</a>
                  </li>
                  <li>
                    <a href="overtime.php">Overtime</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="clients.php">
                  <i className="la la-users" /> <span>Clients</span>
                </a>
              </li>
              <li className="submenu">
                <a href="#">
                  <i className="la la-rocket" /> <span> Projects</span>{" "}
                  <span className="menu-arrow" />
                </a>
                <ul style={{ display: "none" }}>
                  <li>
                    <a href="projects.php">Projects</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="leads.php">
                  <i className="la la-user-secret" /> <span>Leads</span>
                </a>
              </li>
              <li className="menu-title">
                <span>HR</span>
              </li>
              <li className="submenu">
                <a href="#">
                  <i className="la la-files-o" /> <span> Accounts </span>{" "}
                  <span className="menu-arrow" />
                </a>
                <ul style={{ display: "none" }}>
                  <li>
                    <a href="invoices.php">Invoices</a>
                  </li>
                  <li>
                    <a href="payments.php">Payments</a>
                  </li>
                  <li>
                    <a href="expenses.php">Expenses</a>
                  </li>
                  <li>
                    <a href="provident-fund.php">Provident Fund</a>
                  </li>
                  <li>
                    <a href="taxes.php">Taxes</a>
                  </li>
                </ul>
              </li>
              <li className="submenu">
                <a href="#">
                  <i className="la la-money" /> <span> Payroll </span>{" "}
                  <span className="menu-arrow" />
                </a>
                <ul style={{ display: "none" }}>
                  <li>
                    <a href="salary.php"> Employee Salary </a>
                  </li>
                  <li>
                    <a href="salary-view.php"> Payslip </a>
                  </li>
                  <li>
                    <a href="payroll-items.php"> Payroll Items </a>
                  </li>
                </ul>
              </li>
              <li className="submenu">
                <a href="#">
                  <i className="la la-crosshairs" /> <span> Goals </span>{" "}
                  <span className="menu-arrow" />
                </a>
                <ul style={{ display: "none" }}>
                  <li>
                    <a href="goal-tracking.php"> Goal List </a>
                  </li>
                  <li>
                    <a href="goal-type.php"> Goal Type </a>
                  </li>
                </ul>
              </li>
              <li className="submenu">
                <a href="#">
                  <i className="la la-edit" /> <span> Training </span>{" "}
                  <span className="menu-arrow" />
                </a>
                <ul style={{ display: "none" }}>
                  <li>
                    <a href="training.php"> Training List </a>
                  </li>
                  <li>
                    <a href="trainers.php"> Trainers</a>
                  </li>
                  <li>
                    <a href="training-type.php"> Training Type </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="promotion.php">
                  <i className="la la-bullhorn" /> <span>Promotion</span>
                </a>
              </li>
              <li>
                <a href="resignation.php">
                  <i className="la la-external-link-square" />{" "}
                  <span>Resignation</span>
                </a>
              </li>
              <li>
                <a href="termination.php">
                  <i className="la la-times-circle" /> <span>Termination</span>
                </a>
              </li>
              <li className="menu-title">
                <span>Administration</span>
              </li>
              <li>
                <a href="assets.php">
                  <i className="la la-object-ungroup" /> <span>Assets</span>
                </a>
              </li>
              <li>
                <a href="users.php">
                  <i className="la la-user-plus" /> <span>Users</span>
                </a>
              </li>
              <li className="menu-title">
                <span>Pages</span>
              </li>
              <li className="submenu">
                <a href="#">
                  <i className="la la-user" /> <span> Profile </span>{" "}
                  <span className="menu-arrow" />
                </a>
                <ul style={{ display: "none" }}>
                  <li>
                    <a href="profile.php"> Employee Profile </a>
                  </li>
                  <li>
                    <a href="client-profile.php"> Client Profile </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="settings.php">
                  <i className="la la-cogs" /> <span>Settings</span>
                </a>
              </li>
              <li>
                <a href="logout.php">
                  <i className="la la-power-off" /> <span>Logout</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
