import React,{Component, useState} from 'react';
import {Modal, Button, Form, Row, Col, Toast } from 'react-bootstrap';

import '../App.css';

const RepairForm = (props) => {
  const [show, setShow] = useState(false);
  const [showStepOne, setShowStepOne] = useState(true);
  const [showStepTwo, setShowStepTwo] = useState(false);
  const [showStepThree, setShowStepThree] = useState(false);
  const [showPublic, setShowPublic] = useState(true);
  const handlePublic = () => {
    setShowPublic(false);
    console.log("handle close for toast")
  }
  const handleStepOne = () => {
    setShowStepOne(true);
    setShowStepTwo(false);
    setShowStepThree(false);
  };
  const handleStepTwo = () => {
    setShowStepOne(false);
    setShowStepTwo(true);
    setShowStepThree(false);
  };
  const handleStepThree = () => {
    setShowStepOne(false)
    setShowStepTwo(false);
    setShowStepThree(true);
  };
  const submitRepairObject = () => {
    props.submitRepair();
    handleClose();
  }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <Col className="my-2">
      <Button variant="primary" onClick={handleShow}>
        Mail-In Repair
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Mail-In Repair Form</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {
            showPublic && 
            <Toast onClose={handlePublic}>
                <Toast.Header>
                <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                
                <small>Logged In?</small>
              </Toast.Header>
                <Toast.Body>
                  {
                    (localStorage.getItem('public_id'))
                    ?
                      <>
                        <p>You are logged in and your public_id is: {localStorage.getItem('public_id')}. You may close this and procced.</p>
                      </>
                    :
                      <>
                        <p>If you are registered as a user, then please login before submitting a repair.</p> 
                        <Button href="\login">Login</Button>
                      </>
                  }
                </Toast.Body>
            </Toast>
          }
          {
            (showStepOne) &&
            <>
              <h3>
                Contact Info
              </h3>
              <Form className='repair-step-one-form'>
                <Form.Group className="mb-3" controlId="RepairFormModal.FullName">
                <Form.Label>First Name</Form.Label>
                <Form.Control name="repair_first_name" value={props.repair_first_name} type="name" placeholder="First Name" onChange={props.handleInputChange}/>
                <Form.Label>Last Name</Form.Label>
                <Form.Control name="repair_last_name" value={props.repair_last_name} type="name" placeholder="Last Name" onChange={props.handleInputChange}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="RepairFormModal.Email">
                <Form.Label>Email</Form.Label>
                <Form.Control name="repair_email" value={props.repair_email} type="email" placeholder="Email" onChange={props.handleInputChange}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="RepairFormModal.Phone">
                <Form.Label>Phone (only for last resort)</Form.Label>
                <Form.Control name="repair_phone" value={props.repair_phone} type="phone" placeholder="Phone Number" onChange={props.handleInputChange}/>
              </Form.Group>
              </Form>
              <Button className="mr-3" onClick={handleStepTwo}>Continue</Button>
            </>
          }
          {
            (showStepTwo) &&
            <>
              <h3>Mail Address and Contact</h3>
              <Form>
                <Form.Group className="mb-3" controlId="RepairFormModal.Address">
                <Form.Label>Address Line One:</Form.Label>
                <Form.Control name="repair_address_line_one" value={props.repair_address_line_one} type="name" rows={1} onChange={props.handleInputChange}/>
                <Form.Label>Address Line Two:</Form.Label>
                <Form.Control name="repair_address_line_two" value={props.repair_address_line_two} type="name" rows={1} onChange={props.handleInputChange}/>
                <Form.Label>Address City:</Form.Label>
                <Form.Control name="repair_address_city" value={props.repair_address_city} type="name" onChange={props.handleInputChange}/>
                <Form.Label>Address State:</Form.Label>
                <Form.Control name="repair_address_state" value={props.repair_address_state} type="name" onChange={props.handleInputChange}/>
                <Form.Label>Address PostalCode:</Form.Label>
                <Form.Control name="repair_address_postal_code" value={props.repair_address_postal_code} type="name" onChange={props.handleInputChange}/>
                <Form.Label>Address Country:</Form.Label>
                <Form.Control name="repair_address_country" value={props.repair_address_country} type="name" onChange={props.handleInputChange}/>
                </Form.Group>
              </Form>
              <Button variant="danger" className="mr-3" onClick={handleStepOne}>Go Back</Button>
              <Button onClick={handleStepThree}>Continue</Button>
            </>
          }
          {
            (showStepThree) &&
            <>
              <h3>Device Info</h3>
              <Form>
                <Form.Group className="mb-3" controlId="RepairFormModal.DeviceInfo">
                  <Form.Label>Brand</Form.Label>
                  <Form.Control name="repair_brand" value={props.repair_brand} type="name" placeholder="Brand" onChange={props.handleInputChange}/>
                  <Form.Label>Model</Form.Label>
                  <Form.Control name="repair_model" value={props.repair_model} type="name" placeholder="Model" onChange={props.handleInputChange}/>
                  <Form.Label>Serial Number</Form.Label>
                  <Form.Control name="repair_serial" value={props.repair_serial} type="name" placeholder="Serial" onChange={props.handleInputChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="RepairFormModal.Issue">
                <Form.Label>Issue:</Form.Label>
                <Form.Control name="repair_issue" value={props.repair_issue} as="textarea" rows={3} onChange={props.handleInputChange}/>
                </Form.Group>
              </Form>
              <Button variant="danger" className="mr-3" onClick={handleStepTwo}>Go Back</Button>
              <Button variant="success" type="submit" onClick={submitRepairObject}>Submit</Button>
            </>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Col>
  );
}

export default RepairForm;