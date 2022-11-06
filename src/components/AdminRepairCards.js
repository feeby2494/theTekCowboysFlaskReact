import React, { useEffect, useState } from 'react';
import { Col, Card, ListGroup, Modal, Button, Row } from 'react-bootstrap';

const CustomerRepairCards = (props) => {
    const [show, setShow] = useState(false);
    const [currentCompleted, setCurrentCompleted] = useState(props.deviceCompleted)
   
    const handleClose = () => {
      setShow(false);
      
    };
    const handleShow = () => {
        setShow(true);
    }; 

    useEffect(() => {
      let isMounted = true;
      if(props.currentDeviceID){
        props.handleDeviceCompleted();
        setCurrentCompleted(props.deviceCompleted)
      }
      if(currentCompleted !== props.deviceCompleted){
        setCurrentCompleted(props.deviceCompleted)
      }
      return () => {
        isMounted = false;
      };
    }, [ props.currentDeviceID, currentCompleted, props.deviceCompleted])

    



    return (
        <>
            {
                props.repairList && props.repairList.map((repair) => {
                    return (
                        <Col md={4} className="my-2">
                            <Card>
                                <Card.Header as="h5">{repair.repair_brand}-{repair.repair_model} | id: {repair.id}</Card.Header>
                                <Card.Body>
                                    <Card.Text>
                                        <h5>Device Info:</h5>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item>Serial: {repair.repair_serial}</ListGroup.Item>
                                            <ListGroup.Item>Brand-Model: {repair.repair_brand}-{repair.repair_model}</ListGroup.Item>
                                            <ListGroup.Item>Issue: {repair.repair_issue}</ListGroup.Item>
                                        </ListGroup>
                                        
                                        <Col  className="my-2">
                                          <Button id={repair.id} variant="light" onClick={(event) => {
                                            props.handleCurrentDeviceID(event);
                                            handleShow();
                                      
                                          }}>
                                            More Info
                                          </Button>

                                          <Modal show={show} onHide={handleClose}>
                                            <Modal.Header closeButton>
                                              <Modal.Title>Repair (ID: {props.currentDeviceID})</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body className="text-center">
                                              <Row>
                                                  <Col xs={12}>
                                                      {props.currentDeviceID && 
                                                        <>
                                                          {(props.repairList.find(item => item.id === Number(props.currentDeviceID))) &&
                                                            <>
                                                              <p>Repair Finished: {props.repairList.find(item => item.id === Number(props.currentDeviceID)).repair_completed ? "True" : "False"}</p>
                                                              <Button onClick={() => {
                                                                setCurrentCompleted(!currentCompleted)
                                                                props.setRepairComplete()
                                                                
                                                              
                                                                }}>Complete Repair</Button>
                                                              </>
                                                          }
                                                          
                                                            { (props.repairList.find(item => item.id === Number(props.currentDeviceID))) &&
                                                              <p>Serial: {
                                                                props.repairList.find(item => item.id === Number(props.currentDeviceID)).repair_serial
                                                              }</p>
                                                            }
                                                          {/* 
                                                          <p>Brand: {
                                                            props.repairList.find(item => item.id === Number(props.currentDeviceID)).repair_brand
                                                          }</p>
                                                          <p>Model: {
                                                            props.repairList.find(item => item.id === Number(props.currentDeviceID)).repair_model
                                                          }</p> */}
                                                        </>
                                                      }
                                                  </Col>
                                              </Row>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={() => {
                                                    handleClose();
                                                    
                                                    
                                                    
                                                }}>
                                                Close
                                              </Button>
                                            </Modal.Footer>
                                          </Modal>
                                        </Col>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    );
                })
            }
        </>
    );
}

export default CustomerRepairCards;