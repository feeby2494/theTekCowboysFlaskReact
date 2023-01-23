import React,{ useState } from 'react';
import {Modal, Button, Form, Col, Toast} from 'react-bootstrap';

import '../../App.css';

const WebServiceInquiryForm = (props) => {
  // This is just used to toggle on feedback; not used to check if form input is valiadted!
  const [validatedContact, setValidatedContact] = useState(false);
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
  const handleStepTwo = (e) => {
    e.preventDefault();
    handleValidationContact(e);
    if ( e.currentTarget.checkValidity() === true ) {
      setShowStepOne(false);
      setShowStepTwo(true);
    } 
  };
  const submitData = () => {
    props.submitWebProject();
    handleClose();
  }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleValidationContact = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } 
    setValidatedContact(true);
    event.preventDefault();
    
  }

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
            <Form noValidate validated={validatedContact} onSubmit={handleStepTwo}>
              <Form.Group className="mb-3" controlId="WebProjectEnqueryFormModal.FullName">
                <Form.Label>First Name</Form.Label>
                <Form.Control name="web_service_first_name" value={props.web_service_first_name} type="name" placeholder="First Name" onChange={props.handleInputChange} required/>
                <Form.Control.Feedback type="invalid">
                    Make up any name, but we still need something!
                  </Form.Control.Feedback>
                <Form.Label>Last Name</Form.Label>
                <Form.Control name="web_service_last_name" value={props.web_service_last_name} type="name" placeholder="Last Name" onChange={props.handleInputChange} required/>
                <Form.Control.Feedback type="invalid">
                    Make up any name, but we still need something!
                  </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="WebProjectEnqueryFormModal.Email">
                <Form.Label>Email</Form.Label>
                <Form.Control name="web_service_email" value={props.web_service_email} type="email" placeholder="Email" onChange={props.handleInputChange} required/>
                <Form.Control.Feedback type="invalid">
                  Without email, we can't even contact you!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="WebProjectEnqueryFormModal.Phone">
                <Form.Label>Phone (only for last resort)</Form.Label>
                <Form.Control name="web_service_phone" value={props.web_service_phone} type="phone" placeholder="Phone Number" onChange={props.handleInputChange} required/>
                <Form.Control.Feedback type="invalid">
                  No, I don't want you phone number (I hate talking on the phone!), but in emergency situations you never know.
                </Form.Control.Feedback>
              </Form.Group>
              <Button variant="info" type="submit">Continue</Button>
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