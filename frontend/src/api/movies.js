import http from "axios";
import {
  getMoviesUrl,
  getMovieByIdUrl,
  getPopularMoviesUrl,
  getGenresUrl,
  getRecommendedMoviesUrl,
} from "./helpers/urlHelper";

export const getPopularMovies = async () => {
  try {
    const response = await http.get(getPopularMoviesUrl());

    if (response) {
      const genresResponse = await getAllGenres();

      const movies = response.data.results.map((movie) => ({
        ...movie,
        genres: movie.genre_ids.map(
          (id) =>
            genresResponse.data.genres.find((genre) => genre.id === id)?.name
        ),
      }));

      return movies;
    }

    return response;
  } catch (error) {
    throw error;
  }
};

export const getMovie = async (id) => {
  try {
    const response = await http.get(getMovieByIdUrl(id));

    if (response) {
      const recommendedMoviesResponse = await getRecommendedMovies(id);

      const movie = {
        ...response.data,
        genres: response.data.genres.map((genre) => genre.name),
        recommended: recommendedMoviesResponse,
      };

      return movie;
    }

    return response;
  } catch (error) {
    throw error;
  }
};

export const getMovies = async (filter) => {
  try {
    const response = await http.get(getMoviesUrl(filter));

    if (response) {
      const genresResponse = await getAllGenres();
      const movies = response.data.results.map((movie) => ({
        ...movie,
        genres: movie.genre_ids.map(
          (id) =>
            genresResponse.data.genres.find((genre) => genre.id === id)?.name
        ),
      }));
      return movies;
    }

    return response;
  } catch (error) {
    throw error;
  }
};

export const getRecommendedMovies = async (id) => {
  try {
    const response = await http.get(getRecommendedMoviesUrl(id));

    if (response) {
      const genresResponse = await getAllGenres();

      const movies = response.data.results.map((movie) => ({
        ...movie,
        genres: movie.genre_ids.map(
          (id) =>
            genresResponse.data.genres.find((genre) => genre.id === id)?.name
        ),
      }));

      return movies;
    }

    return response;
  } catch (error) {
    throw error;
  }
};

export const getAllGenres = async () => {
  try {
    const response = await http.get(getGenresUrl());
    return response;
  } catch (error) {
    throw error;
  }
};
