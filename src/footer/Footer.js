import React,{Component} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';


export default class Footer extends Component {
    constructor(props){
        super(props);

    }


    render(){
        return(
          <Navbar  bg="light" fixed="bottom" className=" mt-4">
            {/* <!-- Footer -->*/}
            <Container className=" pt-4">
              {/* <!-- Footer Links -->*/}
              <Row className="container-fluid text-center text-md-left">
                {/* <!-- Grid row -->*/}
                <Col>
                  {/* <!-- Grid column -->*/}
                  <div className="col-md-6 mt-md-0 mt-3">

                    {/* <!-- Content -->*/}
                    <h5 className="text-uppercase">Seolynn</h5>
                    <p></p>

                  </div>
                  {/* <!-- Grid column -->*/}

                  <hr className="clearfix w-100 d-md-none pb-3" />
                </Col>
              </Row>
            </Container>
          </Navbar>
        );
    }
}
