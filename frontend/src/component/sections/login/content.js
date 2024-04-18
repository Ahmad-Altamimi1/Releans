import React, { useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function () {
  const navigate = useNavigate();

  const [email, Setemail] = useState("");
  const [password, Setpassword] = useState("");

  const handleLogin = async (e) => {
    if (e) {
      e.preventDefault();
    }

    try {
      const csrfResponse = await axios.get("/get-csrf-token");
      const csrfToken = csrfResponse.data.token;

      axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;

      const response = await axios.post("/login", { email, password });

      Setemail("");
      Setpassword("");

      console.log("responseresponseresponse", response.data.token);
      sessionStorage.setItem("token", response.data.token);
      console.log(response.data.user);
      sessionStorage.setItem("user", response.data.user);
      navigate("/products");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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
        <title>Login - HRMS admin</title>
        {/* Favicon */}
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="assets/img/favicon.png"
        />
        {/* Bootstrap CSS */}
        <link rel="stylesheet" href="assets/css/bootstrap.min.css" />
        {/* Fontawesome CSS */}
        <link rel="stylesheet" href="assets/css/font-awesome.min.css" />
        {/* Main CSS */}
        <link rel="stylesheet" href="assets/css/style.css" />

        {/* Main Wrapper */}
        <div className="main-wrapper">
          <div className="account-content">
            <div className="container">
              {/* Account Logo */}
              <div className="account-logo">
                <a href="index.php">
                  <img src="assets/img/logo2.png" alt="Company Logo" />
                </a>
              </div>
              {/* /Account Logo */}
              <div className="account-box">
                <div className="account-wrapper">
                  <h3 className="account-title"> Login</h3>
                  {/* Account Form */}
                  <form onSubmit={handleLogin}>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        className="form-control"
                        name="email"
                        value={email}
                        onChange={(e) => {
                          Setemail(e.target.value);
                        }}
                        required=""
                        type="text"
                      />
                    </div>
                    <div className="form-group">
                      <div className="row">
                        <div className="col">
                          <label>Password</label>
                        </div>
                      </div>
                      <input
                        className="form-control"
                        name="password"
                        value={password}
                        onChange={(e) => {
                          Setpassword(e.target.value);
                        }}
                        required=""
                        type="password"
                      />
                    </div>
                    <div className="form-group text-center">
                      <button
                        className="btn btn-primary account-btn"
                        name="login"
                        type="submit"
                      >
                        Login
                      </button>
                      <div className="col-auto pt-2">
                        <a
                          className="text-muted float-right"
                          href="forgot-password.php"
                        >
                          Forgot password?
                        </a>
                      </div>
                    </div>
                    <div className="account-footer">
                      <p>
                        Having Trouble? report an issue on github{" "}
                        <a
                          target="https://github.com/MusheAbdulHakim/Smarthr---hr-payroll-project-employee-management-System/issues"
                          href="https://github.com/MusheAbdulHakim/Smarthr---hr-payroll-project-employee-management-System/issues"
                        >
                          Github issues
                        </a>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Main Wrapper */}
        {/* jQuery */}
        {/* Bootstrap Core JS */}
        {/* Custom JS */}
      </>
    </>
  );
}
