import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";
import MovieDetails from "./pages/MovieDetails.jsx";

import Movies from "./pages/Movies.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/callback" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
