import "../App.css";
import axios from "axios";
import { doctorValidation, validateEmployee } from "../utils/Validation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { backendLocation } from "../config";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
function CreateDoctor() {
  const [serverError, setServerError] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const newEmployee = await axios.post(
        `${backendLocation}/admin/create/doctor`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (newEmployee.data.message) {
        setServerError(newEmployee.data.message);
      } else {
        navigate("/doctors");
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
              className="error-btn"
            >
              ok
            </button>
          </div>
        </>
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
          validationSchema={doctorValidation}
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
