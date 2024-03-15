import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

function ProfileList(props) {
  const [profiles, setProfiles] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [cookies] = useCookies(["token"]);
  const isAuthenticated = cookies.token;
  const navigate = useNavigate();

  const getProfiles = async () => {
    const profs = await axios.get(
      "https://portfolio-murex-tau-95.vercel.app/profiles"
    );
    setProfiles(profs.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("wach bs7 bghtu")) {
      try {
        await axios.delete(
          `https://portfolio-murex-tau-95.vercel.app/profile/delete/${id}`
        );
        setProfiles(profiles.filter((p) => p._id !== id));
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
    getProfiles();
    if (deleteMessage) {
      setTimeout(() => {
        setDeleteMessage(null);
      }, 2000);
    }
  }, [isAuthenticated, profiles, deleteMessage, navigate]);

  return (
    <div>
      {deleteMessage && <p className="alert alert-success">{deleteMessage}</p>}
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">username</th>
            <th scope="col">email</th>
            <th scope="col">status</th>
            <th scope="col">image</th>
            <th scope="col">action</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((p) => (
            <tr key={p._id}>
              <td>{p.username}</td>
              <td>{p.email}</td>
              <td>{p.status}</td>
              <td>
                <img
                  src={`https://portfolio-murex-tau-95.vercel.app/uploads/${p.image}`}
                  width={50}
                  alt=""
                />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(p._id)}
                >
                  delete
                </button>
                <Link
                  className="btn btn-secondary"
                  to={`/profile/edit/${p._id}`}
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

export default ProfileList;
