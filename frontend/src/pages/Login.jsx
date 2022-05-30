import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [searchParams, setSearchParams] = useSearchParams({});
  const [data, setData] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  const getToken = async () => {
    try {
      let code = searchParams.get("code");

      let response = await axios.post("http://localhost:4000/api/login", {
        code,
      });
      //   console.log("getToken: ", response);
      sessionStorage.setItem("sessionId", response.data);
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  const getPrivate = async () => {
    const response = await axios.get("http://localhost:4000/api/private", {
      headers: {
        authtoken: sessionStorage.getItem("sessionId"),
      },
    });
    // console.log("getPrivate", response.data[0].name);
    setData(response.data[0].name);
  };

  const logout = () => {
    sessionStorage.setItem("sessionId", "");
    return navigate("/");
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <div>
      <h2>Logged in</h2>
      <button onClick={logout}>Log out</button>
    </div>
  );
}

export default Login;
