import "../App.css";
import axios from "axios";
import { validateEmployee } from "../utils/Validation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { backendLocation } from "../config";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

function Register() {
  const [serverError, setServerError] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    password: "",
    phone: "",
    gender: "male",
    age: "",
    address: "",
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
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex-grid">
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
          <h1>Register</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validateEmployee}
            onSubmit={handleSubmit}
          >
            {({ dirty, isValid }) => (
              <Form>
                <div className="form-grid">
                  <div className="d-grid mt-3">
                    <label htmlFor="name">Name</label>
                    <Field type="text" id="name" name="name" />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div className="d-grid mt-3">
                    <label htmlFor="email">Email</label>
                    <Field type="email" id="email" name="email" />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div className="d-grid mt-3">
                    <label htmlFor="phone">Phone</label>
                    <Field type="number" id="phone" name="phone" />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div className="d-grid mt-3">
                    <label htmlFor="gender">Gender:</label>
                    <Field
                      as="select"
                      name="gender"
                      className="form-select form-select-lg fs-6  "
                    >
                      <option value="male" className="fs-6">
                        Male
                      </option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </Field>
                    <ErrorMessage
                      name="gender"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div className="d-grid mt-3">
                    <label htmlFor="age">Age:</label>
                    <Field type="number" name="age" />
                    <ErrorMessage
                      name="age"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div className="d-grid mt-3">
                    <label htmlFor="address">Address:</label>
                    <Field type="text" name="address" />
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div className="d-grid mt-3">
                    <label htmlFor="password">Password</label>
                    <Field
                      type={showPassword ? "text" : "password"} // Toggle between text and password type
                      id="password"
                      name="password"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="view-password-btn"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="error"
                    />
                  </div>
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
      <img
        src={
          "https://www.sterlinghospitals.com/uploads/images/168415520164622b4106684.jpg"
        }
        alt="doctor"
        className="login-img"
      />
    </div>
  );
}

export default Register;
