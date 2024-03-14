import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const UserData = createContext();

export const UserContext = ({ children }) => {
  const [user, setUser] = useState({});
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    const getUser = async () => {
      try {
        if (cookies.token) {
          const res = await axios.get(
            "https://portfolio-vervcel.vercel.app/me",
            { withCredentials: true }
          );
          setUser(res.data.user);
        }
      } catch (er) {
        console.log("errror current user");
      }
    };

    getUser();
  }, [cookies]);
  return <UserData.Provider value={{ user }}>{children}</UserData.Provider>;
};

export const useUser = () => {
  const context = useContext(UserData);
  if (!context) {
    console.log("context khaser");
  }
  return context;
};

export default UserContext;
