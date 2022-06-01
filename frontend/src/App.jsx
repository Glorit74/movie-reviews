import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";
import MovieDetails from "./pages/MovieDetails.jsx";

import Movies from "./pages/Movies.jsx";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Navbar setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>
      <Routes>
        <Route path="/" element={<Movies setLoggedIn={setLoggedIn} />} />
        <Route path="/movies" element={<Movies setLoggedIn={setLoggedIn} />} />
        <Route path="/movies/:id" element={<MovieDetails setLoggedIn={setLoggedIn} />} />
        <Route path="/callback" element={<Login setLoggedIn={setLoggedIn} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
