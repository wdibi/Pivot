import React from "react";
import Fade from "react-reveal/Fade";

import "./About.css";
import nico from "./Images/Team/nico.jpg";
import will from "./Images/Team/will.png";
import jigar from "./Images/Team/jigar.png";
import manny from "./Images/Team/manny.png";

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
        <div className="about-buttons">
          <button className="repo-button">Visit our GitHub!</button>
          <button className="repo-button">See Our Grammar!</button>
        </div>
      </div>
      <div className="skills-container">
        <h1 className="about-title">Meet The Team</h1>
        <hr className="horizontal-line" />
        <div className="skills-content">
          <div className="about-profile">
            <img src={manny} alt="manny" className="playroll-img" />
            <h2 className="list-title">Manny Barreto</h2>
          </div>
          <div className="about-profile">
            <img src={will} alt="will" className="playroll-img" />
            <h2 className="list-title">Will DiBiagio</h2>
          </div>
          <div className="about-profile">
            <img src={nico} alt="nico" className="playroll-img" />
            <h2 className="list-title">Nicolas Raymundo</h2>
          </div>
          <div className="about-profile">
            <img src={jigar} alt="jigar" className="playroll-img" />
            <h2 className="list-title">Jigar Swaminarayan</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
