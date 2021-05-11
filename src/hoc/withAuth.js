import React,{Component} from 'react';
import jwt_decode from "jwt-decode";
import {Redirect} from 'react-router-dom';

const withAuth = (ComponentInside) => {
 return class extends Component {
    constructor(){
        super();
        this.state={
            loading:true,
            redirect:false,
            currentPublicId: localStorage.getItem('public_id')
        };
    }
    componentDidMount() {
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
              this.setState({ loading: false });
            } else {
              const error = new Error(res.error);
              throw error;
            }
          })
          .catch(err => {
            console.error(err);
            this.setState({ loading: false, redirect: true });
          });
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


export default withAuth;
