import React, { useState, useEffect } from "react";
import { Container, Row, Col, Alert, Button } from "react-bootstrap";
import CustomerRepairCards from "../../components/CustomerRepairCards";
import { withSmallCollContainer } from 'hoc/withSmallCollContainer';
import { Link, useHistory, useParams } from "react-router-dom";
import { getUserInfo } from "helpers/getUserInfo";


export const UserHome = (props) => {

  // For redirect when token is invalid
  const history = useHistory();

  // Get publid-id from url
  const { personId } = useParams();

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
      <Row>
        <div className="col-lg-1"></div>
        <div className="col-lg-10">
          <Container>
            <Row className="my-3">
              <Link className="btn btn-info" to="/">Back to homepage</Link>
              {
                error && <Alert variant="danger" className="mt-4">{error}</Alert>
              }
            </Row>
            <Row className="my-3 align-items-center">
              <Col sm={12} md={4} >
                { username && <h2>Welcome, {username}!</h2> }
              </Col>
              <Col sm={12} md={8}>
                <Alert>
                  It's recomeneded to use the new order submission feature below as it allows you to submit multiple devices under one order.
                  Also, you must login to access the updated system. The old submission form is still usable, but has less features and 
                  creates cunfusion when a user is not logged in. The new system requires you to login and is recomeneded.
                </Alert>
              </Col>
            </Row>
            <div className="row mt-3">
              <div className="card container">
                <div className="card.body row my-4 mx-1">
                  <h2 className="text-center col-sm-5">New Repair System</h2>
                  <Link className="btn btn-outline-info col-sm-3 me-1" to={`/${personId}/order-list`}>All your Orders</Link>
                  <Link className="btn btn-outline-success col-sm-3" to={`/${personId}/order-submit`}>Submit New Order</Link>
                </div>
              </div>
            </div>
            <Row>
              <h2 className="text-center mt-5">Old Repair System</h2>
              <Alert variant="danger">We are currently moving away from the old system of mail-in repairs. Please always login first and use the new submission form above. If you have repairs submitted under old system, then they will be available below.</Alert>
              <p>Here are the repairs you currenty have submitted organized by completed, in-progress, and all.</p>
                <p>Remember it's possible to submit repairs without being logged in. If you need to have a repair 
                changed to your username, then please contact me at: <a href="mailto:toby2494@gmail.com">toby2494@gmail.com</a></p>

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
        </div>
        <div className="col-lg-1"></div>
      </Row>
    </Container>
  );
} 



export default UserHome;