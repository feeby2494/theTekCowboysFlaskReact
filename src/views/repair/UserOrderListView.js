import React from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import UserOrderList from 'components/repair_service/UserOrderList';

const UserOrderListViews = (props) => {


    return (
        <Container>
            <Row>
                <Col lg={1}></Col>
                <Col lg={10}>
                    <UserOrderList />
                </Col>
                <Col lg={1}></Col>
            </Row>
        </Container>
    )

}

export default UserOrderListViews;