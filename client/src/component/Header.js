import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
function Header() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const decode = token ? jwtDecode(token) : false;
  useEffect(() => {}, []); // Empty dependency array means useEffect runs only once when the component mounts

  return (
    <div className="header  ">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <button
            className="btn navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasScrolling"
            aria-controls="offcanvasScrolling"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link className="navbar-brand" to={isLoggedIn ? "/doctors" : "/"}>
            Predict
          </Link>
          <div className="hide-nav">
            {isLoggedIn ? (
              <>
                {decode.isAdmin ? (
                  <>
                    <Link
                      to={"/create/doctor"}
                      className={`my-1 ${
                        location.pathname === "/create/doctor" ? "active" : ""
                      }`}
                    >
                      Create Doctor
                    </Link>
                    <Link
                      to={"/create/training"}
                      className={`my-1 ${
                        location.pathname === "/create/training" ? "active" : ""
                      }`}
                    >
                      Create Training
                    </Link>
                    <Link
                      to={"/users"}
                      className={`my-1 ${
                        location.pathname === "/users" ? "active" : ""
                      }`}
                    >
                      Users
                    </Link>
                    <Link
                      to={"/doctors"}
                      className={`my-1 ${
                        location.pathname === "/doctors" ? "active" : ""
                      }`}
                    >
                      Doctors
                    </Link>
                    <Link
                      to={"/trainings"}
                      className={`my-1 ${
                        location.pathname === "/trainings" ? "active" : ""
                      }`}
                    >
                      Trainings
                    </Link>
                    <Link
                      to={"/feedbacks"}
                      className={`my-1 ${
                        location.pathname === "/feedbacks" ? "active" : ""
                      }`}
                    >
                      Feedbacks
                    </Link>
                    <Link
                      className={`my-1`}
                      onClick={(e) => {
                        e.preventDefault();
                        logout();
                        localStorage.removeItem("token");
                        navigate("/");
                      }}
                    >
                      Logout
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to={"/check/heart"}
                      className={`my-1 ${
                        location.pathname === "/check/heart" ? "active" : ""
                      }`}
                    >
                      Check Heart
                    </Link>

                    <Link
                      to={"/reports"}
                      className={`my-1 ${
                        location.pathname === "/reports" ? "active" : ""
                      }`}
                    >
                      Report
                    </Link>
                    <Link
                      to={"/doctors"}
                      className={`my-1 ${
                        location.pathname === "/doctors" ? "active" : ""
                      }`}
                    >
                      Doctors
                    </Link>
                    <Link
                      to={"/create/feedback"}
                      className={`my-1 ${
                        location.pathname === "/create/feedback" ? "active" : ""
                      }`}
                    >
                      Feedback
                    </Link>
                    <Link
                      className={`my-1`}
                      onClick={(e) => {
                        e.preventDefault();
                        logout();
                        localStorage.removeItem("token");
                        navigate("/");
                      }}
                    >
                      Logout
                    </Link>
                  </>
                )}
              </>
            ) : (
              <>
                <Link
                  to={"/"}
                  className={`my-1 ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                >
                  Login{" "}
                </Link>
                <Link
                  to={"/doctor-login"}
                  className={`my-1 ${
                    location.pathname === "/doctor-login" ? "active" : ""
                  }`}
                >
                  Doctor Login{" "}
                </Link>
                <Link
                  to={"/register"}
                  className={`my-1 ${
                    location.pathname === "/register" ? "active" : ""
                  }`}
                >
                  Register
                </Link>
                <Link
                  to={"/admin/login"}
                  className={`my-1 ${
                    location.pathname === "/admin/login" ? "active" : ""
                  }`}
                >
                  Admin Login{" "}
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <div className="container-xxl">
        <div
          className="offcanvas offcanvas-start"
          data-bs-scroll="true"
          data-bs-backdrop="false"
          tabIndex="-1"
          id="offcanvasScrolling"
          aria-labelledby="offcanvasScrollingLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasScrollingLabel">
              Navigation
            </h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body d-flex flex-column ">
            {isLoggedIn ? (
              <>
                {decode.isAdmin ? (
                  <>
                    <Link to={"/create/doctor"} className="my-1 text-dark">
                      Create Doctor
                    </Link>
                    <hr />
                    <Link to={"/create/training"} className="my-1 text-dark">
                      Create Training
                    </Link>
                    <hr />
                    <Link to={"/users"} className="my-1 text-dark">
                      Users
                    </Link>
                    <hr />
                    <Link to={"/doctors"} className="my-1 text-dark">
                      Doctors
                    </Link>
                    <hr />
                    <Link to={"/trainings"} className="my-1 text-dark">
                      Trainings
                    </Link>
                    <hr />
                    <Link to={"/feedbacks"} className="my-1 text-dark">
                      Feedbacks
                    </Link>
                    <hr />
                    <Link
                      className="my-1 text-dark"
                      onClick={(e) => {
                        e.preventDefault();
                        logout();
                        localStorage.removeItem("token");
                        navigate("/");
                      }}
                    >
                      Logout
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to={"/check/heart"} className="my-1 text-dark">
                      Check Heart
                    </Link>
                    <hr />
                    <Link to={"/doctors"} className="my-1 text-dark">
                      Doctors
                    </Link>
                    <hr />
                    <Link to={"/create/feedback"} className="my-1 text-dark">
                      Feedback
                    </Link>
                    <hr />
                    <Link
                      className="my-1 text-dark"
                      onClick={(e) => {
                        e.preventDefault();
                        logout();
                        localStorage.removeItem("token");
                        navigate("/");
                      }}
                    >
                      Logout
                    </Link>
                  </>
                )}
              </>
            ) : (
              <>
                <Link to={"/"} className="my-1 text-dark">
                  Login{" "}
                </Link>
                <hr />
                <Link to={"/register"} className="my-1 text-dark">
                  Register
                </Link>
                <hr />
                <Link to={"/admin/login"} className="my-1 text-dark">
                  Admin Login{" "}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default Header;
