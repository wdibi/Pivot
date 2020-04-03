import React from "react";
import Fade from "react-reveal/Fade";

import "./About.css";
import jonah from "./Images/Filler/jonah.jpg";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-me-container">
        <h1 className="about-title">About Pivot</h1>
        <hr className="horizontal-line" />
        <p className="about-me-content">
          Pivot is designed to combine the simplicity of modern languages with
          the capabilities of functional languages. Inspired by languages like
          Awk, F#, Erlang, and JS, Pivot takes an impure approach with the
          mindset of removing the limitations of similar languages.
        </p>
      </div>
      <div className="skills-container">
        <h1 className="about-title">Meet The Team</h1>
        <hr className="horizontal-line" />
        <div className="skills-content">
          <div className="about-profile">
            <img src={jonah} alt="jonah" className="playroll-img" />
            <h2 className="list-title">Manny Barreto</h2>
          </div>
          <div className="about-profile">
            <h2 className="list-title">Will DiBiagio</h2>
            <img src={jonah} alt="jonah" className="playroll-img" />
          </div>
          <div className="about-profile">
            <h2 className="list-title">Nicolas Raymundo</h2>
            <img src={jonah} alt="jonah" className="playroll-img" />
          </div>
          <div className="about-profile">
            <h2 className="list-title">Jigar Swaminarayan</h2>
            <img src={jonah} alt="jonah" className="playroll-img" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
