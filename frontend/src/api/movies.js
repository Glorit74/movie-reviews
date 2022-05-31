import http from "axios";
import { getMovieQuery, getPopularMoviesQuery } from "./helpers/queryHelper";

export const getPopularMovies = async () => {
  try {
    const response = await http.post(
      process.env.REACT_APP_TMDB_GRAPH_API_URL,
      getPopularMoviesQuery()
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getMovie = async (id) => {
  try {
    const response = await http.post(
      process.env.REACT_APP_TMDB_GRAPH_API_URL,
      getMovieQuery(id)
    );
    return response;
  } catch (error) {
    throw error;
  }
};