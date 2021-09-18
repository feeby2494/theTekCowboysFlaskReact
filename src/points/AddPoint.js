import React,{Component} from 'react';
import '../App.css';
import AddPointFormModal from './AddPointFormModal';

class AddPoint extends Component {

  constructor(props){
      // What the fuck is going on? I can't add any props.
      super(props);
    }


  render(){
    return(
      <>
        <AddPointFormModal
          submitNewPoint={this.props.submitNewPoint}
          handleInputChange={this.props.handleInputChange}
          title={this.props.title}
          explanation={this.props.explanation}
          elements={this.props.elements}
          language={this.props.language}
          chapter={this.props.chapter}
          example1={this.props.example1}
          example2={this.props.example2}
          example3={this.props.example3}
        />

      </>
    );

  }



}



export default AddPoint;
