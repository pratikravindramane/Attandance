import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validateForgotPassword, validateLogin } from "../utils/Validation";
import { backendLocation } from "../config";

function DoctorLogin() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post(
        `${backendLocation}/doctor/login`,
        values
      );
      if (response.data.message) {
        setServerError(response.data.message);
      } else {
        login();
        navigate(`/check/heart`);
        localStorage.setItem("token", response.data.token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handlePasswordChange = async (values) => {
    try {
      const response = await axios.put(
        `${backendLocation}/doctor/change-password`,
        {
          email: values.email,
          password: values.newPassword,
          confirmPassword: values.confirmPassword,
        }
      );
      if (response.data.message) {
        setServerError(response.data.message);
      } else {
        login();
        navigate(`/check/heart`);
        localStorage.setItem("token", response.data.token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const initialValues = {
    email: "",
    password: "",
    newPassword: newPassword,
    confirmPassword: confirmPassword,
  };

  return (
    <div className="login">
      {serverError && (
        <>
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
        </>
      )}
      <div className="transform">
        <h1>Doctor Login</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={
            showForgotPassword ? validateForgotPassword : validateLogin
          }
          onSubmit={(values, actions) => {
            if (showForgotPassword) {
              handlePasswordChange(values);
            } else {
              handleSubmit(values, actions);
            }
          }}
        >
          {({ dirty, isValid }) => (
            <Form>
              <div className="d-grid mt-1">
                <label htmlFor="email">Email</label>
                <Field type="email" id="email" name="email" />
                <ErrorMessage name="email" component="div" className="error" />
              </div>
              {!showForgotPassword && (
                <div className="d-grid mt-3">
                  <label htmlFor="password">Password</label>
                  {!showForgotPassword && (
                    <Field type="password" id="password" name="password" />
                  )}
                  {!showForgotPassword && (
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="error"
                    />
                  )}
                </div>
              )}
              {showForgotPassword && (
                <>
                  <div className="d-grid mt-3">
                    <label htmlFor="newPassword">New Password</label>
                    <Field
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      onKeyUp={(e) => setNewPassword(e.target.value)}
                      pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                    />
                    <ErrorMessage
                      name="newPassword"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div className="d-grid mt-3">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <Field
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      validate={(value) =>
                        value !== newPassword ? "Passwords do not match" : null
                      }
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="error"
                    />
                  </div>
                </>
              )}
              <button
                type="submit"
                style={{ width: "100%" }}
                className="text-white text-center d-grid my-4 bg-dark py-2 rounded fs-4"
              >
                Login
              </button>
              <div className="d-flex justify-content-between align-items-center mt-3">
                {!showForgotPassword && (
                  <button onClick={handleForgotPassword} className="btn">
                    Forgot Password
                  </button>
                )}
                <Link to={"/admin/login"}>Admin Login</Link>
                <Link to={"/register"} className="">
                  Sign Up
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default DoctorLogin;
