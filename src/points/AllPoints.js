import React,{Component} from 'react';
import '../App.css';
import AddPoint from './AddPoint';
import AllPointsByFilter from './AllPointsByFilter';
import PointCardTemplate from './PointCardTemplate';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


class AllPoints extends React.Component {
  constructor(props){
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
      data: null,
      categoriesList: null,
      languagesList: null,
      filterLanguage: 'all',
      filterCategory: 'all',
      errorBool: false,
      errorMessage: null

    }
    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitNewPoint = this.submitNewPoint.bind(this);
    this.getPoints = this.getPoints.bind(this);
    this.getFilteredPoints = this.getFilteredPoints.bind(this);
    this.deletePoint = this.deletePoint.bind(this);
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

  handleChange(event) {
    let properyName = `${event.target.id}`;
    this.setState({
      [properyName]: event.target.value
    });
  }

  submitNewPoint = (event) => {
    event.preventDefault();
    fetch('/api/post_points',{
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
            'Content-Type':'application/json',
            'x-access-token': localStorage.getItem('token')
        }
    })
    .then(res=>res.json())
    .then((data) => {
      this.setState({
        title: '',
        explanation: '',
        elements: '',
        language: '',
        chapter: '',
        example1: '',
        example2: '',
        example3: '',
        japaneseCard: data[0],
        categoriesList: data[1],
        languagesList: data[2]
      })
    })
    .catch(err => {
      console.log(err)
      this.setState({
        errorMessage: `Error: ${err}`,
        errorBool: true,
      });
    });

  }
  getPoints = (event) => {
    // event.preventDefault();
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
        japaneseCard: data[0],
        categoriesList: data[1],
        languagesList: data[2]
      });
    })

  }

  getFilteredPoints = (event) => {
    // event.preventDefault();
    fetch('/api/points',{
        method:'POST',
        body: JSON.stringify({
          filter_language: this.state.filterLanguage,
          filter_category: this.state.filterCategory
        }),
        headers:{
            'Content-Type':'application/json',
            'x-access-token': localStorage.getItem('token')
        }
    })
    .then(res=>res.json())
    .then((data) => {
      console.log(data);
      this.setState({
        japaneseCard: data[0],
        categoriesList: data[1],
        languagesList: data[2]
      })
    })

  }

  deletePoint = (id) => {
    // event.preventDefault();
    fetch('/api/points/' + id,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'x-access-token': localStorage.getItem('token')
        }
    })
    .then(res=>res.json())
    .then((data) => {
      this.setState({
        japaneseCard: data
      });
    })

  }

  handleInputChange= (e) => {
      const {value,name}= e.target;
      this.setState({
          [name]:value
      });
  }

  componentDidMount() {
       this.getPoints();
    }

    render(){
      return(
        <Container>
          <Row className="my-3">
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
              errorBool={this.errorBool}
              errorMessage={this.errorMessage}
            />
            <AllPointsByFilter
              japaneseCard={this.state.japaneseCard}
              handleChange={this.handleChange}
              languagesList={this.state.languagesList}
              categoriesList={this.state.categoriesList}
              getFilteredPoints={this.getFilteredPoints}
            />
          </Row>
          <Row>
            <PointCardTemplate
              japaneseCard={this.state.japaneseCard}
              deletePoint={this.deletePoint}
            />
          </Row>
        </Container>
      );

    }



  }

export default AllPoints;

// New Component with Auth higher Order Component to require login before adding point.


// TODO: Possible to still see all other points, but when addPoint button clicked, then it will require a login?

// const AddPointWithAuth = withAuth(AddPoint);