import React from "react";
import { Card, Image } from "semantic-ui-react";

import "./About.css";
import nico from "./Images/Team/nico.jpg";
import will from "./Images/Team/will.jpg";
import jigar from "./Images/Team/jigar.jpg";
import manny from "./Images/Team/manny.jpg";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-pivot-container">
        <h1 className="about-title">About Pivot</h1>
        <hr className="horizontal-line" />
        <p className="about-pivot-content">
          Pivot is designed to combine the simplicity of modern languages with
          the capabilities of functional languages. Inspired by languages like
          Awk, F#, Erlang, and JS, Pivot takes an impure approach with the
          mindset of removing the limitations of similar languages.
        </p>
        <div className="about-buttons">
          <a
            href="https://github.com/wdibi/Pivot"
            target="_blank"
            rel="noopener noreferrer"
            className="repo-button"
          >
            Visit our GitHub!
          </a>
          <a
            href="https://github.com/wdibi/Pivot/blob/master/grammar/pivot.ohm"
            target="_blank"
            rel="noopener noreferrer"
            className="repo-button"
          >
            See Our Grammar!
          </a>
        </div>
      </div>
      <div className="team-container">
        <h1 className="about-title">Meet The Team</h1>
        <hr className="horizontal-line" />
        <div className="team-content">
          <Card className="member-card">
            <Image src={manny} wrapped ui={false} />
            <Card.Content>
              <Card.Header>Manny Barreto</Card.Header>
            </Card.Content>
            <Card.Content extra className="about-card-content">
              <a
                href="https://github.com/mannybarreto"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/manny-barreto/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </Card.Content>
          </Card>
          <Card className="member-card">
            <Image src={will} wrapped ui={false} />
            <Card.Content>
              <Card.Header>Will DiBiagio</Card.Header>
            </Card.Content>
            <Card.Content extra className="about-card-content">
              <a
                href="https://github.com/wdibi"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/wdibi/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </Card.Content>
          </Card>
          <Card className="member-card">
            <Image src={nico} wrapped ui={false} />
            <Card.Content>
              <Card.Header>Nicolas Raymundo</Card.Header>
            </Card.Content>
            <Card.Content extra className="about-card-content">
              <a
                href="https://github.com/nraymundo"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/nicolasraymundo/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </Card.Content>
          </Card>
          <Card className="member-card">
            <Image src={jigar} wrapped ui={false} />
            <Card.Content>
              <Card.Header>Jigar Swaminarayan</Card.Header>
            </Card.Content>
            <Card.Content extra className="about-card-content">
              <a
                href="https://github.com/JigarSwam"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/jigarswaminarayan/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
