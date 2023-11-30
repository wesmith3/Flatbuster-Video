import React, { useState } from "react";
import { Card, Image, Modal, Button, Rating } from "semantic-ui-react";

function MovieCard({
  title,
  genre,
  release_year,
  stock,
  description,
  image,
  rating,
}) {
  const [open, setOpen] = useState(false);
  const [isSoldOut, setIsSoldOut] = useState(stock === 0);

  return (
    <div onClick={() => setOpen(true)}>
      <Card>
        <Image
          src={image}
          wrapped
          ui={true}
          dimmed={isSoldOut ? "show" : "hide"}
        />
        {isSoldOut && <div className="sold-out-overlay">OUT OF STOCK</div>}
      </Card>
      <Modal
        className="movie_modal"
        onClose={() => setOpen(false)}
        dimmed="show"
        dimmer="blurring"
        size="small"
        open={open}
      >
        <Modal.Header>{title}</Modal.Header>
        <Modal.Content image>
          <Image size="medium" src={image} />
          <Modal.Description>
            <p>
              <strong>Quick Synopsis:</strong> {description}
            </p>
            <p>
              <strong>Genre:</strong> {genre}
            </p>
            <p>
              <strong>Year:</strong> {release_year}
            </p>
            <div
              className="ratingDiv"
              style={{ margin: "0 0 1em", lineHeight: "1.4285em" }}
            >
              <strong>Average Rating:</strong> {rating}/10
              <Rating icon="star" defaultRating={1} />
            </div>
            <p>
              <strong>Available Copies:</strong> {stock}
            </p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="blue">Add to Cart</Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default MovieCard;
