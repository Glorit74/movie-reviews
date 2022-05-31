import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import http from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from '../imgs/572-5729664_reasons-to-watch-the-guardians-of-the-galaxy.png'

const Navbar = () => {
   const redirect_uri = "http://localhost:3000/callback";
   const client_id =
     "817290401795-d6ds6ronnut9djcamv7mu1dakheeefr3.apps.googleusercontent.com";

//   const [data, setData] = useState([]);
//   const [isClicked, setIsClicked] = useState(false);

//   const getPublic = async () => {
//     const response = await http.get("http://localhost:4000/api/public");

//     setData(response.data[0].name);
//   };

  useEffect(() => {
    //getPublic();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: 'black' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/"> <img className="navbar-logo" src={logo} alt=""/> </Link>
          </Typography> 
          <Button
            color="inherit"            
          >
            Search
          </Button>
          <Button
            color="inherit"
            onClick={() =>
              window.open(
                `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${client_id}&scope=openid%20email&redirect_uri=${redirect_uri}`
              )
            }
          >
            Login with Google
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
