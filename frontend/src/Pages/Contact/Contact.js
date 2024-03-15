import React, { useState } from "react";
import axios from "axios";

function Contact(props) {
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://portfolio-murex-tau-95.vercel.app/contact",
        inputValue
      );
      console.log("data", res.data);
    } catch (er) {
      console.log("errr send mail");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">name</label>
          <input
            type="text"
            name="name"
            value={inputValue.name}
            onChange={handleChange}
            placeholder="name"
          />
        </div>
        <div>
          <label htmlFor="">email</label>
          <input
            type="email"
            name="email"
            value={inputValue.email}
            onChange={handleChange}
            placeholder="email"
          />
        </div>
        <div>
          <label htmlFor="">name</label>
          <input
            type="text"
            name="message"
            value={inputValue.message}
            onChange={handleChange}
            placeholder="message"
          />
        </div>

        <button type="submit">send</button>
      </form>
    </div>
  );
}

export default Contact;
