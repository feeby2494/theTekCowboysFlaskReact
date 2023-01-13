import React,{Component} from 'react';
import { Card, Container, Row, Col, Alert } from 'react-bootstrap';
import RepairForm from './RepairForm';
import ShippingInstructions from 'components/ShippingInstructions';



const RepairCard = (props) => {
    return (
            <Card className="row shadow mb-5 bg-white rounded mt-3">
                <Card.Body className='container align-items-center'>
                    <Row>
                        <div className='h4 col-md-6 text-center'>
                            <h2 >Mail-in Repair Services</h2>  
                        </div>   
                        <RepairForm
                            handleInputChange={props.handleInputChange}
                            repair_first_name={props.repair_first_name}
                            repair_last_name={props.repair_last_name}
                            repair_email={props.repair_email}
                            repair_phone={props.repair_phone}
                            repair_address_line_one={props.repair_address_line_one}
                            repair_address_line_two={props.repair_address_line_two}
                            repair_address_city={props.repair_address_city}
                            repair_address_state={props.repair_address_state}
                            repair_address_postal_code={props.repair_address_postal_code}
                            repair_address_country={props.repair_address_country}
                            repair_brand={props.repair_brand}
                            repair_model={props.repair_model}
                            repair_serial={props.repair_serial}
                            repair_issue={props.repair_issue}
                            submitRepair={props.submitRepair}
                            
                        />
                                    
                                
                        <Col>
                            {
                                (props.repairErrorBool)
                                ?
                                <Alert variant={'danger'}>{props.repairErrorMessage}</Alert>
                                :
                                    <>
                                    </>
                            }
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
    )
}

export default RepairCard;
