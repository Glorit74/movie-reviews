import React, { useEffect } from "react";
import { useState } from "react";
import { getMovies, getPopularMovies } from "../api/movies";
import MovieCard from "../components/Moviecard";
import { useSearchParams } from "react-router-dom";


const Movies = () => {
  const [movies, setMovies] = useState(null);
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    const getMoviesData = async (filter) => {
      try {
        if(filter) {
          const movieResponse = await getMovies(filter)
          setMovies(movieResponse.data.data.searchMovies)
        }
        else { 
          const movieResponse = await getPopularMovies();
          setMovies(movieResponse.data.data.popularMovies);
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
