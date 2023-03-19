import React,{ useState} from 'react';
import { Button, Form } from 'react-bootstrap';

const FormDevice = (props) => {


    return (
        <div className='col-12  mb-3'>
            <div className='container'>
                <div className='row'>
                    <Form.Group className="col-md-6" controlId={`device-brand${props.index}`}>
                        <Form.Label>Brand:</Form.Label>
                        <Form.Control placeholder="" name={`device-brand${props.index}`} value={props.repair.brand} type="name" rows={1} onChange={(e) => props.handleRepairBrand(e.target.value, props.index)}/>
                    </Form.Group>
                    <Form.Group className="col-md-6" controlId={`device-model${props.index}`}>
                        <Form.Label>Model:</Form.Label>
                        <Form.Control placeholder="" name={`device-model${props.index}`} value={props.repair.model} type="name" rows={1} onChange={(e) => props.handleRepairModel(e.target.value, props.index)}/>
                    </Form.Group>
                </div>
                <div className='row'>
                    <Form.Group className="col-12" controlId={`device-issue${props.index}`}>
                        <Form.Label>Issue:</Form.Label>
                        <Form.Control placeholder="" name={`device-issue${props.index}`} value={props.repair.issue} type="name" rows={1} onChange={(e) => props.handleRepairIssue(e.target.value, props.index)}/>
                    </Form.Group>
                </div>   
                <div className='row my-3'>
                    <div className='col-md-6'>
                        <Button className="mx-2 my-2 w-100" onClick={props.addRepair}>Add One More Repair</Button>
                    </div>
                    <div className='col-md-6'>
                        <Button className="mx-2 my-2 w-100" onClick={(e, index) => props.removeCertainRepair(e.target.value, index)}>Remove this Repair</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}    

export default FormDevice;