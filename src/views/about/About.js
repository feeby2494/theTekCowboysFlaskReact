import { React, Component } from 'react';
import { Container, Row, Col, Image, ListGroup } from 'react-bootstrap';

export default class About extends Component {
    constructor(){
        super();

    }


    render(){

      const profileImage = `${process.env.PUBLIC_URL}/profile_comp.jpg`;
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
                  <h5>Mailing Address:</h5>
                  <ListGroup variant="flush">
                    <ListGroup.Item>513 Grace Ln</ListGroup.Item>
                    <ListGroup.Item>Coppell, TX 75019</ListGroup.Item>
                  </ListGroup>
                  <h5 className='mt-3'>Services Provided:</h5>
                  <ListGroup variant="flush">
                    <ListGroup.Item>Full Stack Web Development</ListGroup.Item>
                    <ListGroup.Item>Micro Electronic Repair</ListGroup.Item>
                    <ListGroup.Item>Automotive Performance</ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col lg={1} md={1} className="hidden-sm"></Col>
                <Col lg={5} md={4} sm={12} className="mt-3 mt-md-0">
                  <Image className="profile-img mx-auto d-block" roundedCircle thumbnail fluid src={profileImage} />
                </Col>
              </Row>
              <Row className="mt-md-5 mt-2">
              
              </Row>
            </Container>
        )
    }
}
