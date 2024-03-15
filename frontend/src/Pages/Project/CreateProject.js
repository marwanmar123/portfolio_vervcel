import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateProject(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [selectImage, setSelectImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const getCategories = async () => {
    const catgr = await axios.get("http://localhost:5000/categories");
    setCategories(catgr.data);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("link", link);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("image", selectImage);
    try {
      await axios.post(
        "https://portfolio-murex-tau-95.vercel.app/project/create",
        formData,
        { withCredentials: true }
      );

      navigate("/projects");
    } catch (er) {
      console.log("err formdata");
    }
    setTitle("");
    setDescription("");
    setLink("");
    setCategory("");
  };

  const handleImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setSelectImage(e.target.files[0]);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="w-50 m-auto pt-5">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            projetc
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
            placeholder="link"
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
          <img src={image} alt="" width={50} />
        </div>
        <button type="submit" className="btn btn-primary">
          create
        </button>
      </form>
    </div>
  );
}

export default CreateProject;
