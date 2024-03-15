import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditProject(props) {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const getCategories = async () => {
    const catgr = await axios.get(
      "https://portfolio-murex-tau-95.vercel.app/categories"
    );
    setCategories(catgr.data);
  };

  useEffect(() => {
    async function getProject() {
      try {
        const res = await axios.get(
          `https://portfolio-murex-tau-95.vercel.app/project/${id}`
        );
        const data = res.data;
        setTitle(data.title);
        setDescription(data.description);
        setLink(data.link);
        setCategory(data.category);
      } catch (er) {
        console.log("errr getting product");
      }
    }

    getProject();
    getCategories();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("link", link);
    formData.append("category", category);
    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.put(
        `https://portfolio-murex-tau-95.vercel.app/project/edit/${id}`,
        formData,
        {
          withCredentials: true,
        }
      );
      navigate("/projects");
    } catch (er) {
      console.log("err edit formadata");
    }
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="w-50 m-auto pt-5">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            project
          </label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="title"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            description
          </label>
          <input
            type="text"
            className="form-control"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="password"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            link
          </label>
          <input
            type="text"
            className="form-control"
            name="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="password"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="form-control"
          >
            <option value="">Category</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <input type="file" accept="image/*" onChange={handleImage} />
        </div>
        <button type="submit" className="btn btn-primary">
          edit
        </button>
      </form>
      <Link to="/products">retour</Link>
    </div>
  );
}

export default EditProject;
