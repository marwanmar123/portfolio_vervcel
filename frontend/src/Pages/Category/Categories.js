import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import CreateCategory from "./CreateCategory";

const Categories = (props) => {
  const [categories, setCategories] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();

  // Securely check for token existence and redirect if necessary
  const isAuthenticated = () => {
    if (!cookies.token) {
      // Redirect to login if token is not present
      navigate("/login");
      return false; // Explicitly return false to block further execution
    }
    return true; // Token exists, proceed
  };

  const getCategories = async () => {
    const isUserAuthenticated = isAuthenticated(); // Check authentication first

    if (isUserAuthenticated) {
      // Only fetch categories if user is authenticated
      try {
        const catgr = await axios.get(
          "https://portfolio-murex-tau-95.vercel.app/categories",
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`, // Include token in headers
            },
          }
        );
        setCategories(catgr.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("wach bs7 bghtu")) {
      try {
        const isUserAuthenticated = isAuthenticated(); // Check for token again

        if (isUserAuthenticated) {
          await axios.delete(
            `https://portfolio-murex-tau-95.vercel.app/category/delete/${id}`,
            {
              headers: {
                Authorization: `Bearer ${cookies.token}`,
              },
            }
          );
          setCategories(categories.filter((p) => p._id !== id));
          setDeleteMessage("rah tsuprima");
        }
      } catch (er) {
        console.error("Error deleting category:", er);
      }
    }
  };

  useEffect(() => {
    // Check authentication and fetch data on initial render and token change
    getCategories();
    if (deleteMessage) {
      setTimeout(() => {
        setDeleteMessage(null);
      }, 2000);
    }
  }, [cookies.token, deleteMessage, categories]); // Add `cookies.token` to dependencies

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
