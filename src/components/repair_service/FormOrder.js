import React,{ useState} from 'react';
import { Button, Form } from 'react-bootstrap';
import FormAddress from './FormAddress';

const FormOrder = (props) => {

    // Taking care of address:
    const [validatedAddress, setValidatedAddress] = useState(false);

    const handleValidationAddress = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        } 
        setValidatedAddress(true);
        event.preventDefault();
        
    };

    const [address, setAddress] = useState({
        "lineOne": "",
        "lineTwo": "",
        "city": "",
        "state": "",
        "postalCode": "",
        "country": ""
    })

    const handleAddressLineOne = (value) => {
        let addressTemp = {...address};
        addressTemp["lineOne"] = value;
        setAddress(addressTemp);
    }

    const handleAddressLineTwo = (value) => {
        let addressTemp = {...address};
        addressTemp["lineTwo"] = value;
        setAddress(addressTemp);
    }

    const handleAddressCity = (value) => {
        let addressTemp = {...address};
        addressTemp["city"] = value;
        setAddress(addressTemp);
    }

    const handleAddressState = (value) => {
        let addressTemp = {...address};
        addressTemp["state"] = value;
        setAddress(addressTemp);
    }

    const handleAddressPostalCode = (value) => {
        let addressTemp = {...address};
        addressTemp["postalCode"] = value;
        setAddress(addressTemp);
    }

    const handleAddressCountry = (value) => {
        let addressTemp = {...address};
        addressTemp["country"] = value;
        setAddress(addressTemp);
    }

    // These are for repair forms
    const [repairForms, setRepairForms] = useState([{
        "id": 0,
        "brand": "",
        "model": "",
        "issue": ""
    }])

    const handleRepairBrand = (value, index) => {       
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

    // Handle submission
    const submitOrder = (e) => {
        handleValidationAddress(e);
        if(validatedAddress){
            console.log({...address, "repairs": repairForms})
        }
    }

  return (
    <div className="col">
        <div className='container'>
            <div className='row'>
                <FormAddress 
                    validatedAddress={validatedAddress}
                    address={address} 
                    handleAddressLineOne={handleAddressLineOne}
                    handleAddressLineTwo={handleAddressLineTwo}
                    handleAddressCity={handleAddressCity}
                    handleAddressState={handleAddressState}
                    handleAddressPostalCode={handleAddressPostalCode}
                    handleAddressCountry={handleAddressCountry}
                />
            </div>
                
            { repairForms && repairForms.map((repair, index) => {
                return (
                    <div className='row'>
                        <div className='col-12'>
                            <Form.Group className="mb-3" controlId={`device-brand${index}`}/>
                            <Form.Label>Brand:</Form.Label>
                            <Form.Control placeholder="" name={`device-brand${index}`} value={repair.brand} type="name" rows={1} onChange={(e) => handleRepairBrand(e.target.value, index)}/>
                        
                            <Form.Group className="mb-3" controlId={`device-model${index}`}/>
                            <Form.Label>Model:</Form.Label>
                            <Form.Control placeholder="" name={`device-model${index}`} value={repair.model} type="name" rows={1} onChange={(e) => handleRepairModel(e.target.value, index)}/>

                            <Form.Group className="mb-3" controlId={`device-issue${index}`}/>
                            <Form.Label>Issue:</Form.Label>
                            <Form.Control placeholder="" name={`device-issue${index}`} value={repair.issue} type="name" rows={1} onChange={(e) => handleRepairIssue(e.target.value, index)}/>
                        </div>
                        <div className='col-12 my-3'>
                            <Button className="mx-2" onClick={addRepair}>Add One More Repair</Button>
                            <Button className="mx-2" onClick={(e, index) => removeCertainRepair(e.target.value, index)}>Remove this Repair</Button>
                        </div>
                    </div>
                )
            }) }

            { repairForms.length < 1 &&
                <Button className="row" onClick={addRepair}>Add a Repair</Button>
            }
            <div className='row'>
                <Button onClick={submitOrder}>Submit Order</Button>
            </div>
        </div>
    </div>
  )
}

export default FormOrder;