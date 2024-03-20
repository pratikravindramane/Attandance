import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import axios from "axios";
import { backendLocation } from "../config";
import { useNavigate } from "react-router-dom";
import { smallStr } from "../utils/smallStr";

const AllEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [serverError, setServerError] = useState(false);

  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `${backendLocation}/admin/get-all/${decode.comId}`,
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
          setEmployees(response?.data);
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
              className="button border border-dark bg-danger"
            >
              ok
            </button>
          </div>
        </>
      )}
      <table class="table b-shadow ">
        <thead className="table table-striped ">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
          </tr>
        </thead>
        <tbody>
          {employees
            ?.slice()
            .reverse()
            .map((employee, index) => (
              <tr key={index}>
                <td>{smallStr(employee.name)}</td>
                <td>{smallStr(employee.email)}</td>
                <td>{smallStr(employee.phone)}</td>
              </tr>
            ))}{" "}
        </tbody>
      </table>
    </div>
  );
};

export default AllEmployee;
