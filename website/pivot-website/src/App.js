import React, { useState } from "react";

import "./App.css";

import AppHeader from "./AppHeader";
import Home from "./Home";
import About from "./About";
// import Projects from "./Projects";
// import Contact from "./Buttons";

const App = () => {
  let [currDisplay, setCurrDisplay] = useState("home");

  return (
    <div className="App">
      <div className="AppHeader">
        <AppHeader setCurrDisplay={setCurrDisplay} />
      </div>
      <div className="contentTest">
        {currDisplay === "home" && <Home />}
        {currDisplay === "about" && <About />}
        {/* {currDisplay === "projects" && <Projects />} */}
      </div>
    </div>
  );
};

export default App;
