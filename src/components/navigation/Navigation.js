import React from 'react';
import '../../App.css';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import {connect} from "react-redux";
import {logged_in_status, logged_out_status} from "../../store/action";
import jwt_decode from "jwt-decode";

class Navigation extends React.Component {
  constructor(props){
      super(props);
        this.handleLoggedIn = this.handleLoggedIn.bind(this);
  }

  handleLoggedIn = () => {
    if (localStorage.getItem('token') === undefined) {
      localStorage.removeItem('token');
    } else {
      const token = localStorage.getItem('token');
      let currentDate = new Date();
      if (token) {
        let decodedToken = jwt_decode(token);
        
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
          this.props.dispatch(logged_out_status());
        } else {
          this.props.dispatch(logged_in_status());
        }
      } else {
        this.props.dispatch(logged_out_status());
      } 
    }
    if (localStorage.getItem('token') === undefined) {
      localStorage.removeItem('token');
    }
  };

  // What's happening is that the token is being handled before it is set in localstorage

  componentDidMount() {
    if(localStorage.getItem('token')){
      setInterval(() => {
        this.handleLoggedIn();
      }, 1000);
    }
    
    }


  render(){

    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/">
          <img
            style={{ height: 40, background: `rgba(52, 58, 64, 0.3)` }}
            src={`${process.env.PUBLIC_URL}/seolynn_name_ver_3_hr.gif`}
            
            thumbnail
            fluid>
            
          </img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown className="col" title="My Services" id="dropdown-nav-services">
              <NavDropdown.Item href="/repair">Mail-In Repair</NavDropdown.Item>
               
            </NavDropdown> 
            <NavDropdown className="col" title="More Info" id="dropdown-nav-info">
              <NavDropdown.Item href="/about">About Us</NavDropdown.Item>
              <NavDropdown.Item href="/price_list">Price List</NavDropdown.Item>  
            </NavDropdown> 
            
            <NavDropdown className="col" title="User Managment" id="dropdown-nav-user">
              {
                (this.props.loggedIn === true) ?
                <>
                  <NavDropdown.Item href="/logout">logout</NavDropdown.Item> 
                  <NavDropdown.Item href={'/' + localStorage.getItem('public_id')}>User Home</NavDropdown.Item>
                  
                </>
                :
                <>
                  <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                  <NavDropdown.Item href="/register">Register</NavDropdown.Item>
                </>
              }
              <NavDropdown.Divider />
              <NavDropdown.Item href="/admin">Admin</NavDropdown.Item>
            </NavDropdown> 
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
