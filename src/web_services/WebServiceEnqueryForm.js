import React,{Component, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import '../App.css';

const WebServiceEnqueryForm = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <Col lg={3} className="my-2">
      <Button variant="primary" onClick={handleShow}>
        Web Service Enquery
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Web Project Enquery</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <Form>
            <Form.Group className="mb-3" controlId="WebProjectEnqueryFormModal.FullName">
              <Form.Label>First Name</Form.Label>
              <Form.Control name="first-name" type="name" placeholder="First Name" onChange={props.handleInputChange}/>
              <Form.Label>Last Name</Form.Label>
              <Form.Control name="last-name" type="name" placeholder="Last Name" onChange={props.handleInputChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="WebProjectEnqueryFormModal.Email">
              <Form.Label>Email</Form.Label>
              <Form.Control name="email" type="email" placeholder="Email" onChange={props.handleInputChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="WebProjectEnqueryFormModal.Phone">
              <Form.Label>Phone (only for last resort)</Form.Label>
              <Form.Control name="phone" type="phone" placeholder="Phone Number" onChange={props.handleInputChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="WebProjectEnqueryFormModal.ProjectExplanation">
              <Form.Label>Short Explanation of Project</Form.Label>
              <Form.Control name="project-explanation" as="textarea" rows={3} onChange={props.handleInputChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="WebProjectEnqueryFormModal.ExtraDetails">
              <Form.Label>Extra Details</Form.Label>
              <Form.Control name="extra-details" as="textarea" rows={3} onChange={props.handleInputChange}/>
            </Form.Group>





            <Button variant="primary" type="submit" onClick={props.submitWebProject}>
              Submit
            </Button>
          </Form>




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

export default WebServiceEnqueryForm;