import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container } from "@mui/system";
import Paper from "@mui/material/Paper";
import { Typography, Rating, TextField, Button } from "@mui/material";
import getImageOrFallbackUrl from "../api/helpers/imageHelper";
import { getMovie } from "../api/movies";
import MovieCard from "../components/Moviecard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const MovieDetails = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState(null);
  const [reviewed, setReviewed] = useState(false);
  const [loggedInn, setLoggedInn] = useState();
  const [myReviews, setMyReviews] = useState(null);
  let userId = null;

  const checkSessionStorage2 = () => {
    let token = sessionStorage.getItem("sessionId");
    //console.log(token);
    if (token) {
      let decoded = jwt_decode(token);
      userId = decoded.id;
      setLoggedInn(true);
    }
    //console.log(`LoggedIN = ${loggedInn}`);
  };

  useEffect(() => {
    checkSessionStorage2();
  }, []);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const response = await getMovie(id);
        setMovie(response.data.data.movie);
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
                    <b>Released:</b>
                    {movie.releaseDate}
                  </div>
                  <br />
                  <div className="description-container">
                    <b>Genres: </b>
                    {movie.genres.map((genre) => (
                      <span
                        key={`genre-${genre.name}`}
                        className="category-item"
                      >
                        {" << "}
                        {genre.name} {" >> "}
                      </span>
                    ))}
                  </div>
                  {/* <div className="buttons-container">
                    In case you wish to leave a review, please login!
                  </div> */}

                  {(() => {
                    if (!loggedInn)
                      return (
                        <div className="buttons-container">
                          In case you wish to leave a review, please login!
                        </div>
                      );
                    if (loggedInn) {
                      if (reviewed && myReviews[0]) {
                        return (
                          <>
                            <br />
                            <p>You have already reviewed this movie:</p>
                            <p>
                              Your rating: {myReviews[0].rating}/10
                            </p>
                            <p>
                              Your commment: {myReviews[0].comment}
                            </p>
                          </>
                        );
                      } else {
                        return (
                          <>
                            <Typography component="legend">
                              Please score
                            </Typography>
                            <Rating
                              size="large"
                              precision={0.5}
                              max={10}
                              onChange={(e) => setRating(e.target.value)}
                            />
                            <br />
                            <br />
                            <TextField
                              label="Review comment"
                              multiline
                              width="300px"
                              maxRows={4}
                              onChange={(e) => setComment(e.target.value)}
                            />
                            <br />
                            <br />
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => sendReview()}
                            >
                              Send review
                            </Button>
                            <br />
                          </>
                        );
                      }
                    }
                  })()}
                </div>
              </div>
            </div>
          </Paper>
        </div>
      </Container>
    );
  };

  const loadMyReview = async () => {
    //console.log(id);
    setReviewed(false);

    try {
      const response = await axios.get(
        `http://localhost:4001/api/reviews/myreviews/${id}`,
        {
          headers: {
            authorization: sessionStorage.getItem("sessionId"),
          },
        }
      );
      setMyReviews(response.data);
      if (!response.data || response.data === []) {
        setReviewed(false);
      } else {
        setReviewed(true);
      }
      console.log(response.data);
    } catch (error) {
      alert("Hiba lépett fel a review-k betöltésekor.");

      console.log(error);
    }
  };

  useEffect(() => {
    loadMyReview();
  }, [id]);

  const sendReview = async () => {
    try {
      const response = await axios.post(
        `http://localhost:4001/api/reviews`,
        {
          movieId: movie.id,
          rating: rating,
          comment: comment,
        },
        {
          headers: {
            authorization: sessionStorage.getItem("sessionId"),
          },
        }
      );
      setReviewed(true);
    } catch (error) {
      if ((error.response.status = 409)) {
        alert("Hiba lépett fel a posztoláskor.");
      } else if (error.response.status === 401) {
        alert("Nem jogosult a poszt létrehozására, kérem, lépjen be újra!");
        sessionStorage.removeItem("token");
        navigate(`/`);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div>
      {movie && renderMovieDetails()}
      {movie && renderRelatedMovies()}
    </div>
  );
};

export default MovieDetails;
