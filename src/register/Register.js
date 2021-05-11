import React,{Component} from 'react';

export default class Login extends Component {
    constructor(){
        super();
        this.state={
            username:'',
            email:'',
            password:''
        };
    }

    handleInputChange =(e)=>{
        const {value,name}= e.target;
        this.setState({
            [name]:value
        });
    }

    onSubmit =(e)=>{
        e.preventDefault();
        fetch('/api/register',{
            method:'POST',
            body: JSON.stringify(this.state),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then(user_token=>{
            let { token } = user_token;
            localStorage.setItem('token', token);
            this.props.history.push('/');

        })
    }
    render(){
        return(
            <form onSubmit={this.onSubmit}>
                <h1>Login</h1>
                <input type="username" autoComplete="true" name="username" placeholder="Enter username" value={this.state.username} onChange={this.handleInputChange}></input>
                <input type="email" autoComplete="true" name="email" placeholder="Enter email" value={this.state.email} onChange={this.handleInputChange}></input>
                <input type="password"  autoComplete="true" name="password" placeholder="Enter password" value={this.state.password} onChange={this.handleInputChange}></input>
                <input type="submit" value="Login"/>
                <input type="button" value="Register"/>
            </form>
        )
    }
}
