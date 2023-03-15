import React,{ useState} from 'react';
import { Button, Form } from 'react-bootstrap';

const FormOrder = (props) => {

    // These are for repair forms
    const [repairForms, setRepairForms] = useState([{
        "id": 0,
        "brand": "",
        "model": "",
        "issue": ""
    }])

    // These are for the actual repair devices entered by user into the forms
    const [repairs, setRepairs] = useState([])
    

    

    const handleRepairBrand = (value, index) => {
        console.log(index)
        
        let repairs = [...repairForms];
        console.log(repairs[index])
        repairs[index]["brand"] = value;
        setRepairForms(repairs);
    };

    const handleRepairModel = (value, index) => {
        let repairs = [...repairForms];
        repairs[index]["model"] = value;
        setRepairForms(repairs);
    };

    const handleRepairIssue = (value, index) => {
        let repairs = [...repairForms];
        repairs[index]["issue"] = value;
        setRepairForms(repairs);
    };

    const addRepair = () => {
        const newRepair = {
            "id": repairForms.length, //should get last index of this array plus one, since this is zero based
            "brand": "",
            "model": "",
            "issue": ""
        }
        setRepairForms(repairForms => [...repairForms, newRepair]);
    };
    // Removing one element by specific index
    const removeCertainRepair = (value, index) => {
        let repairs = [...repairForms];
        repairs.splice(index, 1) 
        setRepairForms(repairs);
    }

    

  return (
    <div className="col-md-6">
      <div className='container'>
        <div className='row'>

        </div>
        <div className='row'>
            
            { repairForms && repairForms.map((repair, index) => {
                return (
                    <div>
                        <Form.Group className="mb-3" controlId={`device-brand${index}`}/>
                        <Form.Label>Brand:</Form.Label>
                        <Form.Control placeholder="" name={`device-brand${index}`} value={repair.brand} type="name" rows={1} onChange={(e) => handleRepairBrand(e.target.value, index)}/>
                        
                        <Form.Group className="mb-3" controlId={`device-model${index}`}/>
                        <Form.Label>Model:</Form.Label>
                        <Form.Control placeholder="" name={`device-model${index}`} value={repair.model} type="name" rows={1} onChange={(e) => handleRepairModel(e.target.value, index)}/>

                        <Form.Group className="mb-3" controlId={`device-issue${index}`}/>
                        <Form.Label>Issue:</Form.Label>
                        <Form.Control placeholder="" name={`device-issue${index}`} value={repair.issue} type="name" rows={1} onChange={(e) => handleRepairIssue(e.target.value, index)}/>

                        <Button onClick={addRepair}>Add One More Repair</Button>
                        <Button onClick={(e, index) => removeCertainRepair(e.target.value, index)}>Remove this Repair</Button>
                    </div>
                )
            }) }

            { repairForms.length < 1 &&
                <Button onClick={addRepair}>Add a Repair</Button>
            }
        </div>
      </div>
    </div>
  )
}

export default FormOrder;