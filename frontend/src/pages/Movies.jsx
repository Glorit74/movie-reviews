import http from 'axios';
import { useState, useEffect } from 'react';
import Movie from '../components/Movie';

function Movies() {
const [movies, setMovies] = useState(null);
  
// https://api.themoviedb.org/3/movie/550?api_key=b0632c9fbca8d3c3fd69e92a84678c56
/*const options = {
  method: 'GET',
  url: 'https://online-movie-database.p.rapidapi.com/auto-complete',
  params: {q: 'Movie Reviews'},
  headers: {
    'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com',
    'X-RapidAPI-Key': 'b7a920d93fmsh19270bacabab78cp1abb30jsn576ffc7e6da1'
  }
};*/

/*   const load = async () => {
  setLoading(true);
  const response = await axios.get(
    `https://warhol-frontend-proxy.sloppy.zone/api/artworks/?has_image=1&limit=120&page=${pageNumber}${searchUrl}`,
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  setArtworks(response.data.data);
      setLoading(false);
};

useEffect(() => {
  load();
}, [searchUrl]);
*/



const load = async() => {
  try {
  const response = await http.get(`https://api.themoviedb.org/3/movie/popular?api_key=b0632c9fbca8d3c3fd69e92a84678c56`); 
    console.log(response.data);
    setMovies(response.data);
  } catch(error) {
    console.error(error);
  };
};


useEffect(() => {
  load();
}, [])


return <div className="App">
        {/*movies && 
          movies.map((movie, i) => (
        <Movie movie={movie} key={i}/>
      )) 
          */}

</div>;
}

export default Movies;