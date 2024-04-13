import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import axios from "axios";
import { backendLocation } from "../config";
import { useNavigate } from "react-router-dom";
import moment from "moment";
const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [serverError, setServerError] = useState(false);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const decode = jwtDecode(token);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`${backendLocation}/admin/feedbacks`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (response?.data?.message) {
          setServerError(response?.data?.message);
        } else {
          setDoctors(response?.data);
        }
      } catch (error) {}
    };
    fetch();
  });
  const deleteHandler = async (id) => {
    try {
      const response = await axios.delete(
        `${backendLocation}/admin/delete/feedback/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response?.data?.message) {
        setServerError(response?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="table-container my-4 px-3">
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
      {/* <h1>FeedBacks</h1> */}
      <div className="table-responsive">
        <table className="table table-striped ">
          <thead className="table-dark ">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Role</th>
              <th scope="col">Feedbak</th>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {doctors
              ?.slice()
              .reverse()
              .map((f, index) => (
                <tr key={index}>
                  <td>{f.role === "user" ? f.user?.name : f.doctor?.name}</td>
                  <td>{f.role}</td>
                  <td>{f.text}</td>
                  <td>{moment(f.createdAt).format("DD/MM/YYYY")}</td>
                  <td>{moment(f.createdAt).format("hh:mm A")}</td>
                  <td style={{ fontSize: ".8rem" }}>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteHandler(f._id)}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))}{" "}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Doctors;
