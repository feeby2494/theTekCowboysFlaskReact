import { React, Component } from 'react';
import { Container, Row, Col, Image, ListGroup } from 'react-bootstrap';

export default class About extends Component {
    constructor(){
        super();

    }


    render(){

      const profileImage = `${process.env.PUBLIC_URL}/profile.jpg`;
        return(
            <Container>
              <Row className="mt-md-5 mt-3">
                <Col className="text-start">
                  <h1><span>This is Seolynn.</span></h1>
                  <p>Your technologly innovator</p>
                </Col>
              </Row>
              <Row className="mt-md-5 mt-2">
                <Col lg={6} md={7} sm={12} className="text-start">
                  <h5>Services Provided:</h5>
                  <ListGroup variant="flush">
                    <ListGroup.Item>Full Stack Web Development</ListGroup.Item>
                    <ListGroup.Item>Micro Electronic Repair</ListGroup.Item>
                    <ListGroup.Item>Educational Development</ListGroup.Item>
                    <ListGroup.Item>Microcontroller Automation</ListGroup.Item>
                    <ListGroup.Item>Automotive Performance</ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col lg={1} md={1} className="hidden-sm"></Col>
                <Col lg={5} md={4} sm={12}>
                  <Image className="profile-img mx-auto d-block" roundedCircle thumbnail fluid src={profileImage} />
                </Col>
              </Row>
            </Container>
        )
    }
}
