import React,{Component} from 'react';
import WebServiceEnqueryForm from './web_services/WebServiceEnqueryForm';

export default class Home extends Component {
    constructor(){
        super();
        this.state ={
            message:'working'
        }
    }

    componentDidMount(){
        // fetch('/server/home')
        // .then( res => res.text())
        // .then(res=>this.setState({message:res}))
    }
    render(){
        return(
            <div>
                <h1>{this.state.message}</h1>
                <h1>{this.state.message}</h1>
                <WebServiceEnqueryForm />
            </div>
        )
    }
}


