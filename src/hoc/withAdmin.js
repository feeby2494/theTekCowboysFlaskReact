import React,{Component} from 'react';
import jwt_decode from "jwt-decode";
import {Redirect} from 'react-router-dom';

const withAdmin = (ComponentInside) => {
 return class extends Component {
    constructor(){
        super();
        this.state={
            loading: true,
            redirect: false,
            isAdmin: false,
            currentPublicId: localStorage.getItem('public_id')
        };
        this.checkUserAdmin = this.checkUserAdmin.bind(this); 
    }
    checkUserAdmin() {
      const myHeaders = new Headers();

      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token')}`);
      myHeaders.append('x-access-token', localStorage.getItem('token'));

        fetch('/api/user/' + this.state.currentPublicId, {
            credentials: "include",
            headers: myHeaders

        })
          .then(res => {
            if (res.status === 200) {
              this.setState({ 
                loading: false
            });
            } else {
              const error = new Error(res.error);
              throw error;
            }
            return res.json();
          })
          .then(data => {
            if (data[this.state.currentPublicId].admin === true) {
                console.log("User is admin and can continue to proceed.")
                this.setState({
                    isAdmin: true
                });
            } else {
                console.log("User is not Admin! Cannot be here!")
                this.setState({
                    loading: false, redirect: true 
                })
            }
          })
          .catch(err => {
            console.error(err);
            this.setState({ loading: false, redirect: true });
          });
      }
      // response[personId].admin;

      componentDidMount() {
        console.log(this.state.currentPublicId);
        if(this.state.currentPublicId){
            this.checkUserAdmin();
        } else {
          this.setState({
            redirect: true,
            loading: false,
          });
        }
      }

    render(){
        const{loading, redirect} = this.state;
        
        
        if(loading){
            return null;
        }
        if(redirect){
            return <Redirect to ="/login"/>
        }
        return <ComponentInside {...this.props}/>
    }
}
}


export default withAdmin;
