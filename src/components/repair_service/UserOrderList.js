import React,{ useState, useEffect} from 'react';
import { Button, Alert } from 'react-bootstrap';
import { useParams } from "react-router-dom";


const UserOrderList = (props) => {

    // Get user id
    const { personId } = useParams();

    // Show an error if request fails
    const [errors, setErrors] = useState('');

    const [orders, setOrders] = useState([]);
   
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

    const retrieveUserOrderList = () => {
        const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'mode': 'no-cors',
        'x-access-token': localStorage.getItem('token')
        }

        fetch(`/api/repair-multi`, {
            method: 'GET',
            headers: headers,
        })
        .then(res=>res.json())
        .then((response) => {
            setOrders(response)
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
        
        
        retrieveUserOrderList(); 
    
    }, [ ]);

    return (
        <div className="col">
            <div className='container'>
                <div className='row'>
                    {
                        orders.map(order => {
                            return (
                                <div className='col-md-6 card'>
                                    <div className='container'>
                                        <div className='row'>
                                            <h4>Order ID: {order.id}</h4>
                                            <p>Submitted: {order.submitted_date}</p>
                                        </div>
                                        <div className='row'>
                                            <h4 className='col-12'>Contact</h4>
                                            <p className='col-12'>Name: {order.contact.name}</p>
                                            <p className='col-12'>Email: {order.contact.email}</p>
                                        </div>
                                        <div className='row'>
                                            <h4 className='col-12'>Address : </h4>
                                        </div>
                                        <div className='row'>
                                            <p className='col'>{order.address.line_one}</p>
                                            {order.address.line_two.length > 1 && <p className='col'>{order.address.line_two}</p>}
                                            <p className='col'>{order.address.city}, </p> 
                                            <p className='col'>{order.address.state}</p>
                                        </div>
                                        <div className='row'>
                                            <p className='col-3'>{order.address.postal_code}</p>
                                            <p className='col-3'>{order.address.country}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>  
            </div>
        </div>
    )
}

export default UserOrderList;