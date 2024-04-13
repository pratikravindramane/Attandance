import React, { useEffect, useState } from "react";
import { backendLocation } from "../config";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function DoctorDetails() {
  const [doctor, setDoctor] = useState();
  const [serverError, setServerError] = useState(false);
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `${backendLocation}/doctor/${decode.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response?.data?.message) {
          setServerError(response?.data?.message);
        } else {
          console.log(response.data);
          setDoctor(response?.data);
        }
      } catch (error) {}
    };
    fetch();
  }, []);
  return (
    <div className="doctor-details-container">
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
      <div className="doctor-details">
        <h2>Doctor Details</h2>
        <div className="detail-item">
          <label>Name:</label>
          <span>{doctor?.name}</span>
        </div>
        <div className="detail-item">
          <label>Address:</label>
          <span>{doctor?.address}</span>
        </div>
        <div className="detail-item">
          <label>Phone:</label>
          <span>{doctor?.phone}</span>
        </div>
        <div className="detail-item">
          <label>Email:</label>
          <span>{doctor?.email}</span>
        </div>
        <div className="detail-item">
          <label>Age:</label>
          <span>{doctor?.age}</span>
        </div>
        <div className="detail-item">
          <label>Gender:</label>
          <span>{doctor?.gender}</span>
        </div>
        <div className="detail-item">
          <label>Speciality:</label>
          <span>{doctor?.speciality}</span>
        </div>
      </div>
    </div>
  );
}

export default DoctorDetails;
