import React, { useState } from "react";

import "./App.css";

import AppHeader from "./AppHeader";
import Home from "./Home";
import About from "./About";
import Code from "./Code";

// TEST Deply Script
const App = () => {
  let [currDisplay, setCurrDisplay] = useState("home");

  return (
    <div className="App">
      <div className="app-header">
        <AppHeader setCurrDisplay={setCurrDisplay} />
      </div>
      <div className="app-content">
        {currDisplay === "home" && <Home />}
        {currDisplay === "about" && <About />}
        {currDisplay === "code" && <Code />}
      </div>
    </div>
  );
};

export default App;
