import React,{Component} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';


export default class Footer extends Component {
    constructor(props){
        super(props);

        this.state = {
          facebook_png : `${process.env.PUBLIC_URL}/facebook.png`
        }
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
                    <img
                      style={{ height: 30, background: `rgba(248, 249, 250, 0.3)` }}
                      src={`${process.env.PUBLIC_URL}/seolynn_name_ver_3_hr.gif`}
                      
                      thumbnail
                      fluid>
                      
                    </img>
                  {/* <!-- Grid column -->*/}


                </Col>
                <Col >
                  <p>
                  Email: <a class="mr-2" href="mailto:toby2494@gmail.com">toby2494@gmail.com</a>
                  <a href="https://fb.me/seolynnTech">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-facebook mr-1" viewBox="0 0 16 16">
                      <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                    </svg>
                    FaceBook Page
                  </a>
                  </p> 
                  
                  {/* <hr className="d-md-none  pb-2" /> */}
                </Col>
              </Row>
            </Container>
          </Navbar>
        );
    }
}
