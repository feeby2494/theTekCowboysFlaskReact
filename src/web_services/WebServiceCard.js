import React,{Component} from 'react';
import { Alert, Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import WebServiceInquiryForm from './WebServiceInquiryForm';

const WebServiceCard = (props) => {
    return (
            <Card className="row shadow mb-5 bg-white rounded mt-3">
                <Card.Header>
                    <h2 className='h2 text-center my-2'>Web Development Services</h2>
                </Card.Header>
                <Card.Body>
                <p>Let me help you set up your own application online. From blogs to ecommerence sites, I can help you start a scaleable web application that's customized to your needs and expandable in the future.</p>
                </Card.Body>
                <Container>
                    <Row>
                        <Col lg={3}>
                            <WebServiceInquiryForm 
                                handleInputChange={props.handleInputChange}
                                web_service_first_name={props.web_service_first_name}
                                web_service_last_name={props.web_service_last_name}
                                web_service_email={props.web_service_email}
                                web_service_phone={props.web_service_phone}
                                web_service_project_explanation={props.web_service_project_explanation}
                                web_service_extra_details={props.web_service_extra_details}
                                submitWebProject={props.submitWebProject}
                            />
                        </Col>
                        <Col lg={9}>
                            {
                                (props.webServiceErrorBool)
                                ?
                                <Alert variant={'danger'}>{props.webServiceErrorMessage}</Alert>
                                :
                                    <>
                                    </>
                            }
                        </Col>
                    </Row>
                </Container>
            </Card>
    )
}

export default WebServiceCard;