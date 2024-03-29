import { useState } from 'react';
import { Tab, Col, Container, Dropdown, Table} from 'react-bootstrap';
import { withSmallCollContainer } from '../../hoc/withSmallCollContainer';

export const PriceList = () => {
    const [showSamsung, setShowSamsung] = useState(false);
    const [showApple, setShowApple] = useState(false);
    const handleShowSamsung = () => setShowSamsung(!showSamsung);
    const handleShowApple = () => setShowApple(!showApple);
    const priceListJson = require('./priceList.json');
    // const [priceList, setPriceList] = useState(priceListJson);
    
    
    return (
        <Container>

            <SamsungDevices priceListJson={priceListJson} componentTitle="Samsung Phones" button_text="Show Samsung Prices" id_name="samsung-prices" showContent={showSamsung} handleShowContent={handleShowSamsung} />
            <AppleDevices priceListJson={priceListJson} componentTitle="Apple Phones" button_text="Show Apple Prices" id_name="apple-prices" showContent={showApple} handleShowContent={handleShowApple} />
            <div className="my-5 d-block d-md-none">
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            </div>
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
                    <Dropdown.Menu className='row'>
                    <Table className='mb-2' size="sm" striped>
                            <tbody className='d-none d-sm-block'>
                                {
                                    props.priceListJson["apple_phones"].map(( dev, index) => index % 3 !== 0?null:(
                                        
                                        
                                        <tr>
                                            <td>
                                                <Dropdown.Item eventKey={dev.name}>{dev.name}</Dropdown.Item>
                                            </td> 
                                            { props.priceListJson["apple_phones"][index + 1] &&
                                                <td>
                                                    <Dropdown.Item eventKey={props.priceListJson["apple_phones"][index + 1].name}>{props.priceListJson["apple_phones"][index + 1].name}</Dropdown.Item>
                                                </td> 
                                            }
                                            { props.priceListJson["apple_phones"][index + 2] && 
                                                <td>
                                                    <Dropdown.Item eventKey={props.priceListJson["apple_phones"][index + 2].name}>{props.priceListJson["apple_phones"][index + 2].name}</Dropdown.Item>
                                                </td> 
                                            } 
                                        </tr>
                                        
                                    ))
                                }
                            </tbody>
                            <tbody className='d-block d-sm-none'>
                              
                                    {
                                        props.priceListJson["apple_phones"].map(( dev, index) => index % 2 !== 0?null:(
                                            
                                            
                                            <tr>
                                                <td>
                                                    <Dropdown.Item eventKey={dev.name}>{dev.name}</Dropdown.Item>
                                                </td> 
                                                { props.priceListJson["apple_phones"][index + 1] &&
                                                    <td>
                                                        <Dropdown.Item eventKey={props.priceListJson["apple_phones"][index + 1].name}>{props.priceListJson["apple_phones"][index + 1].name}</Dropdown.Item>
                                                    </td> 
                                                }
                                            </tr>
                                          
                                        ))
                                    }
                                    
                            
                            </tbody>
                        </Table>
                    </Dropdown.Menu>
                </Dropdown>
            </Col>
            <Col md={9} className="mt-3">
            <Tab.Content>
                {
                    props.priceListJson["apple_phones"].map((dev) => {
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
                    <Dropdown.Menu className='mb-4 '>
                        <Table className='mb-2' size="sm" striped>
                            <tbody className='d-none d-sm-block'>
                                {
                                    props.priceListJson["samsung_phones"].map(( dev, index) => index % 3 !== 0?null:(
                                        
                                        
                                        <tr>
                                            <td>
                                                <Dropdown.Item eventKey={dev.name}>{dev.name}</Dropdown.Item>
                                            </td> 
                                            { props.priceListJson["samsung_phones"][index + 1] &&
                                                <td>
                                                    <Dropdown.Item eventKey={props.priceListJson["samsung_phones"][index + 1].name}>{props.priceListJson["samsung_phones"][index + 1].name}</Dropdown.Item>
                                                </td> 
                                            }
                                            { props.priceListJson["samsung_phones"][index + 2] && 
                                                <td>
                                                    <Dropdown.Item eventKey={props.priceListJson["samsung_phones"][index + 2].name}>{props.priceListJson["samsung_phones"][index + 2].name}</Dropdown.Item>
                                                </td> 
                                            } 
                                        </tr>
                                        
                                    ))
                                }
                            </tbody>
                            <tbody className='d-block d-sm-none'>
                              
                                    {
                                        props.priceListJson["samsung_phones"].map(( dev, index) => index % 2 !== 0?null:(
                                            
                                            
                                            <tr>
                                                <td>
                                                    <Dropdown.Item eventKey={dev.name}>{dev.name}</Dropdown.Item>
                                                </td> 
                                                { props.priceListJson["samsung_phones"][index + 1] &&
                                                    <td>
                                                        <Dropdown.Item eventKey={props.priceListJson["samsung_phones"][index + 1].name}>{props.priceListJson["samsung_phones"][index + 1].name}</Dropdown.Item>
                                                    </td> 
                                                }
                                            </tr>
                                          
                                        ))
                                    }
                                    
                            
                            </tbody>
                        </Table>
                    </Dropdown.Menu>
                </Dropdown>
            </Col>
            <Col md={9} className="mt-3">
            <Tab.Content>
                {
                    props.priceListJson["samsung_phones"].map((dev) => {
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

