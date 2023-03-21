import React from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import UserOrderSingle from 'components/repair_service/UserOrderSingle';

const UserOrderSingleView = (props) => {


    return (
        <Container>
            <Row>
                <Col lg={1}></Col>
                <Col lg={10}>
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="w-100 mb-2 bg-white rounded mt-3">
                                    <UserOrderSingle />
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Col>
                <Col lg={1}></Col>
            </Row>
        </Container>
    )

}

export default UserOrderSingleView;