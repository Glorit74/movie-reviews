import React, { useEffect } from "react";
import { useState } from "react";
import { getAllGenres, getMovies, getPopularMovies } from "../api/movies";
import MovieCard from "../components/MovieCard";
import { useSearchParams } from "react-router-dom";

const Movies = () => {
  const [movies, setMovies] = useState(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const getMoviesData = async (filter) => {
      try {
        if (filter) {
          const movies = await getMovies(filter);
          setMovies(movies);
        } else {
          const movies = await getPopularMovies();
          setMovies(movies);
        }
      } catch (error) {
        throw error;
      }
    };

    getMoviesData(searchParams.get("q") || "");
  }, [searchParams]);

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
