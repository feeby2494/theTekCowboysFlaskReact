import React, { useState, useEffect } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import CustomerRepairCards from "../../components/CustomerRepairCards";
import { withSmallCollContainer } from 'hoc/withSmallCollContainer';
import { Link, useHistory } from "react-router-dom";
import { getUserInfo } from "helpers/getUserInfo";


export const UserHome = (props) => {

  // For redirect when token is invalid
  const history = useHistory();

  const [showRepairsInProgress, setShowRepairsInProgress] = useState(false); // show repairs in progres bool
  const [showRepairsCompleted, setShowRepairsCompleted] = useState(false); // show repairs completed bool
  const [showRepairsAll, setShowRepairsAll] = useState(false); // show repairs completed bool
  const [repairsInProgress, setRepairsInProgress] = useState(null); //Actual container that repairs will be put in after api call
  const [repairsCompleted, setRepairsCompleted] = useState(null); //Actual container that repairs will be put in after api call
  const [repairsAll, setRepairsAll] = useState(null); //Actual container that repairs will be put in after api call
  const [repairErrorMessage, setRepairErrorMessage] = useState(null); // error message
  const [repairErrorBool, setRepairErrorBool] = useState(false); // show error meesage bool

  // for current user info
  const [error, setError] = useState(null); // error message for user
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [public_id, setPublic_id] = useState(null);
  const [showAdmin, setShowAdmin] = useState(null);



  // const getUserInfo = (personId) => {
  //   fetch(`/api/user/${personId}`,{
  //       method:'GET',
  //       'Content-Type':'application/json',
  //       headers: {'x-access-token': localStorage.getItem('token')}
  //   })
  //     .then((res) => res.json())
  //     .then((response) => {
  //       console.log(response);
  //       setUsername(response[personId].username);
  //       setEmail(response[personId].email);
  //       setPublic_id(response[personId].public_id);
  //       setShowAdmin(response[personId].admin);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setError(error);
  //       // Redirect to login   
  //       history.push('/login')
  //     });
  // }

  const getRepairs = () => {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'mode': 'no-cors',
      'x-access-token': localStorage.getItem('token')
    }

    fetch(`/api/mail_in_repair_by_user`, {
          method: 'GET',
          headers: headers,
    })
    .then(res=>res.json())
    .then((response) => {
      setRepairsAll(Object.keys(response).map((key, index) => {return response[key]}));
      setRepairsCompleted(Object.keys(response).map((key, index) => {return response[key]}).filter(obj => obj.repair_completed === true));
      setRepairsInProgress(Object.keys(response).map((key, index) => {return response[key]}).filter(obj => obj.repair_completed === false)); 
    })
    .catch(err => {
      console.log(err);
      setRepairErrorMessage(`Error: ${err}`);
      setRepairErrorBool(true);
    });
  }

 

  if (!public_id){
    getUserInfo(props.match.params.personId, {
      "setError": setError,
      "error": error,
      "setUsername": setUsername,
      "username": username,
      "setEmail": setEmail,
      "email": email,
      "setPublic_id": setPublic_id,
      "public_id": public_id,
      "showAdmin": showAdmin,
      "setShowAdmin": setShowAdmin,
      "history": history
    });
    
  }

  useEffect(() => {
    
    
    getRepairs(); 
  
  }, [ ]);

 

  // Enhanced Higher Order Components
  const CollapsableMailInRepairCardsInProgress = withSmallCollContainer(CustomerRepairCards);
  const CollapsableMailInRepairCardsCompleted = withSmallCollContainer(CustomerRepairCards);
  const CollapsableMailInRepairCardsAll = withSmallCollContainer(CustomerRepairCards);


  return(
    <Container>
      <Row className="my-3">
        <Link className="btn btn-info" to="/">Back to homepage</Link>
        <Alert>{error}</Alert>
      </Row>
      <Row className="my-3 align-items-center">
        <Col sm={12} md={4} >
          { username && <h2>Welcome, {username}!</h2> }
        </Col>
        <Col sm={12} md={8}>
          <p>Here are the repairs you currenty have submitted organized by completed, in-progress, and all.</p>
          <p>Remember it's possible to submit repairs without being logged in. If you need to have a repair 
          changed to your username, then please contact me at: <a href="mailto:toby2494@gmail.com">toby2494@gmail.com</a></p>
        </Col>
      </Row>
      <CollapsableMailInRepairCardsInProgress
          componentTitle="Repairs In Progress"
          button_text="Show Repairs In Progress"
          id_name="repairs_in_progress" 
          showContent={showRepairsInProgress} 
          handleShowContent={() => {
            setShowRepairsInProgress(!showRepairsInProgress)
          }}
          repairList={repairsInProgress}
        />
        <CollapsableMailInRepairCardsCompleted
          componentTitle="Repairs Completed"
          button_text="Show Repairs Completed"
          id_name="repairs_completed" 
          showContent={showRepairsCompleted} 
          handleShowContent={() => {
            setShowRepairsCompleted(!showRepairsCompleted)
          }}
          repairList={repairsCompleted}
        />
        <CollapsableMailInRepairCardsAll
          componentTitle="All Repairs"
          button_text="Show All Repairs"
          id_name="repairs_all" 
          showContent={showRepairsAll} 
          handleShowContent={() => {
            setShowRepairsAll(!showRepairsAll)
          }}
          repairList={repairsAll}
        />
    </Container>
  );
} 



export default UserHome;