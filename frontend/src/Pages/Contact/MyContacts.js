import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

function MyContacts(props) {
  const [contacts, setContacts] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [cookies] = useCookies(["token"]);
  const isAuthenticated = cookies.token;
  const navigate = useNavigate();

  const getContacts = async () => {
    const cnts = await axios.get(
      "https://portfolio-murex-tau-95.vercel.app/contacts"
    );
    setContacts(cnts.data);
  };

  /*    const handleDelete = async (id) => {
        if(window.confirm("wach bs7 bghtu")){
            try{
                await axios.delete(`http://localhost:5000/skill/delete/${id}`);
                setSkills(skills.filter((p) => p._id !== id));
                setDeleteMessage("rah tsuprima");
            }catch(er){
                console.log("mochkil f delete");
            }
        }
    }*/
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
    getContacts();
    if (deleteMessage) {
      setTimeout(() => {
        setDeleteMessage(null);
      }, 2000);
    }
  }, [isAuthenticated, contacts, deleteMessage, navigate]);

  return (
    <div>
      {deleteMessage && <p className="alert alert-success">{deleteMessage}</p>}
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">name</th>
            <th scope="col">email</th>
            <th scope="col">message</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((c) => (
            <tr key={c._id}>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyContacts;
