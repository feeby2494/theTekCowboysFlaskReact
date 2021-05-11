import React, { useState, useEffect, Component } from "react";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";


class UserHome extends Component {

  constructor(props) {
    super(props);


    this.state = {
      // showModerator: false,
      showAdmin: false,
      currentUser: undefined,
      username: '',
      email: '',
      public_id: '',
    }
    this.getUserInfo = this.getUserInfo.bind(this);
  }

  getUserInfo(personId) {
    fetch(`/api/user/${personId}`,{
        method:'GET',
        headers: {'x-access-token': localStorage.getItem('token')}
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        this.setState({
          username: response[personId].username,
          email: response[personId].email,
          public_id: response[personId].public_id
        });
      })
      .catch((error) => console.log(error));
  }

  componentDidMount(){
    console.log(this.props.match.params)
    this.getUserInfo(this.props.match.params.personId);
  }

  render() {


    return (
      <>

        <h1>username: {this.state.username}</h1>
        <h2>email: {this.state.email}</h2>
        <h2>public_id: {this.state.public_id}</h2>

        <Link to="/">Back to homepage</Link>

      </>
    );
  }
}

export default UserHome;
