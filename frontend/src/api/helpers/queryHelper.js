export const getPopularMoviesQuery = () =>
  JSON.stringify({
    query: `query PopularMovies {
    popularMovies {
      id
      name
      overview
      score
      poster { 
        medium
      }
      genres { 
        name
      }
    }
  }`,
  });

export const getMovieQuery = (id) =>
  JSON.stringify({
    query: `query getMovie {
    movie(id: ${id}) {
      id
      name
      overview
      runtime
      releaseDate      
      score
      poster { 
        medium
      }
      genres { 
        name
      }
      recommended {
        id
        name
        overview
        score
        poster { 
          medium
        }
        genres { 
          name
        }
      }
    }
  }`,
  });

export const getSearchMoviesQuery = (searchTerm) =>
  JSON.stringify({
    query: `query SearchMovies {
      searchMovies(query: "${searchTerm}}") {
        id
        name
        overview
        score
        poster { 
          medium
        }
        genres { 
          name
        }
      }
    }`,
  });

  