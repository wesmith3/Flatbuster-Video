import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'
import MovieCard from './MovieCard'
import verifyJWT from './Authorize'
const URL = "http://localhost:5555/movies"

function MovieCollection({ id }) {
  const [movieList, setMovieList] = useState([])
  const [cartId, setCartId] = useState(0)
  const userId = JSON.parse(localStorage.getItem('UserId')) || 0;
  const history = useHistory()
  const jwt = localStorage.getItem('token')
  verifyJWT(jwt, id)

  const checkLogin = () => {
    const show = JSON.parse(localStorage.getItem('isLoggedIn'))
    if (!show) {
      localStorage.clear()
      history.push('/')
      return
    }
  }
  
  useEffect(() => {
    checkLogin()
    fetch("/movies")
    .then(res => res.json())
    .then(data => {
      const show = JSON.parse(localStorage.getItem('isLoggedIn'))
      if (show) {
        setMovieList(data)
      } else {
        localStorage.clear()
        history.push('/')
      }
    })
   }, [id, history]);

  useEffect(() => {
    checkLogin()
    fetch(`http://localhost:5555/users/${userId}/my_cart`)
    .then(res => res.json())
    .then(data => {
      if (data.id) {
        localStorage.setItem("cartId", data.id)
        setCartId(data.id)
      } else {
        localStorage.clear()
      }
    })
  }, [userId]);

  checkLogin()

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
