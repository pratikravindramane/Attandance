import "../App.css";
import axios from "axios";
import { validateEmployee } from "../utils/Validation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { backendLocation } from "../config";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
function Register() {
  const [serverError, setServerError] = useState(false);
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    password: "",
    phone: "",
  };
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const newEmployee = await axios.post(
        `${backendLocation}/register`,
        values
      );
      if (newEmployee.data.message) {
        setServerError(newEmployee.data.message);
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
    // resetForm();
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
              className="button border border-dark bg-danger"
            >
              ok
            </button>
          </div>
        </>
      )}
      <div>
        <h1>Register</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validateEmployee}
          onSubmit={handleSubmit}
        >
          {({ dirty, isValid }) => (
            <Form>
              <div className="d-grid mt-3">
                <label htmlFor="name">Name</label>
                <Field type="text" id="name" name="name" />
                <ErrorMessage name="name" component="div" className="error" />
              </div>
              <div className="d-grid mt-3">
                <label htmlFor="email">Email</label>
                <Field type="email" id="email" name="email" />
                <ErrorMessage name="email" component="div" className="error" />
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
              <div className="d-grid mt-3">
                <label htmlFor="phone">Phone</label>
                <Field type="number" id="phone" name="phone" />
                <ErrorMessage name="phone" component="div" className="error" />
              </div>
              <button
                type="submit"
                style={{ width: "100%" }}
                className="text-white text-center d-grid my-4 bg-dark py-2 rounded fs-4"
              >
                Submit
              </button>
              <div className="d-flex justify-content-between align-items-center mt-3">
                <Link to={"/admin/login"}>Admin Login</Link>
                <Link to={"/"} className="">
                  Login
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Register;
