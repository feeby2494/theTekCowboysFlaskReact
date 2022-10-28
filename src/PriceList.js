import { useState } from 'react';
import { Accordion, Card, Button, Tabs, Tab, Nav, Col, Row, Sonnet, Container, NavDropdown, Table} from 'react-bootstrap';
import { withCollapsableContainer } from './home/withCollapsableContainer';


export const PriceList = () => {
    const [showSamsung, setShowSamsung] = useState(false);
    const [showApple, setShowApple] = useState(false);
    const handleShowSamsung = () => setShowSamsung(!showSamsung);
    const handleShowApple = () => setShowApple(!showApple);
    
    
    return (
        <Container>

            <SamsungDevices componentTitle="Samsung Devices" button_text="Show Samsung Prices" id_name="samsung-prices" showContent={showSamsung} handleShowContent={handleShowSamsung} />
            <AppleDevices componentTitle="Apple Devices" button_text="Show Apple Prices" id_name="apple-prices" showContent={showApple} handleShowContent={handleShowApple} />

        </Container>
    );
}


const AppleDevices = withCollapsableContainer((props) => {
    return (
        <Tab.Container id="left-tabs-example" defaultActiveKey="first" className="mt-3">
  
            <Col sm={3} className="mt-3">
            <Nav variant="pills" className="flex-column">
                <NavDropdown title="Apple Prices" id="basic-nav-dropdown">
                    <input type="text" />
                    <NavDropdown.Divider />
                    <NavDropdown.Item eventKey="first">iPad 10.5 Pro</NavDropdown.Item>
                    <NavDropdown.Item eventKey="second">Macbook Air 2013-2017 A1466</NavDropdown.Item>
                </NavDropdown>      
            </Nav>
            </Col>
            <Col sm={9} className="mt-3">
            <Tab.Content>
                <Tab.Pane eventKey="first">
                    <h5>iPad 10.5 Pro</h5>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                            <th>Repair</th>
                            <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>LCD</td>
                                <td>$150</td>
                            </tr>
                            <tr>
                                <td>Battery</td>
                                <td>$70</td>
                            </tr>
                        </tbody>
                    </Table>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                    <div>
                    LCD: $150
                </div>
                </Tab.Pane>
            </Tab.Content>
            </Col>
        </Tab.Container>
    );
});

const SamsungDevices = withCollapsableContainer((props) => {
    return (
        <Tab.Container id="left-tabs-example" defaultActiveKey="first" className="mt-3">
  
            <Col sm={3} className="mt-3">
            <Nav variant="pills" className="flex-column">
                <NavDropdown title="Travel Preparation" id="basic-nav-dropdown">
                    <input type="text" />
                    <NavDropdown.Divider />
                    <NavDropdown.Item eventKey="first">Galaxy S8</NavDropdown.Item>
                    <NavDropdown.Item eventKey="second">Galaxy S21</NavDropdown.Item>
                </NavDropdown>      
            </Nav>
            </Col>
            <Col sm={9} className="mt-3">
            <Tab.Content>
                <Tab.Pane eventKey="first">
                <div>
                    LCD/Glass: $150
                </div>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                    <div>
                    LCD: $150
                </div>
                </Tab.Pane>
            </Tab.Content>
            </Col>
        </Tab.Container>
    );
});

