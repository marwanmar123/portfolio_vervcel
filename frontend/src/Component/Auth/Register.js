import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register(props) {
  const [inputValue, setInputValue] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { username, email, password } = inputValue;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://portfolio-murex-tau-95.vercel.app/register",
        { ...inputValue },
        { withCredentials: true }
      );
      navigate("/login");
    } catch (err) {
      console.log("errrrr");
    }
    setInputValue({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-50 m-auto pt-5">
      <div className="mb-3">
        <label className="form-label">Username</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
          className="form-control"
          aria-describedby="emailHelp"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          className="form-control"
          aria-describedby="emailHelp"
        />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default Register;
