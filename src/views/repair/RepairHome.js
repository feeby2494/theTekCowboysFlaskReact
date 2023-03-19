import React,{ useState} from 'react';
import { Col, Row, Container, Card, Accordion} from 'react-bootstrap';
import RepairAccordion from './RepairAccordion';

const RepairHome = (props) => {

    const [show, setShow] = useState(false);
    
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <Container>
                <Row>
                    <Col lg={1}></Col>
                    <Col lg={10}>
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="w-100 mb-2 rounded mt-3">
                                    <Accordion className="" defaultActiveKey="1">       
                                        <Accordion.Item  eventKey="1" onClick={handleShow}>
                                            <Accordion.Header className='text-center w-100'>
                                                Repair Details (Click to Hide)
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                <Card border='light'>
                                                    <Card.Header>
                                                        <h2 className='h2'>Local Dallas - Ft Worth Computer and Device Repair</h2>
                                                    </Card.Header>
                                                    <Card.Body>
                                                        <p>Meet me local in Coppell.  <a href="mailto:toby2494@gmail.com">Email me</a> if you are local! Please text me before if you want to meet me at my residence for device repair. Address is at my <a href="/about">'About Me'</a> section</p>
                                                        <p>I can repair all phones, tablets, computers, web apps, and scripts. Let me know what projects you have for me. With 5 years device experience and 2 years web development experience I will provide the best service I can.</p>
                                                        <p>For mail in repairs outside Dallas Ft Worth Area, please fill out the form below.</p>
                                                        <p>The purpose of the form is to keep track of your device and keep it in a quere, where it will not get misplaced or sent to the wrong address when finished. All local repairs are also added into the system with the same information. Also, if any warranty issues arise, then we will have this in the system. Your data is never shared and is only for business purposes.</p>
                                                        <p>I provide 3 month warranty on all my repairs from when I started working on your device. I am flexable about this too. If any device has cracked screen, then it cannot be covered by warranty unless you can prove to me that it was caused by work I did. All devices are tested to the utmost quality before shipping back or droping off.</p>
                                                        <p>- Jamie Lynn</p>
                                                    </Card.Body>
                                                </Card>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12}>
                                <RepairAccordion
                                    
                                    
                                />
                            </Col>
                            
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}

export default RepairHome;