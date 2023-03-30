import react from 'react';
import { Form } from 'react-bootstrap';

const FormAddress = (props) => {

    return (
            <div className="col">
                <h3>Mail Address</h3>
                <Form className="container" validated={props.validatedAddress} onSubmit={(e) => props.handleValidationAddress(e)}>
                    <Form.Group className="mb-3 row" controlId="RepairFormModal.Address.Street">
                        <div className='col-md-6'>
                            <Form.Label>Street Line One:</Form.Label>
                            <Form.Control placeholder="Address Line 1" name="addressLineOne" value={props.address.lineOne} type="name" rows={1} onChange={(e) => props.handleAddressLineOne(e.target.value)} required/>
                            <Form.Control.Feedback type="invalid">
                            Address line one: Street Address
                            </Form.Control.Feedback>
                        </div>
                        <div className='col-md-6'>
                            <Form.Label>Street Line Two:</Form.Label>
                            <Form.Control placeholder="Address Line 2" name="addressLineTwo" value={props.address.lineTwo} type="name" rows={1} onChange={(e) => props.handleAddressLineTwo(e.target.value)}/>
                        </div>
                    </Form.Group>
                    <Form.Group className="row" controlId="RepairFormModal.Address.City.State.Zip">
                        <div className='col-md-3'>
                            <Form.Label>City:</Form.Label>
                            <Form.Control placeholder="City" name="addressCity" value={props.address.city} type="name" onChange={(e) => props.handleAddressCity(e.target.value)} required/>
                            <Form.Control.Feedback type="invalid">
                            City Required
                            </Form.Control.Feedback></div>
                        <div className='col-md-3'>
                            <Form.Label>State:</Form.Label>
                            <Form.Control placeholder="State" name="addressState" value={props.address.state} type="name" onChange={(e) => props.handleAddressState(e.target.value)} required/>
                            <Form.Control.Feedback type="invalid">
                            State or Province Required
                            </Form.Control.Feedback>
                        </div>
                        <div className='col-md-3'>
                            <Form.Label>PostalCode:</Form.Label>
                            <Form.Control placeholder="Postal/Zip code" name="addressPostalCode" value={props.address.postalCode} type="name" onChange={(e) => props.handleAddressPostalCode(e.target.value)} required/>
                            <Form.Control.Feedback type="invalid">
                            Postal or Zip Code Required
                            </Form.Control.Feedback>
                        </div>
                        <div className='col-md-3'>
                            <Form.Label>Country:</Form.Label>
                            <Form.Control placeholder="Nation of Residence" name="addressCountry" value={props.address.country} type="name" onChange={(e) => props.handleAddressCountry(e.target.value)} required/>
                            <Form.Control.Feedback type="invalid">
                            Nation of Residence Required
                            </Form.Control.Feedback>
                        </div> 
                    </Form.Group>
                </Form>
            </div>
    );
}

export default FormAddress;