import React from 'react'
import { Card, Image, Icon, CardContent, Button } from 'semantic-ui-react'

function MovieCard() {
  return (
    <Card className='movie-card'>
      <Image src="https://m.media-amazon.com/images/I/71QlKKzTJ7L._AC_UF894,1000_QL80_.jpg" wrapped ui={false} />
    </Card>
  )
}

export default MovieCard
