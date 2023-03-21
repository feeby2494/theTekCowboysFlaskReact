import React,{ useState, useEffect} from 'react';
import { Button, Alert } from 'react-bootstrap';
import { useParams, Link } from "react-router-dom";


const UserDeviceSingle = (props) => {

    // Get user id and order id
    const { personId, currentOrderId, currentDeviceId } = useParams();

    // Show an error if request fails
    const [errors, setErrors] = useState('');

    const [device, setDevice] = useState([]);
   
    // for current user info
    const [error, setError] = useState(null); // error message for user
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [public_id, setPublic_id] = useState(null);
    const [showAdmin, setShowAdmin] = useState(null);



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

    const retrieveUserDevice = () => {
        const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'mode': 'no-cors',
        'x-access-token': localStorage.getItem('token')
        }

        fetch(`/api/repair-multi/${currentOrderId}/${currentDeviceId}`, {
            method: 'GET',
            headers: headers,
        })
        .then(res=>res.json())
        .then((response) => {
            setDevice(response.device)
        })
        .catch(err => {
        console.log(err);
        setErrors(`Error: ${err}`);
        });
    }

    

    if (!public_id){
        getUserInfo(personId);
    }

    useEffect(() => {
        
        
        retrieveUserDevice(); 
    
    }, [ ]);

    return (
        <div className="col">
            <div className='container'>
                <div className='row'>
                    <Link className="btn btn-info" to={`/${personId}/order-list/${currentOrderId}`}>Back to Order Page</Link>
                </div>
                <div className='row table-responsive'>
                    <h5 className='col-12 text-center my-2'>Device Details:</h5>
                    <table className='table col-12 mt-2 table-hover'>
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Brand</th>
                                <th scope="col">Model</th>
                                <th scope="col">Issue</th>
                                <th scope="col">Serial</th>
                                <th scope="col">Completed</th>
                                <th scope="col">Finished By</th>
                            </tr>
                        </thead>
                        <tbody>
                            {       
                                device.map((item) => {
                                    return (
                                        <tr>
                                            <th scope='row'>{item.id}</th>
                                            <td>{item.brand}</td>
                                            <td>{item.model}</td>
                                            <td>{item.issue}</td>
                                            <td>{item.serial_number}</td>
                                            <td>{item.completed}</td>
                                            <td>{item.finished_by}</td>
                                        </tr>
                                    )
                                })
                            }        
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default UserDeviceSingle;