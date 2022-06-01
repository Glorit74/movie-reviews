import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Login({setLoggedIn}) {
  const [searchParams, setSearchParams] = useSearchParams({});
  const navigate = useNavigate();

  const getToken = async () => {
    try {
      let code = searchParams.get("code");

      let response = await axios.post("http://localhost:4001/api/login", {
        code,
      });
      console.log("getToken: ", response);
      sessionStorage.setItem("sessionId", response.data);
      setLoggedIn(true);
      navigate(`/`);
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("sessionId");
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
