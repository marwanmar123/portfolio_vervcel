import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import CreateSkill from "./CreateSkill";

function SkillsList(props) {
  const [skills, setSkills] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [cookies] = useCookies(["token"]);
  const isAuthenticated = cookies.token;
  const navigate = useNavigate();

  const getSkills = async () => {
    const skils = await axios.get(
      "https://portfolio-murex-tau-95.vercel.app/skills"
    );
    setSkills(skils.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("wach bs7 bghtu")) {
      try {
        await axios.delete(`http://localhost:5000/skill/delete/${id}`);
        setSkills(skills.filter((p) => p._id !== id));
        setDeleteMessage("rah tsuprima");
      } catch (er) {
        console.log("mochkil f delete");
      }
    }
  };
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
    getSkills();
    if (deleteMessage) {
      setTimeout(() => {
        setDeleteMessage(null);
      }, 2000);
    }
  }, [isAuthenticated, skills, deleteMessage, navigate]);

  return (
    <div>
      <CreateSkill />
      {deleteMessage && <p className="alert alert-success">{deleteMessage}</p>}
      <Link to="/skill/create">Add</Link>
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">name</th>
            <th scope="col">description</th>
            <th scope="col">image</th>
            <th scope="col">action</th>
          </tr>
        </thead>
        <tbody>
          {skills.map((s) => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.description}</td>
              <td>
                <img
                  src={`http://localhost:5000/uploads/${s.image}`}
                  width={50}
                  alt=""
                />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(s._id)}
                >
                  delete
                </button>
                <Link className="btn btn-secondary" to={`/skill/edit/${s._id}`}>
                  edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SkillsList;
