import React,{Component, useEffect, useState} from 'react';
import { Modal, Button, Form, Row, Col, Alert } from 'react-bootstrap';


import '../App.css';
import withAuth from 'hoc/withAuth';

const RepairModal = (props) => {
  const [show, setShow] = useState(false);
  const [completed, setCompleted] = useState(props.deviceCompleted)
  const handleCompleted = (event) => {
    setCompleted(!(completed));
  };
  const handleClose = () => {
    setShow(false);
    if(completed !== props.deviceCompleted) {
      props.getRepairsAll();
    }
  };
  const handleShow = (event) => {
    setShow(true);
    props.handleCurrentDeviceID(event);
  };

  

   useEffect((props) => {
      if(completed !== props.deviceCompleted) {
        props.setRepairComplete()
        
        
      }
    }, [props.deviceCompleted, props.getRepairsAll, completed]);
  


  return (
    <Col lg={3} className="my-2">
      <Button id={props.elementIDName} variant="primary" onClick={handleShow}>
        Show Single Repair
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Repair (SN: {props.deviceSerial})</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
         <Row>
            <Col xs={12}>
                <p>Repair Finished: {completed ? "True": "False"}</p>
                <Button className='mb-2 col-12' onClick={handleCompleted}>Complete Repair</Button>
            </Col>
         </Row>
            
                
        {completed == props.deviceCompleted ? 'equal' : 'not equal'}
         {props.elementIDName}




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

export default RepairModal;
