import React,{Component, useState} from 'react';
import {Row, Col, Card} from 'react-bootstrap';
// import Butter from 'buttercms';
// const butter = Butter(process.env.REACT_APP_BUTTER_API_TOKEN)

const ShippingInstructions = (props) => {
    return (
        <>
            <Row>
                <Col sm={4}>
                    <Card>
                        <Card.Body>
                            <h4>Step One:</h4>
                            <p>Fill out the Mail-In Repair Form and hit submit.</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={4}>
                    <Card>
                        <Card.Body>
                            <h4>Step Two:</h4>
                            <p>Check your email for shipping instructions.</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={4}>
                    <Card>
                        <Card.Body>
                            <h4>Step Three:</h4>
                            <p>Ship to us, wait for our price qoute.</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default ShippingInstructions;
