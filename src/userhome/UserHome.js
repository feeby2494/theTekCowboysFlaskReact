import React, { useState, useEffect, Component } from "react";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Toast from 'react-bootstrap/Toast';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';


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
      error: null,
      showAdminToast: false,
      generalLedgerLines: null,
      newLineForLedger: {
        id: null,
        desc: null,
        part_number: null,
        type: null,
        expense: null,
        revenue: null,
        profit: null,
        price: null,
        qty_sold_per_listing: null,
        ebay_order_number: null,
        amazon_order_number: null,
        ebay_fees: null,
        shipping: null,
        taxes: null,
        extra_fees: null,
        part_expenses: null,
        seller: null,
        created_by: null,
        date: null
      }
    }
    this.getUserInfo = this.getUserInfo.bind(this);
    this.showHideAdminToast = this.showHideAdminToast.bind(this);
    this.handleNewLineItemChange = this.handleNewLineItemChange.bind(this);
    this.getGeneralLedgerLines = this.getGeneralLedgerLines.bind(this);
    this.postGeneralLedgerLine = this.postGeneralLedgerLine.bind(this);
  }

  getUserInfo(personId) {
    fetch(`/api/user/${personId}`,{
        method:'GET',
        'Content-Type':'application/json',
        headers: {'x-access-token': localStorage.getItem('token')}
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        this.setState({
          username: response[personId].username,
          email: response[personId].email,
          public_id: response[personId].public_id,
          showAdmin: response[personId].admin,
          showAdminToast: true
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          error: error
        });
      });
  }




  showHideAdminToast(event) {
    this.setState({
      showAdminToast: !this.state.showAdminToast
    });
  }

  handleNewLineItemChange = (event, item) => {
    const newLinePromise = new Promise((resolve, reject) => {
      let newState= Object.assign({}, this.state);
      newState.newLineForLedger[item[0]] = event.target.value;
      resolve( 
        newState
      );
    });

    newLinePromise.then((newState) => {
      this.setState(newState);
    });
    // let newState= Object.assign({}, this.state);
    // newState.newLineForLedger[item] = event.target.value;
    // this.setState(newState);
  }

  getGeneralLedgerLines = () => {
    fetch(`/api/general_ledger_all`,{
      method:'GET',
      headers: {'x-access-token': localStorage.getItem('token')}
  })
    .then((res) => res.json())
    .then((response) => {
      console.log(response);
      this.setState({
        generalLedgerLines : response
      });
    })
    .catch((error) => {
      console.log(error);
      this.setState({
        error: error
      });
    });
  }

  postGeneralLedgerLine = () => {
    fetch(`/api/general_ledger_one`, {
      method: 'POST',
      body: JSON.stringify(this.state.newLineForLedger),
      headers: {'x-access-token': localStorage.getItem('token')}
    })
    .then((res) => res.json())
    .then((response) => {
      console.log(response);
      this.setState({
        generalLedgerLines : response
      });
    })
    .catch((error) => {
      console.log(error);
      this.setState({
        error: error
      });
    });
  }

  componentDidMount(){
    console.log(this.props.match.params)
    this.getUserInfo(this.props.match.params.personId);
    this.getGeneralLedgerLines();
  }

  render() {


    return (
      <Container>
        <Row className="my-3">
          <Link to="/">Back to homepage</Link>
        </Row>
        <Row className="my-3">
          <Col>
            <Toast  onClose={this.showHideAdminToast}>
              <Toast.Header>
                <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                <strong className="mr-auto">Hello, {this.state.username}!</strong>
                <small>Current User Info</small>
              </Toast.Header>
              <Toast.Body>
                <p>username: {this.state.username}</p>
                <p>email: {this.state.email}</p>
                <p>public_id: {this.state.public_id}</p>
              </Toast.Body>
            </Toast>
          </Col>
          <Col>
            {
              (this.state.showAdmin) 
              
              ? 
                (this.state.showAdminToast) && 
                  <Toast  onClose={this.showHideAdminToast}>
                    <Toast.Header>
                      <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                      <strong className="mr-auto">Admin</strong>
                      <small></small>
                    </Toast.Header>
                    <Toast.Body>Hello, {this.state.username}. You're an admin!</Toast.Body>
                  </Toast>
                
                
              :
                <p>Big ones</p>
            }
          </Col>
        </Row> 
        <Row>
          <Col xs={12}>
            <hr className="my-4">
            </hr>
          </Col>
          <Col xs={12}>
            <h2 className="w-100 text-center">
              New Line in General Ledger
            </h2>
          </Col>
          <Col xs={12}>
            <hr className="my-4">
            </hr>
          </Col>
        </Row>
        <Form className="w-100 row">
            
            {
              Object.entries(this.state.newLineForLedger).slice(1).map((col) => {
                return (
                  <Col className="col-sm-6 col-lg-4">
                    <Form.Group xs={12} controlId={col + ".control"}>
                      <Form.Label>{col[0]}</Form.Label>
                      <Form.Control
                        type="text"
                        aria-describedby={col + "aria"}
                        name={col} 
                        className="mb-3" 
                        onChange={ (e) => this.handleNewLineItemChange(e, col)}
                      />
                      {/* <Form.Text id={col + "error_message"} muted>
                        { `Value is required for ${col}.`}
                      </Form.Text> */}
                    </Form.Group>
                  </Col>
                  
                );
              })
            }
          <Button onClick={this.postGeneralLedgerLine}>Add New Line</Button>
        </Form>
        <Row>
          <Col xs={12}>
            <hr className="my-4">
            </hr>
          </Col>
          <Col xs={12}>
            <h2 className="w-100 text-center">
              Current General Ledger
            </h2>
          </Col>
          <Col xs={12}>
            <hr className="my-4">
            </hr>
          </Col>
        </Row>
        <Row>
          <Table striped bordered hover size="sm" responsive>
            <thead>
              <tr>
                {/* {
                  (this.state.generalLedgerLines) 
                  
                  ? 
                    Object.keys(this.state.generalLedgerLines["1"]).map((col) => {
                      return (<th>{col}</th>);
                    })
                  :
                    Object.keys(this.state.newLineForLedger).map((col) => {
                      return (<th>{col}</th>);
                    })
                    
                } */}
                {
                  Object.keys(this.state.newLineForLedger).map((col) => {
                    return (<th>{col}</th>);
                  })
                }
              </tr>
            </thead>
            <tbody>
              {/* <tr>
                <td><Button>Add New Line</Button></td>
                {
                  Object.entries(this.state.newLineForLedger).slice(1).map((col) => {
                    return (
                      <td>
                        <InputGroup name={col} className="mb-3" onChange={ (e) => this.handleNewLineItemChange(e, col)}>
                          
                          <FormControl
                            placeholder={col[0]}
                            aria-label={col[0]}
                            aria-describedby="basic-addon1"
                          />
                        </InputGroup>
                      </td>
                    );
                  })

                }
                
              </tr> */}
              {
                  (this.state.generalLedgerLines) 
                  
                  ? 
                    Object.keys(this.state.generalLedgerLines).map((rowKey, index) => {
                      let rowValue = this.state.generalLedgerLines[rowKey]
                      console.log(rowValue)

                      return (
                        <tr>
                          <td>{rowKey}</td>
                          {
                            Object.values(this.state.generalLedgerLines[rowKey]).map((col) => {
                              return (<td>{col}</td>);
                            })
                          }
                        </tr>
                      );
                    })
                  :
                    Object.keys(this.state.newLineForLedger).map((col) => {
                      return (<th></th>);
                    })
                    
                }
            </tbody>
          </Table>
        </Row>
      </Container>
    );
  }
}

export default UserHome;
