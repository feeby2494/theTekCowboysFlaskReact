import React from 'react';
import './App.css';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';

class Navigation extends React.Component {

  render(){



    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Seolynn</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>

            <Nav.Link href="/about">About Us</Nav.Link>


            <NavDropdown title="Travel Preparation" id="basic-nav-dropdown">

              <NavDropdown.Item href="/flashcards">Learn Japanese or Korean Vocab</NavDropdown.Item>
              <NavDropdown.Item href="/genki_one">Genki I Grammar Study</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Work and Study Opportunities</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">Living in Korea</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Local Culture" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">DFW Korean Spots</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">DFW Japanese Spots</NavDropdown.Item>
              <NavDropdown.Divider />

            </NavDropdown>
            <NavDropdown title="Services" id="basic-nav-dropdown">
              <NavDropdown.Item href="/device_repair">Device Repair</NavDropdown.Item>
              <NavDropdown.Item href="/language_tutoring">Language Tutoring</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/web_project">Web Projects</NavDropdown.Item>
            </NavDropdown>
            {
              localStorage.getItem('token') ?
              <Nav.Link href="/logout">logout</Nav.Link>
              :
              <Nav.Link href="/login">Login</Nav.Link>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navigation;
