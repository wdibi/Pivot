import React from "react";
import Fade from "react-reveal/Fade";

import "./Home.css";

const Home = () => {
  return (
    <Fade clear duration={4000}>
      <div className="main-paragraph">
        <p className="intro-content">
          Hello, my name is Nico. I am a developer and photographer currently
          studying computer science at{" "}
          <a class="intext-hyperlink" href="http://lmu.edu" target="_blank">
            Loyola Marymount University
          </a>
          .
        </p>
      </div>
    </Fade>
  );
};

export default Home;
