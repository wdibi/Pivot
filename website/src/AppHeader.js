import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

import './AppHeader.css';

const AppHeader = ({ setCurrDisplay }) => {
  return (
    <Navbar>
      <Nav.Link onClick={() => setCurrDisplay('home')} className="logo">
        Pivot
      </Nav.Link>
      <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
        <Nav className="navcontent">
          <Nav.Link onClick={() => setCurrDisplay('home')} className="NavLink">
            Home
          </Nav.Link>
          <Nav.Link onClick={() => setCurrDisplay('about')} className="NavLink">
            About
          </Nav.Link>
          <Nav.Link onClick={() => setCurrDisplay('code')} className="NavLink">
            Code Examples
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppHeader;
