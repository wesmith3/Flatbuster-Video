import { Switch, Route } from "react-router-dom";
import Cart from "./Cart";
import Complaint from "./Complaint";
import Login from "./Login";
import MovieCollection from "./MovieCollection";
import Profile from "./Profile";
import StockRequest from "./StockRequest";
import Signup from "./Signup";
import Welcome from "./Welcome";

function Router({is_logged_in, is_employee}) {
    // const Switch =  ( 
    //     <>
    //         <Route path="/leader-board" element={<LeaderBoard />} />,
    //         <Route path="/instructions" element={<Instructions />} />,
    //         <Route path="/your-puzzles" element={<YourPuzzles />} />,
    //         <Route path="/loading" element={<Loading/>} />
    //         <Route path="/loading/:param" element={<Loading/>} />
    //     </>
    // )
  return (
    <>
      <Switch>
        {is_logged_in ? (is_employee ? (
            <Signup />
        ) : 
        (<Route exact path="/carts">
                <Cart />
            </Route>,
            <Route exact path="/complaints">
                <Complaint />
            </Route>,
            <Route exact path="/movies">
                <MovieCollection />
            </Route>)
        ) : null}
        <Route exact path="/">
            <Welcome />
        </Route>
      </Switch>
    </>
  );
}

export default Router;