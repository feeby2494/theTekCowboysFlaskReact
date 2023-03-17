import React,{ useState} from 'react';
import { Button, Alert } from 'react-bootstrap';
import FormAddress from './FormAddress';
import FormContact from './FormContact';
import FormDevice from './FormDevice';

const FormOrder = (props) => {

    // Show an error if request fails
    const [errors, setErrors] = useState('');

    // Clear everything after submission:
    const clearAll = (e) => {
        setContact({
            "name": "",
            "email": ""
        });
        setAddress({
            "lineOne": "",
            "lineTwo": "",
            "city": "",
            "state": "",
            "postalCode": "",
            "country": ""
        });
        setRepairForms([{
            "id": 0,
            "brand": "",
            "model": "",
            "issue": ""
        }]);
        setErrors('');
        setValidatedAddress(false);
        setValidatedContact(false);
    }

    // Taking care of contact:
    const [validatedContact, setValidatedContact] = useState(false);

    const handleValidationContact = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        } else if (form.checkValidity() === true){
            setValidatedContact(true);
            event.preventDefault(); 
        }   
    };

    const [contact, setContact] = useState({
        "name": "",
        "email": ""
    });

    const handleContactName = (value) => {
        let contactTemp = {...contact};
        contactTemp["name"] = value;
        setContact(contactTemp);
    }

    const handleContactEmail = (value) => {
        let contactTemp = {...contact};
        contactTemp["email"] = value;
        setContact(contactTemp);
    }

    // Taking care of address:
    const [validatedAddress, setValidatedAddress] = useState(false);

    const handleValidationAddress = (event) => {
        const form = event.currentTarget;
        console.log(form)
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else if (form.checkValidity() === true) {
            setValidatedAddress(true);
            event.preventDefault();
        }    
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
        
        handleValidationContact(e);
        handleValidationAddress(e);


        if (validatedAddress && validatedContact) {

            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'mode': 'no-cors',
            }

            // // Getting "Invalid Token Speciafied Error"; seeing if these calls to localstorage are causing it
            // var public_id = null;
            // if (localStorage.getItem('public_id')){
            //     public_id = localStorage.getItem('public_id');
            // }

            const submitObject = {...contact, ...address, "repairs": repairForms}

            console.log(submitObject)

            fetch('/api/repair-mulit', {
                method: 'POST',
                body: JSON.stringify(submitObject),
                headers: headers,
            })
            .then(res => {
                res.json()
                if (res.status == 200) {
                    // then clear form and flash Sucess Message
                    clearAll();
                }
            })
            .catch(err => {
                console.log(err)
                setErrors(`Error: ${err}`);
            });
            
            
        }
    }

  return (
    <div className="col">
        <div className='container'>
        {errors && <Alert variant="danger"><span>{errors}</span></Alert>}
        <div className='row'>
                <FormContact
                    validatedContact={validatedContact}
                    contact={contact} 
                    handleContactName={handleContactName}
                    handleContactEmail={handleContactEmail}
                />
            </div>
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
            <div className='row'>
                <h3 className='col-12'>Devices</h3>

                { repairForms && repairForms.map((repair, index) => {
                    return (
                        <FormDevice 
                            index={index}
                            repair={repair}
                            handleRepairBrand={handleRepairBrand}
                            handleRepairModel={handleRepairModel}
                            handleRepairIssue={handleRepairIssue}
                            addRepair={addRepair}
                            removeCertainRepair={removeCertainRepair}
                        />
                    )
                }) }
            </div>
            { repairForms.length < 1 &&
                <Button className="row my-3" onClick={addRepair}>Add a Repair</Button>
            }
            <div className='row'>
                <Button onClick={submitOrder}>Submit Order</Button>
            </div>
        </div>
    </div>
  )
}

export default FormOrder;