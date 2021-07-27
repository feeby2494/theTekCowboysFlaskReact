import React,{Component} from 'react';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class Login extends Component {
    constructor(){
        super();
        this.state={
            username:'',
            email:'',
            password:''
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
        fetch('/api/register',{
            method:'POST',
            body: JSON.stringify(this.state),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then(user_token=>{
            let { token } = user_token;
            localStorage.setItem('token', token);
            this.props.history.push('/');

        })
    }
    render(){
        return(
            <div id="register">
              <Row>
                <Col md={2}></Col>
                <Col md={8} className="justify-content-lg-center">
                  <Jumbotron className="mr-5 ml-5 mt-5">
                    <Row>
                      <Col>
                        <h1>Register</h1>
                      </Col>
                    </Row>
                    <Row>

                      <Col lg={4} className="">
                        <Form.Group controlId="username-input">
                          <Form.Label for="username-input">Username:</Form.Label>
                          <Form.Control as="input" type="username" autoComplete="true" name="username" placeholder="Enter username" value={this.state.username} onChange={this.handleInputChange}>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                      <Col lg={4} className="">
                        <Form.Group controlId="email-input">
                          <Form.Label for="email-input">Email:</Form.Label>
                          <Form.Control as="input" type="email"  autoComplete="true" name="email" placeholder="Enter email" value={this.state.email} onChange={this.handleInputChange}>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                      <Col lg={4} className="">
                        <Form.Group controlId="password-input">
                          <Form.Label for="password-input">Password:</Form.Label>
                          <Form.Control as="input" type="password"  autoComplete="true" name="password" placeholder="Enter password" value={this.state.password} onChange={this.handleInputChange}>
                          </Form.Control>
                        </Form.Group>
                      </Col>

                    </Row>
                    <Row>

                      <Col style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button className="mr-4" onClick={this.onSubmit} type="submit" value="Register" variant="info">Register</Button> {' '}
                      </Col>
                    </Row>
                  </Jumbotron>
                </Col>
                <Col md={2}></Col>
              </Row>
            </div>
          );
    }
}
