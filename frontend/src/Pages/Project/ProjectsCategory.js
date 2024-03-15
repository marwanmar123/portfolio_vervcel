import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProjectsCategory = () => {
  const [categories, setCategories] = useState([]);
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://portfolio-murex-tau-95.vercel.app/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchProjects = async () => {
      try {
        let url = "https://portfolio-murex-tau-95.vercel.app/projects";
        if (filter) {
          url += `/${filter}`;
        }
        const response = await axios.get(url);
        setProjects(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
    fetchProjects();
  }, [filter]);

  return (
    <div>
      <div>
        <button
          className={`btn btn-primary ${filter === "" ? "activy" : ""}`}
          onClick={() => setFilter("")}
        >
          All
        </button>
        {categories.map((category, index) => (
          <button
            className={`btn btn-primary ${
              filter === category._id ? "activy" : ""
            }`}
            key={index}
            onClick={() => setFilter(category._id)}
          >
            {" "}
            {category.name}
          </button>
        ))}
      </div>
      <div className="d-flex gap-3">
        {projects.map((project, index) => (
          <div key={index}>
            <div>
              <Link to={project.link}>{project.title}</Link>
              <p>{project.category.name}</p>
              <Link to={`/project/${project._id}`}>details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsCategory;
