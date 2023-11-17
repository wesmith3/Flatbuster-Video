import React from 'react'
import { Grid, GridRow, Segment } from 'semantic-ui-react'
import MovieCard from './MovieCard'

function MovieCollection() {
  return (
    <Grid columns='equal'>
      <Grid.Row >
        <Grid.Column>
            <MovieCard />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default MovieCollection
