# ReHacked: ReactJS revisited.
<p align="center">
  <img src="logo.png" width="30%">
  
</p>

<!-- https://ecotrust-canada.github.io/markdown-toc/ -->
## Table of Content
- [ReHacked: ReactJS revisited.](#rehacked--reactjs-revisited)
  * [Introduction](#introduction)
  * [Features](#features)
  * [Types](#types)
  * [Examples:](#examples-)
    + [Import](#import)
    + [States](#states)
    + [Actions](#actions)
    + [Events](#events)
    + [Components](#components)

## Introduction
This is ReHacked, a programming language designed to revamp and overhaul React, a popular JavaScript library used to design user interfaces. Inspired by React and it's capabilities as a JS library, ReHacked overcomes React's shortcomings and is laid out in a simpler, more consistent and organized fashion. Intended to be straightforward and clean, ReHacked is built to make building user interfaces as accessible and effortless as it should be.

## Features
* Impure functional language
* One way data binding
* Declarative
* Virtual DOM

## Types
Primitive Types
* String
* Boolean
* Number
* List
* Dictionary

Operators
* Add `+`
* Subtract `-`
* Multiply `*`
* Divide `/`
* Modulus `%`
* Strict Equality `==`
* Less than `<`
* Greater than `>`
* Less than or equal `<=`
* Greater than or equal `>=`
* Increment `++`
* Decrement `--`
* typeof `typeof`
* Logical AND `and`
* Logical OR `or`
* Conditional Render `&&`
* Ternary `a if b else c`
* Comment  `//`

## Examples: 
### Import
An optional segment of the component, necessary only when importing outside CSS or Components. The CSS subsection holds String paths to the .css files corresponding to the component. The component subsection holds a mapping of component name to path of file.

```text
import:
  css: "./App.css", "./Main.css"
  components:
    AppHeader: "./AppHeader", 
    DangerButton: "./buttons/DangerButton"

```

### States
This portion of the component is reserved for declaring states as well as optionally state changing functions. 

```text
states: count = 0
```

```text
states: 
  count = 0 | setCount
```

```text
states: 
  colors = ["red", "green", "blue"]
  colorIndex = 0 | setColorIndex
```

### Actions
```text
actions:
  incrementCount(): setCount(count++)
  multiplyCount(multiplier):
    result = count * multiplier
    setCount(result)
    return result
```

### Events
Events are formatted as such:
_querySelector_ <-- on _event_ then _action_

```text
events:
  "div" <-- on click then incrementCounter(1)
  "#welcomebox" <-- on mouseover then changeText("Hello world")
```

### Components
<table style="table-layout: fixed; width: 100%">
  <tr>
  <th>ReHacked</th>
  <th>React</th>
  </tr>

  <tr>
  <td>

```javascript
RootComponent App:
    imports:
        CSS: "./App.css"
        Components: 
            Header: "./Header"
    
    states:
        count = 0 | setCount
    
    // props:

    actions:
        onIncrement():
            setCount(count++)
        onDecrement():
            setCount(count--)

    // events:
    
    // effects:

    render:
        <div class="App">
            <div class="AppHeader">
                (Header)
            <div class="AppContent">
                <h2>You clicked {count} times!
                <button onClick={() => onIncrement()}> Decrement
                <button onClick={() => onDecrement()}> Increment
```
  </td>

  <td>

```javascript
import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./App.css";
import Header from "./Header";

function App() {
  const [count, setCount] = useState(0);

  const onIncrement = () => setCount(count++);

  const onDecrement = () => setCount(count--);

  return (
    <div className="App">
        <div className="AppHeader">
            <Header />
        </div>
        <div className="AppContent">
            <h2>You clicked {count} times!</h2>
            <button onClick={() => onIncrement()}>Decrement</button>
            <button onClick={() => onDecrement()}>Increment</button>
        </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

  </td>

  </tr>
</table>

<table style="table-layout: fixed; width: 100%">
  <tr>
  <th>ReHacked</th>
  <th>React</th>
  </tr>

  <tr>
  <td>

```javascript
Component App:
    imports:
        CSS: './react-tabs.css', './LeagueData.css'
    
    states:
        count = 0 | setCount
    
    props:
        data,
        table

    // actions:

    // events:
    
    // effects:

    render:
        <div>
            {data && (
                <div class="League">
                    <div class="LeagueHeader">
                        <div class="LeagueName">
                            <p>{data.name}
                        <div class="LeagueInfo">
                            <p>{data.country, data.country_code}
                            <p>{data.season} Season
                    <div class="Teams">
                        {Object.keys(table).length == 2}
                        {table[0] && 
                            table[0].map(teams => (
                                <div class="TeamInfo">
                                    <div>
                                        <img src={teams.logo} alt="logo" class="TeamLogo">
                                    <div> {teams.rank}
                                    <div> {teams.teamName}
                                    <div> Points: {teams.points}
                            ))
                        }
            )}
```
  </td>

  <td>

```javascript
import React from "react";

import "./react-tabs.css";
import "./LeagueData.css";

const LeagueData = props => {
  const { data } = props;
  const { table } = props;
  return (
    <div>
      {data && (
        <div className="League">
          <div className="LeagueHeader">
            <div className="LeagueName">
              <p>{data.name}</p>
            </div>
            <div className="LeagueInfo">
              <p>
                {data.country}, {data.country_code}
              </p>
              <p>{data.season} Season</p>
            </div>
          </div>
          <div className="Teams">
            {Object.keys(table).length === 2}
            {table[0] &&
              table[0].map(teams => (
                <div className="TeamInfo">
                  <div>
                    <img src={teams.logo} alt="logo" className="TeamLogo"></img>
                  </div>
                  <div>{teams.rank}</div>
                  <div>{teams.teamName}</div>
                  <div>Points: {teams.points}</div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeagueData;
```

  </td>

  </tr>
</table>

<table style="table-layout: fixed; width: 100%">
  <tr>
  <th>ReHacked</th>
  <th>React</th>
  </tr>

  <tr>
  <td>

```javascript
Component App:
    imports:
        CSS: ['./AppHeader.css']
        Components: {
            Navbar: 'react-bootstrap/NavBar',
            Nav: 'react-bootstrap/Nav',
            Link: 'react-bootstrap/Nav',
            Fade: 'react-bootstrap/Fade',
            Resume: './Resume.pdf'
        }
    
    // states:
    
    props:
        setCurrDisplay

    // actions:

    // events:
    
    // effects:

    render:
        <div class="navbarContainer">
            <Navbar
                collapseOnSelect
                variant="dark"
                class="navbar"
                expand="xl"
            >
                <Nav.Link onClick={() => setCurrDisplay("intro")} class="logo"> Title
                <Navbar.Toggle
                    class="toggle"
                    aria-controls="responsive-navbar-nav"
                />
                <Navbar.Collapse
                    class="justify-content-end"
                    id="responsive-navbar-nav"
                >
                    <Nav class="navcontent">
                        <Nav.Link
                            onClick={() => setCurrDisplay("education")}
                            class="NavLink"
                        > Education
                        <Nav.Link
                            onClick={() => setCurrDisplay("experience")}
                            class="NavLink"
                        > Experience
                        <Nav.Link href={resume} target="newTab" class="ResumeLink"> Resume
```
  </td>

  <td>

```javascript
import React, { useState } from "react";
import Navbar from "react-bootstrap/NavBar";
import Nav from "react-bootstrap/Nav";
import Link from "react-bootstrap/Nav";
import Fade from "react-reveal/Fade";

import "./AppHeader.css";
import resume from "./resume.pdf";

const AppHeader = ({ setCurrDisplay }) => {
  return (
    <div className="navbarContainer">
        <Navbar
        collapseOnSelect
        variant="dark"
        className="navbar"
        expand="xl"
        >
            <Nav.Link onClick={() => setCurrDisplay("intro")} className="logo">
                N/CO
            </Nav.Link>
            <Navbar.Toggle
                className="toggle"
                aria-controls="responsive-navbar-nav"
            />
            <Navbar.Collapse
                className="justify-content-end"
                id="responsive-navbar-nav"
            >
                <Nav className="navcontent">
                    <Nav.Link
                        onClick={() => setCurrDisplay("education")}
                        className="NavLink"
                    >
                        Education
                    </Nav.Link>
                    <Nav.Link
                        onClick={() => setCurrDisplay("experience")}
                        className="NavLink"
                    >
                        Experience
                    </Nav.Link>
                    <Nav.Link href={resume} target="newTab" className="ResumeLink">
                        Resume
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </div>
  );
};

export default AppHeader;
```

  </td>

  </tr>
</table>

<table style="table-layout: fixed; width: 100%">
  <tr>
  <th>ReHacked</th>
  <th>React</th>
  </tr>

  <tr>
  <td>

```javascript
Component App:
    imports:
        CSS: ['./App.css']
        Components: {
            AppHeader: './AppHeader',
            Intro: './Intro',
            Education: './Education',
            Experience: './Experience',
            Contact: './Contact'
        }
    
    states:
        currDisplay = 'intro' | setCurrDisplay
    
    // props:

    // actions:

    // events:
    
    // effects:

    render:
        <div class="App">
            <div class="AppHeader">
                <div class="menu">
                    <AppHeader setCurrDisplay={setCurrDisplay} />
            <div class="contentTest">
                {currDisplay === "intro" && <Intro />}
                {currDisplay === "education" && <Education />}
                {currDisplay === "experience" && <Experience />}
                {currDisplay === "contact" && <Contact />}
```
  </td>

  <td>

```javascript
import React, { useState } from "react";

import "./App.css";

import AppHeader from "./AppHeader";
import Intro from "./Intro";
import Education from "./Education";
import Experience from "./Experience";
import Contact from "./Contact";

const App = () => {
  let [currDisplay, setCurrDisplay] = useState("intro");

  return (
    <div className="App">
      <div className="AppHeader">
        <div className="menu">
          <AppHeader setCurrDisplay={setCurrDisplay} />
        </div>
      </div>
      <div className="contentTest">
        {currDisplay === "intro" && <Intro />}
        {currDisplay === "education" && <Education />}
        {currDisplay === "experience" && <Experience />}
        {currDisplay === "contact" && <Contact />}
      </div>
    </div>
  );
};

export default App;
```

  </td>

  </tr>
</table>
