import React from 'react'
import { Card, Image, Icon } from 'semantic-ui-react'

function MovieCard() {
  return (
    <Card className='movie-card'>
    <Image src='https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_.jpg' wrapped ui={false} />
    <Card.Content>
      <Card.Header>Avengers: Infinity War</Card.Header>
      <Card.Meta>
        <span className='date'>Action/Adventure</span>
      </Card.Meta>
      <Card.Description>
        Matthew is a musician living in Nashville.
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
        22 Rent
      </a>
    </Card.Content>
  </Card>
  )
}

export default MovieCard
