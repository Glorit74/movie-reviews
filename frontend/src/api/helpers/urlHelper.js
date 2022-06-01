export const getMovieExternalIdsUrl = (id) => {
  return `${process.env.REACT_APP_TMDB_API_URL}/movie/${id}/external_ids?api_key=${process.env.REACT_APP_TMDB_API_KEY}`;
};

export const getGenresUrl = () => {
  return `${process.env.REACT_APP_TMDB_API_URL}/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}`;
};

export const getPopularMoviesUrl = () => {
  return `${process.env.REACT_APP_TMDB_API_URL}/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}`;
};

export const getMoviesUrl = (title) => {
  return `${process.env.REACT_APP_TMDB_API_URL}/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${title}`
};

export const getMovieByIdUrl = (id) => {
  return `${process.env.REACT_APP_TMDB_API_URL}/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`;
};

export const getRecommendedMoviesUrl = (id) => {
  return `${process.env.REACT_APP_TMDB_API_URL}/movie/${id}/recommendations?api_key=${process.env.REACT_APP_TMDB_API_KEY}`;
};