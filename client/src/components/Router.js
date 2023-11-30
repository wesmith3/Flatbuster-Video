import { useState } from 'react'
import { Switch, Route } from "react-router-dom";
import Cart from "./Cart";
import Complaint from "./Complaint";
import Error from "./Error";
import Login from "./Login";
import MovieCollection from "./MovieCollection";
import Profile from "./Profile";
import Signup from "./Signup";
import StockRequest from "./StockRequest";
import Welcome from "./Welcome";

function Router({ is_logged_in }) {
  const [user, setUser] = useState({id: 0})
  const currentUser = (new_user) => {
    setUser(new_user)
  }
  // console.log(`User - ${user.id}`)
  
  return (
    <>
      {is_logged_in ? (
        <Switch>
          <Route path="/carts" exact component={Cart} />
          <Route path="/login" exact render={() => <Login currentUser={currentUser}/>} />
          <Route path="/movies" exact render={() => <MovieCollection id={user.id}/>} />
          <Route path="/my_account" exact component={Profile} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/stock_requests" exact component={StockRequest} />
          <Route path="/" exact component={Welcome} />
          <Route path="*" component={Error} />
        </Switch>
      ) : (
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="*" component={Welcome} />
        </Switch>
      )}
    </>
  );
}

export default Router;
