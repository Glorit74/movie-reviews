import React, { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  /*
  let redirect_uri = "http://localhost:3000/callback";
  let client_id =
    "817290401795-d6ds6ronnut9djcamv7mu1dakheeefr3.apps.googleusercontent.com";
  const [data, setData] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  const getPublic = async () => {
    const response = await axios.get("http://localhost:4000/api/public");

    setData(response.data[0].name);
  };

  useEffect(() => {
    getPublic();
  }, []);

  return (
    <div>
      <h2>Movie API</h2>
      <button
        onClick={() =>
          window.open(
            `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${client_id}&scope=openid%20email&redirect_uri=${redirect_uri}`
          )
        }
      >
        Login with Google
      </button>
    </div>
  );
  */
}

export default Home;
