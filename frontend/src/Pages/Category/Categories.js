import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CreateCategory from "./CreateCategory";

const Categories = (props) => {
  const [categories, setCategories] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState("");
  const navigate = useNavigate();

  const tokenExistsInCookie = document.cookie
    .split(";")
    .some((cookie) => cookie.trim().startsWith("token="));

  const getCategories = async () => {
    const response = await axios.get(
      "https://portfolio-murex-tau-95.vercel.app/categories",
      {
        headers: {
          Authorization: `Bearer ${getTokenFromCookie()}`, // Attach token to request headers
        },
      }
    );
    setCategories(response.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        await axios.delete(
          `https://portfolio-murex-tau-95.vercel.app/category/delete/${id}`,
          {
            headers: {
              Authorization: `Bearer ${getTokenFromCookie()}`, // Attach token to request headers
            },
          }
        );
        setCategories(categories.filter((p) => p._id !== id));
        setDeleteMessage("Deleted successfully");
      } catch (error) {
        console.log("Error in delete operation", error);
      }
    }
  };

  useEffect(() => {
    if (!tokenExistsInCookie) {
      navigate("/login");
    } else {
      getCategories();
    }
    if (deleteMessage) {
      setTimeout(() => {
        setDeleteMessage("");
      }, 2000);
    }
  }, [tokenExistsInCookie, deleteMessage, navigate, categories]);

  const getTokenFromCookie = () => {
    const tokenCookie = document.cookie
      .split(";")
      .find((cookie) => cookie.trim().startsWith("token="));
    if (tokenCookie) {
      return tokenCookie.split("=")[1];
    }
    return null;
  };

  return (
    <div>
      <CreateCategory />
      {deleteMessage && <p className="alert alert-success">{deleteMessage}</p>}
      <Link to="/category/create">Add</Link>
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">name</th>
            <th scope="col">action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((c) => (
            <tr key={c._id}>
              <td>{c.name}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(c._id)}
                >
                  delete
                </button>
                <Link
                  className="btn btn-secondary"
                  to={`/category/edit/${c._id}`}
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
};

export default Categories;
