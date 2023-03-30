import react from 'react';
import { Form } from 'react-bootstrap';

const FormContact = (props) => {

    return (
            <div className="col">
                <h3>Contact Info</h3>
                <Form className="container" novalidate validated={props.validatedContact} onSubmit={props.handleValidationContact}>
                    <Form.Group className="mb-3 row" controlId="RepairFormModal.Contact">
                        <div className='col-md-6'>
                            <Form.Label>Name:</Form.Label>
                            <Form.Control placeholder="First and Last Name" name="contact.name" value={props.contact.name} type="name" rows={1} onChange={(e) => props.handleContactName(e.target.value)} required/>
                            <Form.Control.Feedback type="invalid">
                            Name Required
                            </Form.Control.Feedback>
                        </div>
                        <div className='col-md-6'>
                            <Form.Label>Email:</Form.Label>
                            <Form.Control placeholder="Email" name="contact.name" value={props.contact.email} type="email" rows={1} onChange={(e) => props.handleContactEmail(e.target.value)} required/>
                            <Form.Control.Feedback type="invalid">
                            Email Required
                            </Form.Control.Feedback>
                        </div>
                    </Form.Group>
                </Form>
            </div>
    );
}

export default FormContact;