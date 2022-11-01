import React, {Component, useState, useEffect} from 'react';
import { Alert, Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import RepairModal from './RepairModal';

const MailInRepairCards = (props) => {
    // const [show, setShowSingleRepair] = useState(false);

    // const handleCloseSingleRepair = () => setShowSingleRepair(false);
    // const handleShowSingleRepair = () => setShowSingleRepair(true);
    
    
    // useEffect(() => {
    
    // }, [props.deviceCompleted]);
      


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
                                        <h5>Customer Info:</h5>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item>Name: {repair.repair_first_name} {repair.repair_last_name}</ListGroup.Item>
                                            <ListGroup.Item>Email: {repair.repair_email}</ListGroup.Item>
                                            <ListGroup.Item>Phone: {repair.repair_phone}</ListGroup.Item>
                                        </ListGroup>
                                        <h5>Shipping Info:</h5>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item>{repair.repair_first_name} {repair.repair_last_name}</ListGroup.Item>
                                            <ListGroup.Item>{repair.repair_address_line_one} {repair.repair_address_line_two}</ListGroup.Item>
                                            <ListGroup.Item>{repair.repair_address_city}, {repair.repair_address_state} {repair.repair_address_postal_code}</ListGroup.Item>
                                            <ListGroup.Item>{repair.repair_address_country}</ListGroup.Item>
                                        </ListGroup>
                                       <RepairModal 
                                            deviceSerial={repair.repair_serial}
                                            deviceCompleted={repair.repair_completed}
                                            setRepairComplete={props.setRepairComplete}
                                            currentDevice = {props.currentDevice}
                                            repairErrorMessage = {props.repairErrorMessage}
                                            repairErrorBool = {props.repairErrorBool}
                                            currentDeviceID={props.currentDeviceID}
                                            elementIDName = {repair.id}
                                            handleCurrentDeviceID={props.handleCurrentDeviceID}
                                            getRepairsAll={props.getRepairsAll}
                                        />
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

export default MailInRepairCards;




