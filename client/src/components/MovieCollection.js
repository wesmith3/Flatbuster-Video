import { useEffect, useState } from 'react'
import { Grid } from 'semantic-ui-react'
import MovieCard from './MovieCard'
const URL = "http://localhost:5555/movies"

function MovieCollection() {
  const [movieList, setMovieList] = useState([])
  const [cartId, setCartId] = useState(0)
  const userId = window.localStorage.getItem('UserId')

  useEffect(() => {
    fetch(URL)
    .then(res => res.json())
    .then(setMovieList)
    .catch(err => alert(err))
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5555/users/${userId}/my_cart`)
    .then(res => res.json())
    .then(data => {
      window.localStorage.setItem("cartId", data.id)
      setCartId(data.id)
    })
  }, [userId]);


  const mappedMovies = movieList.map((movie, index) => (
    <Grid.Column key={index}>
      <MovieCard class="movie_card" key={movie.id} {...movie} cartId={cartId} />
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
