import React,{Component} from 'react';
import '../App.css';
import AddPoint from './AddPoint';




class AllPoints extends React.Component {
  constructor(props){
      // What the fuck is going on? I can't add any props.
      super(props);

    this.state = {
      showHome: true,
      showAddPointFormModal: false,
      showTimeModal: false,
      title: '',
      explanation: '',
      elements: [],
      language: '',
      chapter: '',
      example1: '',
      example2: '',
      example3: '',
      data: null
    }
    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitNewPoint = this.submitNewPoint.bind(this);
  }

  handleTabChange(event) {
  if( this.state.hasOwnProperty(`show${event.target.id}`)) {
    let tabName = `show${event.target.id}`;
    console.log(tabName);
    this.setState({
      showHome: false,

    }, () => {

      this.setState({
        [tabName]: true
      });
    });
  }

  }
  handleClose(event) {
    let properyName = `show${event.target.id}Modal`;
    this.setState({
      [properyName]: false,
    });
  }
  handleShow(event) {
    let properyName = `show${event.target.id}Modal`;
    this.setState({
      [properyName]: true,
    });
    console.log(document.getElementById(`${event.target.id.toLowerCase()}Modal`))
  }

  submitNewPoint = (event) => {
    event.preventDefault();
    fetch('/api/points',{
        method:'POST',
        body: JSON.stringify({
          title: this.state.title,
          explanation: this.state.explanation,
          elements: this.state.elements,
          language: this.state.language,
          chapter: this.state.chapter,
          example1: this.state.example1,
          example2: this.state.example2,
          example3: this.state.example3
        }),
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(res=>res.json())
    .then(
      this.setState({
        title: '',
        explanation: '',
        elements: [],
        language: '',
        chapter: '',
        example1: '',
        example2: '',
        example3: '',
      })
    )

  }
  getPoints = (event) => {
    event.preventDefault();
    fetch('/api/points',{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'x-access-token': localStorage.getItem('token')
        }
    })
    .then(res=>res.json())
    .then((data) => {
      console.log(data);
      this.setState({
        japaneseCard: data
      })
    })

  }

  handleInputChange= (e) => {
      const {value,name}= e.target;
      this.setState({
          [name]:value
      });
  }
    render(){
      return(
        <>
          <AddPoint
            submitNewPoint={this.submitNewPoint}
            handleInputChange={this.handleInputChange}
            title={this.state.title}
            explanation={this.state.explanation}
            elements={this.state.elements}
            language={this.state.language}
            chapter={this.state.chapter}
            example1={this.state.example1}
            example2={this.state.example2}
            example3={this.state.example3}
          />

        </>
      );

    }



  }

export default AllPoints;
