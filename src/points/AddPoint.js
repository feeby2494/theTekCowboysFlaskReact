import React,{Component, useState} from 'react';
import {Modal, Button, Form, Row, Col, Alert} from 'react-bootstrap';

import '../App.css';
import withAuth from 'hoc/withAuth';

const AddPoint = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <Col lg={3} className="my-2">
      <Button variant="primary" onClick={handleShow}>
        Add New Point
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Point</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <Form>
          <fieldset>
            <Form.Group as={Row} className="mb-3" controlId="AddPointFormModal.Language">
              <Form.Label as="legend" column sm={4}>
                Choose Language:
              </Form.Label>
              <Col sm={8}>
                <Form.Check
                  inline
                  type="radio"
                  label="Japanese"
                  name="language"
                  value="japanese"
                  id="japaneseRadio"
                  onChange={props.handleInputChange}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Korean"
                  name="language"
                  value="korean"
                  id="koreanRadio"
                  onChange={props.handleInputChange}
                />
              </Col>
            </Form.Group>
          </fieldset>
            <Form.Group className="mb-3" controlId="AddPointFormModal.Title">
              <Form.Label>Title</Form.Label>
              <Form.Control name="title" type="name" placeholder="Title of Point" onChange={props.handleInputChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="AddPointFormModal.Explanation">
              <Form.Label>Explanation in English</Form.Label>
              <Form.Control name="explanation" type="name" placeholder="Explanation in English" onChange={props.handleInputChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="AddPointFormModal.Elements">
              <Form.Label>Add Examples of Point (sepearte with ";")</Form.Label>
              <Form.Control name="elements" as="textarea" rows={3} onChange={props.handleInputChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="AddPointFormModal.Chapter">
              <Form.Label>Chapter or Category</Form.Label>
              <Form.Control name="chapter" type="name" placeholder="Chapter or Category" onChange={props.handleInputChange}/>
            </Form.Group>



            {
              /* TODO: add in verification for post request */
              (props.errorBool) 
              ?
                <Alert>{props.errorMessage}</Alert>
              :
                ''
            }
            <Button variant="primary" type="submit" onClick={props.submitNewPoint}>
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

export default withAuth(AddPoint);
