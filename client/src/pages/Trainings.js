import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import axios from "axios";
import { backendLocation } from "../config";
import { useNavigate } from "react-router-dom";

const Trainings = () => {
  const [doctors, setDoctors] = useState([]);
  const [serverError, setServerError] = useState(false);

  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`${backendLocation}/admin/trainings`, {
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
        <table className="table ">
          <thead className="table table-striped ">
            <tr>
              <th scope="col">Disease</th>
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {doctors
              ?.slice()
              .reverse()
              .map((disease, index) => (
                <tr key={index}>
                  <td>{disease.disease}</td>
                  <td>{disease.age}</td>
                  <td>{disease.gender}</td>
                  <td className="text-white">.......</td>
                  <td>{disease.chestPain}</td>
                  <td className="text-white">.......</td>
                  <td>{disease.sugar}</td>
                  <td>{disease.restecg}</td>
                  <td>{disease.exang}</td>
                  <td>{disease.slope}</td>
                  <td>{disease.ca}</td>
                  <td>{disease.thal}</td>
                  <td>{disease.bp}</td>
                  <td>{disease.cholesterol}</td>
                  <td>{disease.thalach}</td>
                  <td className="text-white">.......</td>
                  <td>{disease.oldPeak}</td>
                  <td className="text-white">.......</td>
                </tr>
              ))}{" "}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Trainings;
