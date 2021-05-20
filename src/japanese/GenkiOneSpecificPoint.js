import React,{Component} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class GenkiOneSpecificPoint extends Component {
    constructor(){
        super();

    }


    render(){
        return(
            <Container>
              <Row className="mt-3">
                <Col className="text-start">
                  <h5>Specific Point.</h5>

                </Col>
              </Row>
            </Container>
        )
    }
}
