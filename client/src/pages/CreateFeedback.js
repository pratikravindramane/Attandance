import "../App.css";
import axios from "axios";
import {
  doctorValidation,
  validateEmployee,
  validateFeedback,
} from "../utils/Validation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { backendLocation } from "../config";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
function CreateDoctor() {
  const [serverError, setServerError] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const newEmployee = await axios.post(
        `${backendLocation}/user/feedback/${decode.id}`,
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
        navigate("/check/heart");
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
        <h1>Give Feedback</h1>
        <Formik
          initialValues={{
            text: "", // Initial value for the text field
          }}
          validationSchema={validateFeedback} // Apply validation schema
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              {/* Form fields */}
              <div className="d-grid mt-3">
                <label htmlFor="text">Message:</label>
                <Field type="text" name="text" />
                <ErrorMessage
                  name="text"
                  component="div"
                  className="error"
                />{" "}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{ width: "100%" }}
                className="text-white text-center d-grid my-4 bg-dark py-2 rounded fs-6"
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
