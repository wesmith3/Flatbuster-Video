import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"
import { Card, Image, Modal, Button, Rating, Message } from "semantic-ui-react";
import verifyJWT from "./Authorize"



function MovieCard({ id, title, genre, release_year, stock, description, image, rating, cartId }) {

  const [open, setOpen] = useState(false);
  const [added, setAdded] = useState(false);
  const [isSoldOut, setIsSoldOut] = useState(true);
  const UserId = JSON.parse(localStorage.getItem("UserId")) || 0;
  const jwt = localStorage.getItem('token')
  const history = useHistory()
  verifyJWT(jwt, UserId)
  useEffect(() => {
    stock === 0 ? setIsSoldOut(true) : setIsSoldOut(false)
  }, [stock])

  const addToCart = () => {
    const show = JSON.parse(localStorage.getItem('isLoggedIn'))
    if (!show) {
      alert("Not valid login creditials!")
      localStorage.clear()
      history.push('/')
      return
    }
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
            .then(() => setAdded(true))
            .catch((err) => alert(err));
        }
      })
      .catch((err) => alert(err));
  };

  const showModal = () => {
    verifyJWT(jwt, UserId)
    const show = JSON.parse(localStorage.getItem('isLoggedIn'))
    if (!show) {
      alert("Not valid login creditials!")
      localStorage.clear()
      history.push('/')
      return
    }
    setOpen(true)
  }

  const color = isSoldOut ? "red" : "blue"
  const btnText = isSoldOut ? "Not In Stock" : "Add to Cart"

  return (
    <div onClick={() => showModal()}>
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
          <Message hidden positive>
                <Message.Header>You are eligible for a reward</Message.Header>
                  <p>
                    Go to your <b>special offers</b> page to see now.
                  </p>
            </Message>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default MovieCard;
