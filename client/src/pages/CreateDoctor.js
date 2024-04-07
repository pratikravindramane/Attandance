import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"; // Import Yup for validation
import { backendLocation } from "../config";

function CreateDoctor() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(false);
  const token = localStorage.getItem("token");

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        `${backendLocation}/admin/create/doctor`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.message) {
        setServerError(response.data.message);
      } else {
        navigate("/doctors");
      }
    } catch (error) {
      console.log(error);
    }
    setSubmitting(false);
  };

  // Define validation schema using Yup
  const doctorValidationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .matches(/^\d+$/, "Phone number must contain only numbers")
      .min(10, "Phone number must be exactly 10 digits")
      .max(10, "Phone number must be exactly 10 digits")
      .required("Phone is required"),
    address: Yup.string().required("Address is required"),
    gender: Yup.string().required("Gender is required"),
    age: Yup.number()
      .typeError("Age must be a number")
      .required("Age is required"),
    speciality: Yup.string().required("Doctor specialty is required"),
    password: Yup.string()
      .required("New Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
  });

  return (
    <div className="login">
      {serverError && (
        <div className="error-div">
          <p>{serverError}</p>
          <button
            onClick={() => {
              setServerError(false);
            }}
            className="error-btn"
          >
            Ok
          </button>
        </div>
      )}
      <div>
        <h1>Create Doctor</h1>
        <Formik
          initialValues={{
            name: "",
            email: "",
            phone: "",
            password: "",
            gender: "male",
            age: "",
            speciality: "",
            address: "",
          }}
          validationSchema={doctorValidationSchema} // Integrate validation schema
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-grid">
                <div className="d-grid mt-3">
                  <label htmlFor="name">Name:</label>
                  <Field type="text" name="name" />
                  <ErrorMessage name="name" component="div" className="error" />
                </div>
                <div className="d-grid mt-3">
                  <label htmlFor="email">Email:</label>
                  <Field type="email" name="email" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="d-grid mt-3">
                  <label htmlFor="phone">Phone:</label>
                  <Field type="tel" name="phone" />
                  <ErrorMessage
                    name="phone"
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
                  <ErrorMessage name="age" component="div" className="error" />
                </div>
                <div className="d-grid mt-3">
                  <label htmlFor="speciality">Doctor Specialty:</label>
                  <Field
                    as="select"
                    name="speciality"
                    className="form-select form-select-lg mb-3 fs-6"
                  >
                    <option value="" disabled>
                      Select doctor specialty
                    </option>
                    <option value="cardiology" className="fs-6">
                      Cardiology
                    </option>
                    <option value="dermatology" className="fs-6">
                      Dermatology
                    </option>
                    <option value="pediatrics">Pediatrics</option>
                    <option value="orthopedics">Orthopedics</option>
                    {/* Add more options as needed */}
                  </Field>
                  <ErrorMessage
                    name="speciality"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="d-grid mt-3">
                  <label htmlFor="password">Password:</label>
                  <Field type="password" name="password" />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{ width: "100%" }}
                className="text-white text-center d-grid my-4 bg-dark py-2 rounded fs-4"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default CreateDoctor;
