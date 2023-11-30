import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'
import MovieCard from './MovieCard'
import verifyJWT from './Authorize'
const URL = "http://localhost:5555/movies"

function MovieCollection({ id }) {
  const [movieList, setMovieList] = useState([])
  const history = useHistory()
  
  useEffect(() => {
    const jwt = localStorage.getItem('token')
    verifyJWT(jwt, id)
    fetch(URL)
    .then(res => res.json())
    .then(data => {
      const show = JSON.parse(localStorage.getItem('grantAccess'))
      if (show) {
        setMovieList(data)
      } else {
        history.push('/')
      }
    })
    .catch(err => alert(err))
    
  }, [id, history]);
  

  const mappedMovies = movieList.map((movie, index) => (
    <Grid.Column key={index}>
      <MovieCard class="movie_card" key={movie.id} {...movie} />
      <br />
    </Grid.Column>
  ));

  return (
    <Grid relaxed='very' padded columns={5}>
      <Grid.Row>
        {mappedMovies}
      </Grid.Row>
    </Grid>
  );
};

export default MovieCollection
