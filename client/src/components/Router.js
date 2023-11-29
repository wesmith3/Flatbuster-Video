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
  return (
    <>
      {is_logged_in ? (
        <Switch>
          <Route path="/carts" exact component={Cart} />
          <Route path="/complaints" exact component={Complaint} />
          <Route path="/login" exact component={Login} />
          <Route path="/movies" exact component={MovieCollection} />
          <Route path="/profiles" exact component={Profile} />
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
