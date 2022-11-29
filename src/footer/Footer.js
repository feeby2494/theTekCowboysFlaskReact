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
          <Navbar  bg="light" className="fixed-bottom mt-md-3">
            {/* <!-- Footer -->*/}
            <Container className=" pt-2">
              {/* <!-- Footer Links -->*/}
              <Row className="container-fluid text-center text-md-left">
                {/* <!-- Grid row -->*/}
                <Col >
                  {/* <!-- Grid column -->*/}
                    {/* <!-- Content -->*/}
                    <h5 className="text-uppercase">Seolynn</h5>
                  {/* <!-- Grid column -->*/}


                </Col>
                <Col >
                  <p>
                  Email: <a class="mr-2" href="mailto:toby2494@gmail.com">toby2494@gmail.com</a>
                  Phone: <a href="tel:19724409156">1-972-440-9156</a>
                  </p>
                    
                  
                  {/* <hr className="d-md-none  pb-2" /> */}
                </Col>
              </Row>
            </Container>
          </Navbar>
        );
    }
}
