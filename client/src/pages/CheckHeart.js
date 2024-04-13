import "../App.css";
import axios from "axios";
import {
  doctorValidation,
  validateCheck,
  validateEmployee,
  validateTraining,
} from "../utils/Validation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { backendLocation } from "../config";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
function CheckHeart() {
  const [serverError, setServerError] = useState(false);
  const [report, setReport] = useState();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const res = await axios.post(
        `${backendLocation}/user/check/${decode.id}`,
        { ...values},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data.message) {
        setServerError(res.data.message);
      } else {
        setReport(res.data.report);
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
        {report ? (
          <>
            <div className="d-grid">
              <h1 className="mb-3">{report}</h1>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setReport(false);
                }}
                className="btn border border-2"
              >
                Check Heart Again
              </button>
            </div>
          </>
        ) : (
          <>
            <h1>Check Heart</h1>
            <Formik
              initialValues={{
                age: "",
                // gender: "both",
                chestPain: "",
                sugar: "",
                restecg: "",
                exang: "",
                slope: "",
                ca: "",
                thal: "",
                bp: "",
                cholesterol: "",
                thalach: "",
                oldPeak: "",
              }}
              validationSchema={validateCheck}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="form-grid">
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
                      <label htmlFor="gender">Gender:</label>
                      <Field
                        as="select"
                        name="gender"
                        className="form-select form-select-lg mb-3 fs-6"
                      >
                        <option value="both">Both</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </Field>
                      <ErrorMessage
                        name="gender"
                        component="div"
                        className="error"
                      />
                    </div>

                    <div className="d-grid mt-3">
                      <label htmlFor="chestPain">Chest Pain:</label>
                      <Field type="number" name="chestPain" />
                      <ErrorMessage
                        name="chestPain"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div className="d-grid mt-3">
                      <label htmlFor="sugar">Sugar:</label>
                      <Field type="number" name="sugar" />
                      <ErrorMessage
                        name="sugar"
                        component="div"
                        className="error"
                      />
                    </div>

                    <div className="d-grid mt-3">
                      <label htmlFor="restecg">
                        Resting Electrocardiographic Measurement:
                      </label>
                      <Field type="number" name="restecg" />
                      <ErrorMessage
                        name="restecg"
                        component="div"
                        className="error"
                      />
                    </div>

                    <div className="d-grid mt-3">
                      <label htmlFor="exang">Exercise Induced Angina:</label>
                      <Field type="number" name="exang" />
                      <ErrorMessage
                        name="exang"
                        component="div"
                        className="error"
                      />
                    </div>

                    <div className="d-grid mt-3">
                      <label htmlFor="slope">
                        Slope of the Peak Exercise ST Segment:
                      </label>
                      <Field type="number" name="slope" />
                      <ErrorMessage
                        name="slope"
                        component="div"
                        className="error"
                      />
                    </div>

                    <div className="d-grid mt-3">
                      <label htmlFor="ca">
                        Number of Major Vessels Colored by Flouroscopy:
                      </label>
                      <Field type="number" name="ca" />
                      <ErrorMessage
                        name="ca"
                        component="div"
                        className="error"
                      />
                    </div>

                    <div className="d-grid mt-3">
                      <label htmlFor="thal">Thalassemia:</label>
                      <Field type="number" name="thal" />
                      <ErrorMessage
                        name="thal"
                        component="div"
                        className="error"
                      />
                    </div>

                    <div className="d-grid mt-3">
                      <label htmlFor="bp">Blood Pressure:</label>
                      <Field type="number" name="bp" />
                      <ErrorMessage
                        name="bp"
                        component="div"
                        className="error"
                      />
                    </div>

                    <div className="d-grid mt-3">
                      <label htmlFor="cholesterol">Cholesterol Level:</label>
                      <Field type="number" name="cholesterol" />
                      <ErrorMessage
                        name="cholesterol"
                        component="div"
                        className="error"
                      />
                    </div>

                    <div className="d-grid mt-3">
                      <label htmlFor="thalach">
                        Maximum Heart Rate Achieved:
                      </label>
                      <Field type="number" name="thalach" />
                      <ErrorMessage
                        name="thalach"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div className="d-grid mt-3">
                      <label htmlFor="oldPeak">
                        ST Depression Induced by Exercise Relative to Rest:
                      </label>
                      <Field type="number" name="oldPeak" />
                      <ErrorMessage
                        name="oldPeak"
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
                </Form>
              )}
            </Formik>
          </>
        )}
      </div>
    </div>
  );
}

export default CheckHeart;
