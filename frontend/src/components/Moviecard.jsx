import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Link } from "react-router-dom";
import getImageOrFallbackUrl from "../api/helpers/imageHelper";

const MovieCard = ({ movie }) => {
  const getCategories = (genres) => {
    if (!genres) {
      return null;
    }

    return (
      <>
        {genres.slice(0, 2).map((genre) => (
          <span key={`genre-${genre}`} className="category-item">
            {genre}
          </span>
        ))}
      </>
    );
  };

  return (
    <div className="card-container">
      <div className="movie-card">
        <Card sx={{ width: 225, boxShadow: 2 }}>
          <div className="movie-poster-container">
            <div className="category-container">
              {getCategories(movie.genres)}
            </div>

            <div className="movie-rating-container">
              <span>{movie.vote_average?.toFixed(1)}</span>
            </div>

            <Link to={`/movies/${movie.id}`}>
              <img
                className="movie-poster"
                src={getImageOrFallbackUrl(movie.poster_path)}
                alt={movie.title}
              />
            </Link>
          </div>
          <CardContent>
            <div className="movie-title-container">
              <div className="movie-title-content">
                <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MovieCard;
