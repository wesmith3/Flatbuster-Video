import { useEffect, useState } from "react";
import { Button, Table } from 'semantic-ui-react';

function Cart() {
  const [cartData, setCartData] = useState(null);
  const [movieQuantities, setMovieQuantities] = useState({});
  const cartId = window.localStorage.getItem("cartId");

  useEffect(() => {
    fetch(`http://localhost:5555/carts/${cartId}`)
      .then(res => res.json())
      .then(data => {
        setCartData(data);
        console.log(data)
      })
      .catch((err) => alert(err));
  }, [cartId]);

  const handleDelete = (movieId) => {
    debugger
    fetch(`http://localhost:5555/cart_movies/${movieId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cart_id: cartId,
        movie_id: movieId,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to remove movie from cart");
        }
        console.log("Movie removed from cart successfully");
        // You might want to update your UI or take additional actions upon successful removal
      })
      .catch((err) => alert(err));
  };

  return (
    <div>
      <h1 className="cart-header">MY CART</h1>
      <Table celled className="custom-cart-table">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={10}>Movies</Table.HeaderCell>
            <Table.HeaderCell width={1}>Delete</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {cartData &&
            cartData.movies.map((movie, index) => {
              const movieId = movie.movie_id;
              return (
                <Table.Row key={index}>
                  <Table.Cell>{movie.title}</Table.Cell>
                  <Table.Cell>
                    <Button icon='trash' onClick={() => handleDelete(movieId)}></Button>
                  </Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>
    </div>
  );
}

export default Cart;
