import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validateLogin } from "../utils/Validation";
import { backendLocation } from "../config";
import bg from "../assets/doctors-bg.jpg";
import doctor2 from "../assets/doctor2.png";

function AdminLogin() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state
  const { login } = useAuth();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true); // Set loading to true on form submit
      const response = await axios.post(`${backendLocation}/admin`, values);
      if (response.data.message) {
        setServerError(response.data.message);
      } else {
        login();
        navigate(`/create/doctor`);
        localStorage.setItem("token", response.data.token);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Reset loading state after request completion
    }
  };

  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <div className="flex-grid">
      <div className="login">
        {serverError && (
          <div className="error-div">
            <p>{serverError}</p>
            <button
              onClick={(e) => {
                e.preventDefault();
                setServerError(false);
              }}
              className="error-btn"
            >
              ok
            </button>
          </div>
        )}
        <div className="transform">
          <h1>Admin Login</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validateLogin}
            onSubmit={handleSubmit}
          >
            {({ dirty, isValid }) => (
              <Form>
                <div className="d-grid mt-1">
                  <label htmlFor="email">Email</label>
                  <Field type="email" id="email" name="email" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="d-grid mt-3">
                  <label htmlFor="password">Password</label>
                  <Field type="password" id="password" name="password" />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error"
                  />
                </div>
                <button
                  type="submit"
                  style={{ width: "100%" }}
                  className="text-white text-center d-grid my-4 bg-dark py-2 rounded fs-4"
                  disabled={loading} // Disable button when loading
                >
                  {loading ? "Loading..." : "Login"}{" "}
                  {/* Change button text based on loading state */}
                </button>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <Link to={"/register"}>Sign Up</Link>
                  <Link to={"/"}>Login</Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <img src={bg} alt="doctor" className="login-img" />
    </div>
  );
}

export default AdminLogin;
