import React,{ useState} from 'react';
import { Modal, Button, Form, Row, Col, Toast } from 'react-bootstrap';

import '../App.css';

const RepairForm = (props) => {
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
  const handleStepOne = () => {
    setShowStepOne(true);
    setShowStepTwo(false);
    setShowStepThree(false);
  };
  const handleStepTwo = () => {
    setShowStepOne(false);
    setShowStepTwo(true);
    setShowStepThree(false);
  };
  const handleStepThree = () => {
    setShowStepOne(false)
    setShowStepTwo(false);
    setShowStepThree(true);
  };
  
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

  const submitRepairObject = () => {

    if (okToSubmit) {
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

    const public_id = localStorage.getItem('public_id');

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
    <Col className="my-2">
      <Button variant="info" onClick={handleShow}>
        Mail-In Repair
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Mail-In Repair Form</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {
            showPublic && 
            <Toast onClose={handlePublic}>
                <Toast.Header>
                <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                
                <small>Logged In?</small>
              </Toast.Header>
                <Toast.Body>
                  {
                    (localStorage.getItem('public_id'))
                    ?
                      <>
                        <p>You are logged in and your public_id is: {localStorage.getItem('public_id')}. You may close this and procced.</p>
                      </>
                    :
                      <>
                        <p>If you are registered as a user, then please login before submitting a repair.</p> 
                        <Button href="\login">Login</Button>
                      </>
                  }
                </Toast.Body>
            </Toast>
          }
          {errors && <span>{errors}</span>}
          {
            (showStepOne) &&
            <>
              <h3>
                Contact Info
              </h3>
              <Form className='repair-step-one-form'>
                <Form.Group className="mb-3" controlId="RepairFormModal.FullName">
                <Form.Label>First Name</Form.Label>
                <Form.Control name="firstName" value={firstName} type="name" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)}/>
                <Form.Label>Last Name</Form.Label>
                <Form.Control name="lastName" value={lastName} type="name" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="RepairFormModal.Email">
                <Form.Label>Email</Form.Label>
                <Form.Control  name="email" value={email} type="email" placeholder="Email" onChange={(e) => handleEmailValidation(e.target.value)}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="RepairFormModal.Phone">
                <Form.Label>Phone (only for last resort)</Form.Label>
                <Form.Control name="phone" value={phone} type="phone" placeholder="Phone Number" onChange={(e) => setPhone(e.target.value)}/>
              </Form.Group>
              </Form>
              <Button variant="info" className="mr-3" onClick={handleStepTwo}>Continue</Button>
            </>
          }
          {
            (showStepTwo) &&
            <>
              <h3>Mail Address and Contact</h3>
              <Form>
                <Form.Group className="mb-3" controlId="RepairFormModal.Address">
                <Form.Label>Address Line One:</Form.Label>
                <Form.Control name="addressLineOne" value={addressLineOne} type="name" rows={1} onChange={(e) => setAddressLineOne(e.target.value)}/>
                <Form.Label>Address Line Two:</Form.Label>
                <Form.Control name="addressLineTwo" value={addressLineTwo} type="name" rows={1} onChange={(e) => setAddressLineTwo(e.target.value)}/>
                <Form.Label>Address City:</Form.Label>
                <Form.Control name="addressCity" value={addressCity} type="name" onChange={(e) => setAddressCity(e.target.value)}/>
                <Form.Label>Address State:</Form.Label>
                <Form.Control name="addressState" value={addressState} type="name" onChange={(e) => setAddressState(e.target.value)}/>
                <Form.Label>Address PostalCode:</Form.Label>
                <Form.Control name="addressPostalCode" value={addressPostalCode} type="name" onChange={(e) => setAddressPostalCode(e.target.value)}/>
                <Form.Label>Address Country:</Form.Label>
                <Form.Control name="addressCountry" value={addressCountry} type="name" onChange={(e) => setAddressCountry(e.target.value)}/>
                </Form.Group>
              </Form>
              <Button variant="warning" className="mr-3" onClick={handleStepOne}>Go Back</Button>
              <Button variant="info" onClick={handleStepThree}>Continue</Button>
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Col>
  );
}

export default RepairForm;