import React,{Component} from 'react';

export default class Home extends Component {
    constructor(){
        super();
        this.state ={
            message:'loading...'
        }
    }

    componentDidMount(){
        fetch('http://127.0.0.1:5000/api/home', { method: 'get', mode: 'no-cors', })
        .then( res => res.text())
        .then(res=>this.setState({message:res}))
    }
    render(){
        return(
            <div>
                <h1>{this.state.message}</h1>
            </div>
        )
    }
}
