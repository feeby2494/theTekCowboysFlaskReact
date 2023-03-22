import React,{ useState} from 'react';
import { Button, Alert } from 'react-bootstrap';
import FormAddress from './FormAddress';
import FormContact from './FormContact';
import FormDevice from './FormDevice';
import { useParams, Link } from "react-router-dom";

const FormOrder = (props) => {

    // Get user id
    const { personId } = useParams();

    // for current user info
    const [error, setError] = useState(null); // error message for user
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [public_id, setPublic_id] = useState(null);
    const [showAdmin, setShowAdmin] = useState(null);

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
                'x-access-token': localStorage.getItem('token')
            }

            // // Getting "Invalid Token Speciafied Error"; seeing if these calls to localstorage are causing it
            // var public_id = null;
            // if (localStorage.getItem('public_id')){
            //     public_id = localStorage.getItem('public_id');
            // }

            const submitObject = {...contact, ...address, "repairs": repairForms}

            console.log(submitObject)

            fetch('/api/repair-multi', {
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

    // Getting user token and making sure it's not expired first
    const getUserInfo = (personId) => {
        fetch(`/api/user/${personId}`,{
            method:'GET',
            'Content-Type':'application/json',
            headers: {'x-access-token': localStorage.getItem('token')}
        })
        .then((res) => res.json())
        .then((response) => {
            console.log(response);
            setUsername(response[personId].username);
            setEmail(response[personId].email);
            setPublic_id(response[personId].public_id);
            setShowAdmin(response[personId].admin);
        })
        .catch((error) => {
            console.log(error);
            setError(error);
        });
    }

    // Getting user token and id first
    if (!public_id){
        getUserInfo(personId);
    }


  return (
    <div className='container'>
        <div className='row my-3'>
            <Link className="btn btn-info" to={`/${personId}`}>Back to User Home</Link>
        </div>
        {errors && <Alert variant="danger row"><span>{errors}</span></Alert>}
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

  )
}

export default FormOrder;