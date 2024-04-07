import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import axios from "axios";
import { backendLocation } from "../config";
import { useNavigate } from "react-router-dom";

const Reports = () => {
  const [reports, setRports] = useState([]);
  const [serverError, setServerError] = useState(false);

  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  useEffect(() => {
    const fetch = async () => {
      try {
        const user = await axios.get(`${backendLocation}/user/${decode.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const users = await axios.get(
          `${backendLocation}/user/report/${decode.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const doctors = await axios.get(`${backendLocation}/doctor/reports`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (user?.data?.message) {
          setServerError(user?.data?.message);
        } else {
          if (user?.data?.noUser) {
            setRports(doctors?.data);
          } else {
            setRports(users?.data);
          }
        }
      } catch (error) {
        console.log(error);
      }
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
        <table className="table table-striped">
          <thead className="table-dark  custom-header">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Result</th>
              <th scope="col">Age</th>
              <th scope="col">Gender</th>
              <th scope="col" colSpan={3}>
                Chest Pain
              </th>
              <th scope="col">Sugar</th>
              <th scope="col">Restecg</th>
              <th scope="col">Exang</th>
              <th scope="col">Slope</th>
              <th scope="col">CA</th>
              <th scope="col">Thal</th>
              <th scope="col">BP</th>
              <th scope="col">Cholesterol</th>
              <th scope="col">Thalach</th>
              <th scope="col" colSpan={3}>
                Old Peack
              </th>
            </tr>
          </thead>
          <tbody>
            {reports?.reverse().map((e, index) => (
              <tr key={index}>
                <td>{e?.user?.name}</td>
                <td>{e?.result}</td>
                <td>{e?.age}</td>
                <td>{e?.gender}</td>
                <td className="text-white">.......</td>
                <td>{e?.chestPain}</td>
                <td className="text-white">.......</td>
                <td>{e?.sugar}</td>
                <td>{e?.restecg}</td>
                <td>{e?.exang}</td>
                <td>{e?.slope}</td>
                <td>{e?.ca}</td>
                <td>{e?.thal}</td>
                <td>{e?.bp}</td>
                <td>{e?.cholesterol}</td>
                <td>{e?.thalach}</td>
                <td className="text-white">.......</td>
                <td>{e?.oldPeak}</td>
                <td className="text-white">.......</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
