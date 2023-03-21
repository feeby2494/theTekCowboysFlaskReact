import React from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import UserDeviceSingle from 'components/repair_service/UserDeviceSingle';

const UserDeviceSingleView = (props) => {


    return (
        <Container>
            <Row>
                <Col lg={1}></Col>
                <Col lg={10}>
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="w-100 mb-2 bg-white rounded mt-3">
                                    <UserDeviceSingle />
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

export default UserDeviceSingleView;