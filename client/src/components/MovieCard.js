import React, { useState } from 'react';
import { Card, Image, Modal, Button, Rating } from 'semantic-ui-react';

function MovieCard({ title, genre, release_year, stock, description, image }) {
  const [open, setOpen] = useState(false);

  return (
    <div onClick={() => setOpen(true)}>
      <Card>
        <Image src={image} wrapped ui={false}/>
      </Card>

      <Modal
        className='movie_modal'
        onClose={() => setOpen(false)}
        dimmed='true'
        dimmer='blurring'
        size='small'
        open={open}
      >
        <Modal.Header>{title}</Modal.Header>
        <Modal.Content image>
          <Image size='small' src={image} />
          <Modal.Description>
            <p>
              {description}
            </p>
            <p>
              <strong>Genre:</strong> {genre}
            </p>
            <p>
              <strong>Average Rating:</strong>
              <Rating icon='star' defaultRating={3} maxRating={4} />
            </p>
            <p>
              Available copies: {stock}
            </p>
          </Modal.Description>
        </Modal.Content>

        <Modal.Actions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default MovieCard;