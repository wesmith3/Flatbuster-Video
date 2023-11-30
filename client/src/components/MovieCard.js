import React, { useState, useEffect } from "react";
import { Card, Image, Modal, Button, Rating } from "semantic-ui-react";



function MovieCard({ id, title, genre, release_year, stock, description, image, rating, cartId }) {

  const [open, setOpen] = useState(false);
  const [isSoldOut, setIsSoldOut] = useState(true);
  useEffect(() => {
    stock === 0 ? setIsSoldOut(true) : setIsSoldOut(false)
  }, [stock])

  const addToCart = () => {
    fetch("http://localhost:5555/cart_movies")
      .then((res) => res.json())
      .then((cartItems) => {
        const isMovieInCart = cartItems.some((item) => item.movie_id === id && item.cart_id === cartId);
        if (isMovieInCart) {
          alert("This movie is already in your cart.");
        } else {
          fetch("http://localhost:5555/cart_movies", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              cart_id: cartId,
              movie_id: id,
            }),
          })
            .then((res) => res.json())
            .then(() => alert("Movie successfully added to cart!"))
            .catch((err) => alert(err));
        }
      })
      .catch((err) => alert(err));
  };

  const color = isSoldOut ? "red" : "blue"
  const btnText = isSoldOut ? "Not In Stock" : "Add to Cart"

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
        className="movie-modal"
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
          <Button color={color} onClick={isSoldOut ? null : addToCart}>{btnText}</Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default MovieCard;
