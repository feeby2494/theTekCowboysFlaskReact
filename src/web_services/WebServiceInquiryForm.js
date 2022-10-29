import React,{Component, useState} from 'react';
import {Modal, Button, Form, Row, Col, Toast} from 'react-bootstrap';

import '../App.css';

const WebServiceInquiryForm = (props) => {
  const [show, setShow] = useState(false);
  const [showStepOne, setShowStepOne] = useState(true);
  const [showStepTwo, setShowStepTwo] = useState(false);
  const [showPublic, setShowPublic] = useState(true);
  const handlePublic = () => {
    setShowPublic(false);
    console.log("handle close for toast")
  }
  const handleStepOne = () => {
    setShowStepOne(true);
    setShowStepTwo(false);
  };
  const handleStepTwo = () => {
    setShowStepOne(false);
    setShowStepTwo(true);
  };
  const submitData = () => {
    props.submitWebProject();
    handleClose();
  }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  return (
    <Col className='my-2'>
      <Button variant="info" onClick={handleShow}>
        Web Inquiry
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Web Project Inquiry</Modal.Title>
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
            <Form>
              <Form.Group className="mb-3" controlId="WebProjectEnqueryFormModal.FullName">
                <Form.Label>First Name</Form.Label>
                <Form.Control name="web_service_first_name" value={props.web_service_first_name} type="name" placeholder="First Name" onChange={props.handleInputChange}/>
                <Form.Label>Last Name</Form.Label>
                <Form.Control name="web_service_last_name" value={props.web_service_last_name} type="name" placeholder="Last Name" onChange={props.handleInputChange}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="WebProjectEnqueryFormModal.Email">
                <Form.Label>Email</Form.Label>
                <Form.Control name="web_service_email" value={props.web_service_email} type="email" placeholder="Email" onChange={props.handleInputChange}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="WebProjectEnqueryFormModal.Phone">
                <Form.Label>Phone (only for last resort)</Form.Label>
                <Form.Control name="web_service_phone" value={props.web_service_phone} type="phone" placeholder="Phone Number" onChange={props.handleInputChange}/>
              </Form.Group>
              <Button variant="info" onClick={handleStepTwo}>Continue</Button>
            </Form>
          }
          {
            (showStepTwo) &&
            <Form>
              <Form.Group className="mb-3" controlId="WebProjectEnqueryFormModal.ProjectExplanation">
                <Form.Label>Short Explanation of Project</Form.Label>
                <Form.Control name="web_service_project_explanation" value={props.web_service_project_explanation} as="textarea" rows={3} onChange={props.handleInputChange}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="WebProjectEnqueryFormModal.ExtraDetails">
                <Form.Label>Extra Details</Form.Label>
                <Form.Control name="web_service_extra_details" value={props.web_service_extra_details} as="textarea" rows={3} onChange={props.handleInputChange}/>
              </Form.Group>
              <Button variant="warning" className="mr-3" onClick={handleStepOne}>Go Back</Button>
              <Button variant="success" onClick={submitData}>Submit</Button>
            </Form>
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

export default WebServiceInquiryForm;