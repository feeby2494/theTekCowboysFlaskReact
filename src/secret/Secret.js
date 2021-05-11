import React,{Component} from 'react';

export default class Secret extends Component {
    constructor() {
        super();
        this.state = {
          message: 'Loading...'
        }
      }

      componentDidMount() {
        const myHeaders = new Headers();

        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token')}`);
        myHeaders.append('x-access-token', localStorage.getItem('token'));

        fetch('/api/user/', {
            method:'GET',
            headers: myHeaders
        })
          .then(res => res.json())
          .then(res => this.setState({message: res.public_id}));
      }

      render() {
        return (
          <div>
            <h1>Secret</h1>
            <p>{this.state.message}</p>
          </div>
        );
      }
}
