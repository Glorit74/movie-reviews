import React, { useEffect } from "react";
import { useState } from "react";
import { getPopularMovies } from "../api/movies";
import MovieCard from "../components/Moviecard";

const Movies = () => {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    const getMoviesData = async () => {
      try {
        const response = await getPopularMovies();
        setMovies(response.data.data.popularMovies);
      } catch (error) {
        throw error;
      }
    };

    getMoviesData();
  }, []);

  return (
    <div className="movies-container">
      <div className="cards-container">
        {movies &&
          movies.map((movie) => (
            <MovieCard key={`movie-item-${movie.id}`} movie={movie} />
          ))}
      </div>
    </div>
  );
};

export default Movies;
