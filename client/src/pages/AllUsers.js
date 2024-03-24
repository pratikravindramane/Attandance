import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import axios from "axios";
import { backendLocation } from "../config";
import { useNavigate, useParams } from "react-router-dom";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [serverError, setServerError] = useState(false);
  const [active, setActive] = useState(false);

  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  const navigate = useNavigate();
  const currentUrl = window.location.href;
  useEffect(() => {
    if(currentUrl.includes("users")){
      setActive(true)
    }
    const fetch = async () => {
      try {
        const response = await axios.get(`${backendLocation}/admin/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (response?.data?.message) {
          setServerError(response?.data?.message);
        } else {
          setUsers(response?.data);
        }
      } catch (error) {}
    };
    fetch();
  }, []);

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
        <table className="table  ">
          <thead className="table table-striped ">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Age</th>
              <th scope="col">Gender</th>
              <th scope="col">Address</th>
              <th className="text-white">....;ljkhsdfl;kjh..</th>
            </tr>
          </thead>
          <tbody>
            {users
              ?.slice()
              .reverse()
              .map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.age}</td>
                  <td>{user.gender}</td>
                  <td colSpan={2}>{user.address}</td>
                </tr>
              ))}{" "}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
