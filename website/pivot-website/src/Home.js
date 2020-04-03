import React from "react";
import Fade from "react-reveal/Fade";

import "./Home.css";
import pivot from "./Images/Pivot/pivot.png";

const Home = () => {
  return (
    <Fade clear duration={4000}>
      <div className="main-paragraph">
        <img src={pivot} alt="logo top" className="home-logo" />
        <p className="intro-content">A new spin on programming</p>
      </div>
    </Fade>
  );
};

export default Home;
