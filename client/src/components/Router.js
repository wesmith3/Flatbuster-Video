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

function Router() {
  const isLoggedIn = window.localStorage.getItem("isLoggedIn")
  return (
    <>
      {isLoggedIn ? (
        <Switch>
          <Route path="/my_cart" exact component={Cart} />
          <Route path="/complaints" exact component={Complaint} />
          <Route path="/login" exact component={Login} />
          <Route path="/movies" exact component={MovieCollection} />
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
