import React from 'react';
import './App.css';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import {connect} from "react-redux";
import {logged_in_status, logged_out_status} from "./store/action";

class Navigation extends React.Component {
  constructor(props){
      super(props);
        this.handleLoggedIn = this.handleLoggedIn.bind(this);
  }

  handleLoggedIn = () => {
    const token = localStorage.getItem('token')
    if (token) {
      this.props.dispatch(logged_in_status());
    } else {
      this.props.dispatch(logged_out_status());
    }
  };

  componentDidMount() {
    setInterval(() => {
      this.handleLoggedIn();
    }, 1000);


    }


  render(){



    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/">Seolynn</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>

            <Nav.Link href="/about">About Us</Nav.Link>
            <Nav.Link href="/admin">Admin</Nav.Link>

            {/* <NavDropdown title="Travel Preparation" id="basic-nav-dropdown">

              <NavDropdown.Item href="/flashcards">Learn Japanese or Korean Vocab</NavDropdown.Item>
              <NavDropdown.Item href="/genki_one">Genki I Grammar Study</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/points">Points</NavDropdown.Item>
              { /*
              <NavDropdown.Item href="#action/3.4">Work and Study Opportunities</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">Living in Korea</NavDropdown.Item>
              
              }
              </NavDropdown> 
            */}
            {/*
              <NavDropdown title="Local Culture" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">DFW Korean Spots</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">DFW Japanese Spots</NavDropdown.Item>
                <NavDropdown.Divider />

              </NavDropdown>
            */}
            {/*
              <NavDropdown title="Services" id="basic-nav-dropdown">
                <NavDropdown.Item href="/device_repair">Device Repair</NavDropdown.Item>
                <NavDropdown.Item href="/language_tutoring">Language Tutoring</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/web_project">Web Projects</NavDropdown.Item>
              </NavDropdown>
            */}

            {
              (this.props.loggedIn === true) ?
              <>
                <Nav.Link href="/logout">logout</Nav.Link> 
                <Nav.Link href={'/' + localStorage.getItem('public_id')}>User Home</Nav.Link>
                
              </>
              :
              <>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
              </>
            }

            
            
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = state => {
  const loggedIn = state.loggedIn;
  return {loggedIn};
};

export default connect(mapStateToProps)(Navigation);
