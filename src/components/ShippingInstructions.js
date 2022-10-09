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
                        <Card.Header>
                            Step One:
                        </Card.Header>
                        <Card.Body>
                            <p>Fill out the Mail-In Repair Form and hit submit.</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={4}>
                    <Card>
                        <Card.Header>
                            Step Two:
                        </Card.Header>
                        <Card.Body>
                            <p>Check your email for shipping address, label, and instructions.</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={4}>
                    <Card>
                        <Card.Header>
                            Step Three:
                        </Card.Header>
                        <Card.Body>
                            <p>Ship to us, we will email you a price qoute after we diagnosis your device.</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default ShippingInstructions;
