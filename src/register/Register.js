import React,{Component} from 'react';
import Button from 'react-bootstrap/Button';
// import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Alert } from 'react-bootstrap';
import {logged_in_status} from "../store/action";
import {connect} from "react-redux";

class Register extends Component {
    constructor(){
        super();
        this.state={
            username:'',
            email:'',
            password:'',
            name: '',
            passwordMatch: true,
            passwordMatchInput: ''
        };
    }

    handleInputChange =(e)=>{
        const {value,name}= e.target;
        this.setState({
            [name]:value
        });
    }

    onSubmit =(e)=>{
        e.preventDefault();

        if(this.state.password === this.state.passwordMatchInput) {
          fetch('/api/register',{
            method:'POST',
            body: JSON.stringify(this.state),
            headers:{
                'Content-Type':'application/json'
            }
          })
          .then(res=>res.json())
          .then(user_token=>{
            // Warning: navigation is checking for token before it's set
              let { token } = user_token;
              localStorage.setItem('token', token);
              this.props.dispatch(logged_in_status());
              this.props.history.push('/');
          });
        } else {
          this.setState({
            passwordMatch: false
          });
        }
    }
    render(){
        return(
            <div id="register">
              <Row>
                <Col md={2}></Col>
                <Col md={8} className="justify-content-lg-center">
                  <div className="jumbotron mr-5 ml-5 mt-5">
                    <Row>
                      <Col>
                        <h1>Register</h1>
                      </Col>
                    </Row>
                    <Row>

                      <Col lg={3} className="">
                        <Form.Group controlId="username-input">
                          <Form.Label for="username-input">Username:</Form.Label>
                          <Form.Control as="input" type="username" autoComplete="true" name="username" placeholder="Enter username" value={this.state.username} onChange={this.handleInputChange}>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                      <Col lg={3} className="">
                        <Form.Group controlId="email-input">
                          <Form.Label for="email-input">Email:</Form.Label>
                          <Form.Control as="input" type="email"  autoComplete="true" name="email" placeholder="Enter email" value={this.state.email} onChange={this.handleInputChange}>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                      <Col lg={3} className="">
                        <Form.Group controlId="name-input">
                          <Form.Label for="name-input">Full Name:</Form.Label>
                          <Form.Control as="input" type="name"  autoComplete="true" name="name" placeholder="Enter Full Name" value={this.state.name} onChange={this.handleInputChange}>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                    <Col lg={6} className="">
                        <Form.Group controlId="password-input">
                          <Form.Label for="password-input">Password:</Form.Label>
                          <Form.Control as="input" type="password"  autoComplete="true" name="password" placeholder="Enter password" value={this.state.password} onChange={this.handleInputChange}>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                      <Col lg={6} className="">
                        <Form.Group controlId="password-input-match">
                          <Form.Label for="password-input-match">Password Check:</Form.Label>
                          <Form.Control as="input" type="password"  autoComplete="true" name="passwordMatchInput" placeholder="Enter password again" value={this.state.passwordMatchInput} onChange={this.handleInputChange}>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        {
                          ( this.state.password === "" || this.state.passwordMatchInput === "" )
                            ?
                              <></>
                            :
                              ( this.state.password === this.state.passwordMatchInput )
                              ?
                                <Alert>Passwords match!</Alert>
                              :
                                <Alert variant={'danger'}>Passwords don't match!</Alert>
                        }
                      </Col>
                    </Row>
                    <Row>
                      <Col style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button className="mr-4" onClick={this.onSubmit} type="submit" value="Register" variant="info">Register</Button> {' '}
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col md={2}></Col>
              </Row>
            </div>
          );
    }
}

const mapStateToProps = state => {
  const loggedIn = state.loggedIn;
  return {loggedIn};
};

export default connect(mapStateToProps)(withRouter(Register));