import React,{ useState} from 'react';
import { Accordion, Button, Form, Alert, Card } from 'react-bootstrap';

const RepairAccordion = (props) => {
  const [validatedAddress, setValidatedAddress] = useState(false);
  const [validatedContact, setValidatedContact] = useState(false);
  const [show, setShow] = useState(false);
  const [showStepOne, setShowStepOne] = useState(true);
  const [showStepTwo, setShowStepTwo] = useState(false);
  const [showStepThree, setShowStepThree] = useState(false);
  const [showPublic, setShowPublic] = useState(true);
  const [errors, setErrors] = useState('');
  const [okToSubmit, setOkToSubmit] = useState(false);
  const handlePublic = () => {
    setShowPublic(false);
    console.log("handle close for toast")
  }
  const handleStepOne = (e) => {
    e.preventDefault();
    setShowStepOne(true);
    setShowStepTwo(false);
    setShowStepThree(false);
  };
  const handleStepTwo = (e) => {
    e.preventDefault();
    handleValidationContact(e);
    if ( e.currentTarget.checkValidity() === true ) {
      setShowStepOne(false);
      setShowStepTwo(true);
      setShowStepThree(false);
    }
  };
  const handleStepThree = (e) => {
    e.preventDefault();
    handleValidationAddress(e);
    if ( e.currentTarget.checkValidity() === true ) {
      setShowStepOne(false)
      setShowStepTwo(false);
      setShowStepThree(true);
    }
  };
  
  const handleValidationAddress = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } 
    setValidatedAddress(true);
    event.preventDefault();
  };

  const handleValidationContact = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } 
    setValidatedContact(true);
    event.preventDefault();
    
  };

  // Cutting this one out!
  // Check if email is wrong; don't need, but good double check before submission and checks against regex pattern
  const handleEmailValidation = (value) => {
    if (!email.match(/^\S+@\S+$/) || !email) {
      setEmail(value);
      setErrors('Need valid Email!');
      setOkToSubmit(false);
      console.log('email false!');
    } else {
      setEmail(value);
      setErrors('');
      setOkToSubmit(true);
      console.log('email Good!');
    }
  }

  const submitRepairObject = (e) => {
    // Actually don't need this, since validation is checked on each step now, which blocks access to next step
    // But will check if email matches the right regex format, so still needed!
    if (!email) {
      setErrors('Need valid Email!');
    }
    if ( validatedAddress && validatedContact) {
      submitRepair();
      handleClose();
    }
    
    
    
  }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  

  // State for repair form
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [addressLineOne, setAddressLineOne] = useState("");
  const [addressLineTwo, setAddressLineTwo] = useState("");
  const [addressCity, setAddressCity] = useState("");
  const [addressState, setAddressState] = useState("");
  const [addressPostalCode, setAddressPostalCode] = useState("");
  const [addressCountry, setAddressCountry] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [serial, setSerial] = useState("");
  const [issue, setIssue] = useState("");

  const submitRepair = () => {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'mode': 'no-cors',
    }

    // Getting "Invalid Token Speciafied Error"; seeing if these calls to localstorage are causing it
    var public_id = null;
    if (localStorage.getItem('public_id')){
      public_id = localStorage.getItem('public_id');
    }
    

    const submitObject = {
        repair_first_name: firstName,
        repair_last_name: lastName,
        repair_email: email,
        repair_phone: phone,
        repair_address_line_one: addressLineOne,
        repair_address_line_two: addressLineTwo,
        repair_address_city: addressCity,
        repair_address_state: addressState,
        repair_address_postal_code: addressPostalCode,
        repair_address_country: addressCountry,
        repair_brand: brand,
        repair_model: model,
        repair_serial: serial,
        repair_issue: issue,
        repair_user_public_id: public_id
    }
    
    fetch(`/api/mail_in_repair`, {
        method: 'POST',
        body: JSON.stringify(submitObject),
        headers: headers,
    })
    .then(res=>res.json())
    .catch(err => {
        console.log(err)
        setErrors(`Error: ${err}`);
    });
    
}


  return (
      <div className="shadow mb-5 bg-white rounded mt-3">
        <Accordion className="" defaultActiveKey="0">
            <Accordion.Item  eventKey="0" onClick={handleShow}>
              <Accordion.Header className='text-center w-100'>
                Mail-In Repair (Click to hide form)
              </Accordion.Header>
              <Accordion.Body>
              <Card border="light">
                <Card.Header closeButton>
                <Card.Title>Mail-In Repair Form</Card.Title>
                </Card.Header>
                <Card.Body className="text-center">
                
                {errors && <Alert variant="danger"><span>{errors}</span></Alert>}
                {
                    (showStepOne) &&
                    <>
                    <h3>
                        Contact Info
                    </h3>
                    <Form className='repair-step-one-form' noValidate validated={validatedContact} onSubmit={handleStepTwo}>
                        <Form.Group className="mb-3" controlId="RepairFormModal.FullName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control name="firstName" value={firstName} type="name" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} required/>
                        <Form.Control.Feedback type="invalid">
                            Make up any name, but we still need something!
                        </Form.Control.Feedback>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control name="lastName" value={lastName} type="name" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} required/>
                        <Form.Control.Feedback type="invalid">
                            Make up any name, but we still need something!
                        </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="RepairFormModal.Email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control  name="email" value={email} type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required/>
                        <Form.Control.Feedback type="invalid">
                            Without email, we can't even contact you, email will be double validated at end of submission!
                        </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="RepairFormModal.Phone">
                        <Form.Label>Phone (only for last resort)</Form.Label>
                        <Form.Control name="phone" value={phone} type="phone" placeholder="Phone Number" onChange={(e) => setPhone(e.target.value)} required/>
                        <Form.Control.Feedback type="invalid">
                            I don't want you phone number (I hate talking on the phone!), but in emergency situations you never know.
                        </Form.Control.Feedback>
                        </Form.Group>
                        <Button variant="info" className="mr-3" type="submit">Continue</Button>
                    </Form>    
                    </>
                }
                {
                    (showStepTwo) &&
                    <>
                    <h3>Mail Address and Contact</h3>
                    <Form noValidate validated={validatedAddress} onSubmit={handleStepThree}>
                        <Form.Group className="mb-3" controlId="RepairFormModal.Address">
                        <Form.Label>Address Line One:</Form.Label>
                        <Form.Control placeholder="Address Line 1" name="addressLineOne" value={addressLineOne} type="name" rows={1} onChange={(e) => setAddressLineOne(e.target.value)} required/>
                        <Form.Control.Feedback type="invalid">
                        Address line one: Street Address
                        </Form.Control.Feedback>
                        <Form.Label>Address Line Two:</Form.Label>
                        <Form.Control placeholder="Address Line 2" name="addressLineTwo" value={addressLineTwo} type="name" rows={1} onChange={(e) => setAddressLineTwo(e.target.value)}/>
                        <Form.Label>Address City:</Form.Label>
                        <Form.Control placeholder="City" name="addressCity" value={addressCity} type="name" onChange={(e) => setAddressCity(e.target.value)} required/>
                        <Form.Control.Feedback type="invalid">
                        City Required
                        </Form.Control.Feedback>
                        <Form.Label>Address State:</Form.Label>
                        <Form.Control placeholder="State" name="addressState" value={addressState} type="name" onChange={(e) => setAddressState(e.target.value)} required/>
                        <Form.Control.Feedback type="invalid">
                        State or Province Required
                        </Form.Control.Feedback>
                        <Form.Label>Address PostalCode:</Form.Label>
                        <Form.Control placeholder="Postal/Zip code" name="addressPostalCode" value={addressPostalCode} type="name" onChange={(e) => setAddressPostalCode(e.target.value)} required/>
                        <Form.Control.Feedback type="invalid">
                        Postal or Zip Code Required
                        </Form.Control.Feedback>
                        <Form.Label>Address Country:</Form.Label>
                        <Form.Control placeholder="Nation of Residence" name="addressCountry" value={addressCountry} type="name" onChange={(e) => setAddressCountry(e.target.value)} required/>
                        <Form.Control.Feedback type="invalid">
                        Nation of Residence Required
                        </Form.Control.Feedback>
                        </Form.Group>
                        <Button variant="warning" className="mr-3" onClick={handleStepOne}>Go Back</Button>
                        <Button variant="info" type="submit" >Continue</Button>
                    </Form>
                    
                    </>
                }
                {
                    (showStepThree) &&
                    <>
                    <h3>Device Info</h3>
                    <Form>
                        <Form.Group className="mb-3" controlId="RepairFormModal.DeviceInfo">
                        <Form.Label>Brand</Form.Label>
                        <Form.Control name="brand" value={brand} type="name" placeholder="Brand" onChange={(e) => setBrand(e.target.value)}/>
                        <Form.Label>Model</Form.Label>
                        <Form.Control name="model" value={model} type="name" placeholder="Model" onChange={(e) => setModel(e.target.value)}/>
                        <Form.Label>Serial Number</Form.Label>
                        <Form.Control name="serial" value={serial} type="name" placeholder="Serial" onChange={(e) => setSerial(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="RepairFormModal.Issue">
                        <Form.Label>Issue:</Form.Label>
                        <Form.Control name="issue" value={issue} as="textarea" rows={3} onChange={(e) => setIssue(e.target.value)}/>
                        </Form.Group>
                    </Form>
                    <Button variant="warning" className="mr-3" onClick={handleStepTwo}>Go Back</Button>
                    <Button variant="success" type="submit" onClick={submitRepairObject}>Submit</Button>
                    </>
                }
                </Card.Body>
                <Card.Footer>
                </Card.Footer>
                </Card>
              </Accordion.Body>
            </Accordion.Item>
        </Accordion>
      </div>
  );
}

export default RepairAccordion;