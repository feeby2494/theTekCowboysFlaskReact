import React,{ useState, useEffect} from 'react';
import { Button, Alert } from 'react-bootstrap';
import { useParams, Link } from "react-router-dom";


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
        <div className='container'>
            <div className='row my-3'>
                <Link className="btn btn-info" to={`/${personId}`}>Back to User Home</Link>
            </div>
            <div className='row'>
                <div className='row table-responsive'>
                    <h5 className='col-12 text-center my-2'>Orders:</h5>
                    <table className='table col-12 mt-2 table-hover'>
                        <thead>
                            <tr>
                                <th scope="col">Order ID</th>
                                <th scope="col">Submission Date</th>
                                <th scope="col">Link to Order</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.map(order => {
                                    return (
                                        <tr>
                                            <th scope='row'>{order.id}</th>
                                            <td>{order.submitted_date}</td>
                                            <td>
                                                <Link to={`/${personId}/order-list/${order.id}`}>
                                                    To Order Page
                                                </Link>
                                            </td>
                                        </tr>  
                                    );
                                })
                            }

                        </tbody>
                    </table>
                </div>
            </div>  
        </div>
    )
}

export default UserOrderList;