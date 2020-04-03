import React from "react";
import Fade from "react-reveal/Fade";

import "./Home.css";

const Home = () => {
  return (
    <Fade clear duration={4000}>
      <div className="main-paragraph">
        <p className="intro-content">A new spin on programming</p>
      </div>
    </Fade>
  );
};

export default Home;
