import React,{ useState, useEffect} from 'react';
import { Button, Alert } from 'react-bootstrap';
import { useParams, Link } from "react-router-dom";


const UserOrderSingle = (props) => {

    // Get user id and order id
    const { personId, currentOrderId } = useParams();

    // Show an error if request fails
    const [errors, setErrors] = useState('');

    const [order, setOrder] = useState([]);
    const [devices, setDevices] = useState([]);
   
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

    const retrieveUserOrder = () => {
        const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'mode': 'no-cors',
        'x-access-token': localStorage.getItem('token')
        }

        fetch(`/api/repair-multi/${currentOrderId}`, {
            method: 'GET',
            headers: headers,
        })
        .then(res=>res.json())
        .then((response) => {
            setOrder(response.order)
            setDevices(response.devices)
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
        
        
        retrieveUserOrder(); 
    
    }, [ ]);

    return (
        <div className='container'>
            <div className='row my-3'>
                <Link className="btn btn-info" to={`/${personId}/order-list`}>Back to All Orders</Link>
            </div>
            {
                order.map(order => {
                    return (
                        <div className='row my-2'>
                            <ul class="list-group col-12 list-group-flush">
                                <li class="list-group-item">Order ID: {order.id}</li>
                                <li class="list-group-item">Submitted: {order.submitted_date}</li>
                            </ul>
                        </div>
                    )
                })
            }
            <div className='row table-responsive'>
                <h5 className='col-12 text-center my-2'>Devices on this Order:</h5>
                <table className='table col-12 mt-2 table-hover'>
                    <thead>
                        <tr>
                            <th scope="col">Device ID</th>
                            <th scope="col">Brand</th>
                            <th scope="col">Model</th>
                            <th scope="col">Issue</th>
                            <th scope="col">Link to Device</th>
                        </tr>
                    </thead>
                    <tbody>
                        {       
                            devices.map((device) => {
                                return (
                                    <tr>
                                        <th scope='row'>{device.id}</th>
                                        <td>{device.brand}</td>
                                        <td>{device.model}</td>
                                        <td>{device.issue}</td>
                                        <td>
                                            <Link to={`/${personId}/order-list/${currentOrderId}/${device.id}`}>
                                                To Device Page
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })
                        } 
                    </tbody>
                </table>
            </div>   
        </div>
    )
}

export default UserOrderSingle;