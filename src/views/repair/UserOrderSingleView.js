import React from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import UserOrderSingle from 'components/repair_service/UserOrderSingle';

const UserOrderSingleView = (props) => {


    return (
        <Container>
            <Row>
                <Col lg={1}></Col>
                <Col lg={10}>
                    <UserOrderSingle />   
                </Col>
                <Col lg={1}></Col>
            </Row>
        </Container>
    )

}

export default UserOrderSingleView;