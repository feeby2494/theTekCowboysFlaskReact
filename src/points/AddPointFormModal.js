import React,{Component, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import '../App.css';

const AddPointFormAdd = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <>
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
              <Form.Control type="name" placeholder="Title of Point" onChange={props.handleInputChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="AddPointFormModal.Explanation">
              <Form.Label>Explanation in English</Form.Label>
              <Form.Control type="name" placeholder="Explanation in English" onChange={props.handleInputChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="AddPointFormModal.Elements">
              <Form.Label>Add Examples of Point (sepearte with ";")</Form.Label>
              <Form.Control as="textarea" rows={3} onChange={props.handleInputChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="AddPointFormModal.Chapter">
              <Form.Label>Chapter or Category</Form.Label>
              <Form.Control type="name" placeholder="Chapter or Category" onChange={props.handleInputChange}/>
            </Form.Group>





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
    </>
  );
}

export default AddPointFormAdd;
