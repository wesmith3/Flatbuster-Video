import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import MenuBar from "./MenuBar";
import MovieCollection from './MovieCollection'
import Welcome from "./Welcome";
import Router from "./Router";

function App() {


  return (
  <div>
    <Header />
    <MenuBar />
    {/* <Welcome /> */}
    {/* <MovieCollection /> */}
    <Router is_employee={false} is_logged_in={true} />
    <Footer />
  </div>
  )
}

export default App;
