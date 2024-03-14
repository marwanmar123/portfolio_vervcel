import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function Login(props) {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const [cookies] = useCookies(["token"]);
  const isAuthenticated = !!cookies.token;
  const navigate = useNavigate();

  const { email, password } = inputValue;

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
        "https://portfolio-vervcel.vercel.app/login",
        { ...inputValue },
        { withCredentials: true }
      );
      navigate("/dashboard");
    } catch (err) {
      console.log("errrr");
    }

    setInputValue({
      email: "",
      password: "",
    });
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <form onSubmit={handleSubmit} className="w-50 m-auto pt-5">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
