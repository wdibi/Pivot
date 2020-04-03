import React, { useState } from "react";

import "./App.css";

import AppHeader from "./AppHeader";
import Home from "./Home";
import About from "./About";
import Code from "./Code";

const App = () => {
  let [currDisplay, setCurrDisplay] = useState("home");

  return (
    <div className="App">
      <div className="AppHeader">
        <AppHeader setCurrDisplay={setCurrDisplay} />
      </div>
      <div className="content">
        {currDisplay === "home" && <Home />}
        {currDisplay === "about" && <About />}
        {currDisplay === "code" && <Code />}
      </div>
    </div>
  );
};

export default App;
