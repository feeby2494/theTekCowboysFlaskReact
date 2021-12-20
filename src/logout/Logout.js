import React,{Component} from 'react';
import {withRouter} from 'react-router'; // OM!!! This gives me back history on this.props!!!!!

class Logout extends Component {

  constructor(){
    super();
    this.state = { message:""};
  }

    componentDidMount() {
        let message ="";
        if(localStorage.getItem('token')){
          message = "Logout Successful";
          localStorage.removeItem('token');
          localStorage.removeItem('public_id');
        }else{
          message = "Please login."
        }
        this.setState({message:message});
        this.props.history.push('/')
      }



      render() {
        return (
          <div>
            <h1>{this.state.message}</h1>
          </div>
        );
      }
}


export default withRouter(Logout)
