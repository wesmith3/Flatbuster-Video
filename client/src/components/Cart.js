import { useEffect, useState } from "react";
import { Button, Table } from 'semantic-ui-react';
import { useHistory } from "react-router-dom";
import verifyJWT from "./Authorize";


function Cart() {
  const [cartData, setCartData] = useState(null);;
  const cartId = JSON.parse(localStorage.getItem("cartId"));
  const UserId = JSON.parse(localStorage.getItem("UserId"));
  const jwt = localStorage.getItem('token')
  const history = useHistory()
  verifyJWT(jwt, UserId)

  useEffect(() => {
    fetch(`http://localhost:5555/carts/${cartId}`)
      .then(res => res.json())
      .then(data => {
        const show = JSON.parse(localStorage.getItem('isLoggedIn'))
        if (show) {
          setCartData(data)
        } else {
          localStorage.clear()
          history.push('/')
        }
      })
      .catch((err) => alert(err));
  }, [cartId]);

  const handleDelete = (title) => {
    const show = JSON.parse(localStorage.getItem('isLoggedIn'))
      if (!show) {
        localStorage.clear()
        history.push('/')
      }
    fetch("http://localhost:5555/cart_movies")
      .then((res) => res.json())
      .then((cartItems) => {
        const cartItem = cartItems.find((item) => item.movie.title === title && item.cart_id === cartId);
  
        if (!cartItem) {
          alert("This movie is not in your cart.");
        } else {
          const cartItemId = cartItem.id;
  
          fetch(`http://localhost:5555/cart_movies/${cartItemId}`, {
            method: "DELETE",
          })
            .then((res) => {
              if (res.ok) {
                console.log("Item deleted successfully");
                setCartData((prevCartData) => ({
                  ...prevCartData,
                  movies: prevCartData.movies.filter(movie => movie.title !== title),
                }));
              } else {
                console.error("Error deleting item:", res.statusText);
              }
            })
            .catch((err) => alert(err));
        }
      })
      .catch((err) => alert(err));
  };
  
  const handleMakeRental = () => {

    const show = JSON.parse(localStorage.getItem('isLoggedIn'))
    if (!show) {
      localStorage.clear()
      history.push('/')
    }

    if (!cartData || cartData.movies.length === 0) {
      alert("Your cart is empty. Add movies before starting a rental.");
      return;
    }

    const movieIds = cartData.cart_movies.map((cart_movie) => cart_movie.movie_id);


      fetch("http://localhost:5555/rentals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: cartData.user_id,
          movie_ids: movieIds,
        }),
      })
        .then((res) => {
          if (res.ok) {
            console.log("Rental started successfully");
            setCartData(null);

            const movieIds = cartData.cart_movies.map((cart_movie) => cart_movie.id);

            movieIds.forEach((movie_id) => {
              fetch(`http://localhost:5555/cart_movies/${movie_id}`, {
                method: "DELETE",
              })
                .then((deleteRes) => {
                  if (deleteRes.ok) {
                    console.log("CartItem deleted successfully");
                  } else {
                    console.error("Error deleting cart item:", deleteRes.statusText);
                  }
                })
                .catch((deleteErr) => console.error("Error deleting cart item:", deleteErr));
            }
          );
          } else {
            console.error("Error starting rental:", res.statusText);
          }
        })
        .catch((err) => alert(err))
      history.push("/my_account")
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
              const title = movie.title;
              return (
                <Table.Row key={index}>
                  <Table.Cell>{title}</Table.Cell>
                  <Table.Cell>
                    <Button icon='trash' onClick={() => handleDelete(title)}></Button>
                  </Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>
      <div className="rental-btn">
      <Button floated='right' color="blue" onClick={handleMakeRental}>Start Rental</Button>
      </div>
    </div>
  );
}

export default Cart;
