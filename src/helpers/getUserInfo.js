export const getUserInfo = (personId, props) => {

    fetch(`/api/user/${personId}`,{
        method:'GET',
        'Content-Type':'application/json',
        headers: {'x-access-token': localStorage.getItem('token')}
    })
    .then((res) => res.json())
    .then((response) => {
    console.log(response);
    props.setUsername(response[personId].username);
    props.setEmail(response[personId].email);
    props.setPublic_id(response[personId].public_id);
    props.setShowAdmin(response[personId].admin);
    })
    .catch((error) => {
    console.log(error);
    props.setError(error);
    // Redirect to login   
    props.history.push('/login')
    });
}