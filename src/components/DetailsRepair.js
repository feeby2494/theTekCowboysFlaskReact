import React from 'react';
import { Col, Card, ListGroup, Row } from 'react-bootstrap';

const DetailsRepair = (props) => {

    return (
        <Card className="text-center row mt-3">
            <Card.Header>Advantages of Seolynn Repair</Card.Header>
            <Card.Body>
                <Row>
                    <Col sm="4">
                        <img style={{ height: 176 }}  src={`${process.env.PUBLIC_URL}/electronic_lab_workbench_1_comp.jpg`} className="img-thumbnail" thumbnail fluid></img>
                    </Col>
                    <Col sm="4">
                        <img style={{ height: 176 }} src={`${process.env.PUBLIC_URL}/electronic_lab_workbench_2_comp.jpg`} className="img-thumbnail" thumbnail fluid></img>
                    </Col> 
                    <Col sm="4">
                        <img style={{ height: 176 }} src={`${process.env.PUBLIC_URL}/ipad_repair_comp.jpg`} className="img-thumbnail" thumbnail fluid></img>
                    </Col>
                </Row>
                
                <ListGroup variant="flush">
                    <ListGroup.Item>Understanding of Basic Electrionics and Experience Troubleshooing Complex Issues</ListGroup.Item>
                    <ListGroup.Item>Flexable Range of Devices Serviced: Laptops, Macbooks, phones, tablets</ListGroup.Item>
                    <ListGroup.Item>Cheap Prices: Well below major online repair centers</ListGroup.Item>
                    <ListGroup.Item>No Device Mutalation here: Until the exact reason something is not working is found, no repair atempt is made!</ListGroup.Item>
                    <ListGroup.Item>Willing to meet face to face in the Dallas area</ListGroup.Item>
                    <ListGroup.Item>Highest Quality repairs only</ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    )
}

export default DetailsRepair;