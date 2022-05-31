import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import http from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate, createSearchParams } from "react-router-dom";
import logo from "../imgs/572-5729664_reasons-to-watch-the-guardians-of-the-galaxy.png";
import jwt_decode from "jwt-decode";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Navbar = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [filter, setFilter] = useState("");

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      if (filter === "") {
        navigate({ pathname: "movies" });
      } else {
        navigate({
          pathname: "movies",
          search: createSearchParams({
            q: filter,
          }).toString(),
        });
      }
    }
  };

  const redirect_uri = "http://localhost:3000/callback";
  const client_id =
    "817290401795-d6ds6ronnut9djcamv7mu1dakheeefr3.apps.googleusercontent.com";

  const checkSessionStorage = () => {
    let token = sessionStorage.getItem("sessionId");
    //console.log(token);

    if (!token) {
      //sessionStorage.removeItem("token");
      navigate(`/`);
      setLoggedIn(false);
    } else {
      let decoded = jwt_decode(token);
      if (!decoded.id) {
        sessionStorage.removeItem("token");
        navigate(`/`);
        setLoggedIn(false);
      } else {
        setLoggedIn(true);
      }
    }
  };

  useEffect(() => {
    checkSessionStorage();
  }, [loggedIn]);

  useEffect(() => {
    checkSessionStorage();
  }, []);

  const logout = () => {
    sessionStorage.removeItem("sessionId");
    navigate(`/`);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: "black" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/">
              {" "}
              <img className="navbar-logo" src={logo} alt="" />{" "}
            </Link>
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search movies…"
              value={filter}
              onKeyDown={(event) => handleSearch(event)}
              onChange={(event) => handleFilterChange(event)}
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Button color="inherit">Search</Button>
          {loggedIn ? (
            <Button onClick={logout}>Logout</Button>
          ) : (
            <Button
              color="inherit"
              onClick={() =>
                window.open(
                  `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${client_id}&scope=openid%20profile%20email&redirect_uri=${redirect_uri}`
                )
              }
            >
              Login with Google
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
