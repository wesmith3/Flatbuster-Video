import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import MenuBar from "./MenuBar";
import Router from "./Router";

function App() {


  return (
  <div>
    <Header />
    <MenuBar />
    <Router is_logged_in={true} />
    <Footer />
  </div>
  )
}

export default App;
