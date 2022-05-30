import "./App.css";
import http from "axios";
import { useState, useEffect } from 'react';
import Movie from "./components/Movie";

function App() {

  const [movies, setMovies] = useState(null);

  const options = {
    method: 'GET',
    url: 'https://online-movie-database.p.rapidapi.com/auto-complete',
    params: {q: 'Movie Reviews'},
    headers: {
      'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com',
      'X-RapidAPI-Key': 'b7a920d93fmsh19270bacabab78cp1abb30jsn576ffc7e6da1'
    }
  };

  const load = async() => {
    await http.request(options)
    .then(function (response) {
      console.log(response.data.d);
      setMovies(response.data.d);
    }).catch(function (error) {
      console.error(error);
    });
  };

  useEffect(() => {
    load();
  }, [])


  return <div className="App">
          {movies && 
            movies.map((movie, i) => (
          <Movie movie={movie} key={i}/>
        )) 
      }

  </div>;
}

export default App;
