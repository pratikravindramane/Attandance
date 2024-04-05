import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import axios from "axios";
import { backendLocation } from "../config";
import { useNavigate } from "react-router-dom";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [serverError, setServerError] = useState(false);

  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  const navigate = useNavigate();
  const [role, setRole] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`${backendLocation}/user/doctors`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const admin = await axios.get(`${backendLocation}/user/${decode.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (response?.data?.message) {
          setServerError(response?.data?.message);
        } else {
          setRole(admin?.data?.isAdmin);
          setDoctors(response?.data);
        }
      } catch (error) {}
    };
    fetch();
  });
  const deleteHandler = async (id) => {
    try {
      const response = await axios.delete(
        `${backendLocation}/admin/delete/doctor/${id}`,
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
      <div className="table-responsive">
        <table className="table table-striped">
          <thead className="thead-dark custom-header ">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Speciality</th>
              <th scope="col">Age</th>
              <th scope="col">Gender</th>
              <th scope="col">Address</th>
              <th className="text-white">....;ljkhsdfl;kjh..</th>
              {role && <th scope="col">Action</th>}
            </tr>
          </thead>
          <tbody>
            {doctors
              ?.slice()
              .reverse()
              .map((e, index) => (
                <tr key={index}>
                  <td>{e.name}</td>
                  <td>{e.email}</td>
                  <td>{e.phone}</td>
                  <td>{e.speciality}</td>
                  <td>{e.age}</td>
                  <td>{e.gender}</td>
                  <td colSpan={2}>{e.address}</td>
                  {role && (
                    <td style={{ fontSize: ".8rem" }}>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteHandler(e._id)}
                      >
                        delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}{" "}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Doctors;
