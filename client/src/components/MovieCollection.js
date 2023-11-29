import { useEffect, useState } from 'react'
import { Grid } from 'semantic-ui-react'
import MovieCard from './MovieCard'
const URL = "http://localhost:5555/movies"

function MovieCollection() {
  const [movieList, setMovieList] = useState([])

  useEffect(() => {
    fetch(URL)
    .then(res => res.json())
    .then(setMovieList)
    .catch(err => alert(err))
  }, []);


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
