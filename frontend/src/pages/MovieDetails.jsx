import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container } from "@mui/system";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import getImageOrFallbackUrl from "../api/helpers/imageHelper";
import { getMovie } from "../api/movies";
import MovieCard from "../components/Moviecard";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const response = await getMovie(id);
        setMovie(response.data.data.movie);
        console.log(response.data.data.movie);
      } catch (error) {
        throw error;
      }
    };

    getMovieDetails();
  }, [id]);

  const renderRelatedMovies = () => {
    return (
      <div>
        <Paper sx={{ marginTop: "1.25em" }} elevation={3}>
          <div className="movies-container">
            <div className="cards-container">
              {movie.recommended.map((recommendedMovie) => (
                <MovieCard
                  key={`movie-${recommendedMovie.id}`}
                  movie={recommendedMovie}
                />
              ))}
            </div>
          </div>
        </Paper>
      </div>
    );
  };

  const renderMovieDetails = () => {
    return (
      <Container maxWidth="lg">
        <div>
          <Paper sx={{ marginTop: "1.25em" }} elevation={3}>
            <div className="movie-details-container">
              <div className="image">
                <img
                  src={getImageOrFallbackUrl(movie.poster?.medium)}
                  alt={movie.name}
                />
              </div>
              <div className="info">
                <div className="info-container">
                  <Typography variant="h4" component="h5">
                    {movie.name}
                  </Typography>
                  <p>({movie.runtime} min)</p>
                  <div className="score-container">{movie.score}/10</div>
                  <div className="description-container">{movie.overview}</div>
                  <br />
                  <div className="description-container">
                    <b>Released:</b>{movie.releaseDate}
                  </div>
                  <br />
                  <div className="description-container">
                  <b>Genres:{" "}</b>
                    {movie.genres.map((genre) => (
                      <span
                        key={`genre-${genre.name}`}
                        className="category-item"
                      >
                        {" << "}{genre.name} {" >> "}
                      </span>
                    ))}
                  </div>
                  <div className="buttons-container">In case you wish to leave a review, please login!</div>
                </div>
              </div>
            </div>
          </Paper>
        </div>
      </Container>
    );
  };

  return (
    <div>
      {movie && renderMovieDetails()}
      {movie && renderRelatedMovies()}
    </div>
  );
};

export default MovieDetails;
