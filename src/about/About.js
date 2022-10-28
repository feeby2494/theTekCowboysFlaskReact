import React,{Component} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class About extends Component {
    constructor(){
        super();

    }


    render(){
        return(
            <Container>
              <Row className="mt-3">
                <Col className="text-start">
                  <h3><span>This is Seolynn.</span></h3>
                  <p>Your technologly innovator.</p>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col className="text-start" md={6}>
                  <h5>Services Provided:</h5>
                  
                </Col>
                <Col md={6}>
                  <h5>This is Seolynn.</h5>
                  <p>Your technologly innovator.</p>
                </Col>
              </Row>
            </Container>
        )
    }
}
