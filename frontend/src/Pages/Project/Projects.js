import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import CreateProject from "./CreateProject";

function Projects(props) {
  const [projects, setProjects] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [cookies] = useCookies(["token"]);
  const isAuthenticated = cookies.token;
  const navigate = useNavigate();

  const getProjects = async () => {
    const prj = await axios.get(
      "https://portfolio-murex-tau-95.vercel.app/projects"
    );
    setProjects(prj.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("wach bs7 bghtu")) {
      try {
        await axios.delete(
          `https://portfolio-murex-tau-95.vercel.app/project/delete/${id}`
        );
        setProjects(projects.filter((p) => p._id !== id));
        setDeleteMessage("rah tsuprima");
      } catch (er) {
        console.log("mochkil f delete");
      }
    }
  };

  useEffect(() => {
    getProjects();
    if (deleteMessage) {
      setTimeout(() => {
        setDeleteMessage(null);
      }, 2000);
    }
  }, [projects, deleteMessage, navigate]);

  return (
    <div>
      <CreateProject />
      {deleteMessage && <p className="alert alert-success">{deleteMessage}</p>}
      <Link to="/category/create">Add</Link>
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">title</th>
            <th scope="col">description</th>
            <th scope="col">link</th>
            <th scope="col">image</th>
            <th scope="col">category</th>
            <th scope="col">action</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr key={p._id}>
              <td>{p.title}</td>
              <td>{p.description}</td>
              <td>{p.link}</td>
              <td>
                <img
                  src={`https://portfolio-murex-tau-95.vercel.app/uploads/${p.image}`}
                  width={50}
                  alt=""
                />
              </td>
              <td>{p.category.name}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(p._id)}
                >
                  delete
                </button>
                <Link
                  className="btn btn-secondary"
                  to={`/project/edit/${p._id}`}
                >
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

export default Projects;
