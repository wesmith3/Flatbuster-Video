import React from 'react'
import { Card, Image, Icon, CardContent, Button } from 'semantic-ui-react'

function MovieCard() {
  return (
    <>
    <Card className='movie-card'>
      <Image src="https://i5.walmartimages.com/asr/79f45789-667f-46f3-baef-1c3fcc0cfdbc.12bd994a33d2921e1c683a014b6c9e99.jpeg" wrapped ui={false} />
    </Card>
    </>
  )
}

export default MovieCard
