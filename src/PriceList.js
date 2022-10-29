import { useState } from 'react';
import { Accordion, Card, Button, Tabs, Tab, Nav, Col, Row, Sonnet, Container, Dropdown, NavDropdown, Table} from 'react-bootstrap';
import { withCollapsableContainer } from './hoc/withCollapsableContainer';
import { withSmallCollContainer } from './hoc/withSmallCollContainer';




export const PriceList = () => {
    const [showSamsung, setShowSamsung] = useState(false);
    const [showApple, setShowApple] = useState(false);
    const handleShowSamsung = () => setShowSamsung(!showSamsung);
    const handleShowApple = () => setShowApple(!showApple);
    const priceListJson = require('./priceList.json');
    // const [priceList, setPriceList] = useState(priceListJson);
    
    
    return (
        <Container>

            <SamsungDevices priceListJson={priceListJson} componentTitle="Samsung Devices" button_text="Show Samsung Prices" id_name="samsung-prices" showContent={showSamsung} handleShowContent={handleShowSamsung} />
            <AppleDevices priceListJson={priceListJson} componentTitle="Apple Devices" button_text="Show Apple Prices" id_name="apple-prices" showContent={showApple} handleShowContent={handleShowApple} />

        </Container>
    );
}


const AppleDevices = withSmallCollContainer((props) => {
    return (
        <Tab.Container id="left-tabs-example" defaultActiveKey="first" className="mt-3">
            <Col md={3} className="mt-3">
                <Dropdown>
                    <Dropdown.Toggle variant="light" title="Apple Prices" id="apple-price-dropdown">
                        Apple Devices
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                    <input type="text" />
                    {
                        props.priceListJson["apple_devices"].map((dev) => {
                            return (
                                <Dropdown.Item eventKey={dev.name}>{dev.name}</Dropdown.Item>
                            );
                        })
                    }
                    </Dropdown.Menu>
                </Dropdown>
            </Col>
            <Col md={9} className="mt-3">
            <Tab.Content>
                {
                    props.priceListJson["apple_devices"].map((dev) => {
                        return (
                            <Tab.Pane eventKey={dev.name}>
                            <h5>{dev.name}</h5>
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                    <th>Repair</th>
                                    <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        Object.entries(dev.repairs).map((repair) => {
                                            return (
                                                <tr>
                                                    <td>{repair[0]}</td>
                                                    <td>{repair[1]}</td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </Table>
                        </Tab.Pane>
                        );
                    })
                }
            </Tab.Content>
            </Col>
        </Tab.Container>
    );
});

const SamsungDevices = withSmallCollContainer((props) => {
    return (
        <Tab.Container id="left-tabs-example" defaultActiveKey="first" className="mt-3">
  
            <Col md={3} className="mt-3">
                <Dropdown>
                    <Dropdown.Toggle variant="light" title="Samsung Prices" id="samsung-price-dropdown">
                        Samsung Devices
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                    <input type="text" />
                    {
                        props.priceListJson["samsung_devices"].map((dev) => {
                            return (
                                <Dropdown.Item eventKey={dev.name}>{dev.name}</Dropdown.Item>
                            );
                        })
                    }
                    </Dropdown.Menu>
                </Dropdown>
            </Col>
            <Col md={9} className="mt-3">
            <Tab.Content>
                {
                    props.priceListJson["samsung_devices"].map((dev) => {
                        return (
                            <Tab.Pane eventKey={dev.name}>
                            <h5>{dev.name}</h5>
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                    <th>Repair</th>
                                    <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        Object.entries(dev.repairs).map((repair) => {
                                            return (
                                                <tr>
                                                    <td>{repair[0]}</td>
                                                    <td>{repair[1]}</td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </Table>
                        </Tab.Pane>
                        );
                    })
                }
            </Tab.Content>
            </Col>
        </Tab.Container>
    );
});

