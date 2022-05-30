export const getMovieExternalIdsUrl = (id) => {
  return `${process.env.REACT_TMDB_API_URL}/movie/${id}/external_ids?api_key=${process.env.REACT_TMDB_API_KEY}`;
};
