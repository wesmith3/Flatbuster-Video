import React from 'react'
import { Grid } from 'semantic-ui-react'
import MovieCard from './MovieCard'

function MovieCollection() {
  return (
    <Grid centered columns={4}>
      <Grid.Row >
        <Grid.Column>
            <MovieCard />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default MovieCollection
