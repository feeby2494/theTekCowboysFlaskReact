import React,{Component} from 'react';
import '../App.css';
import AddPoint from './AddPoint';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


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
    this.getPoints = this.getPoints.bind(this);
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
        japaneseCard: data
      })
    })

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
        japaneseCard: data
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
          <Row>
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
          </Row>
          <Row>
            { this.state.japaneseCard && Object.keys(this.state.japaneseCard).map((key, index) => {
                return (
                  <Col md={4} className="my-2">
                  <Card bg='light'>
                    <Card.Header as="h5">{this.state.japaneseCard[key].title}</Card.Header>
                    <Card.Body>
                      <Card.Title>{this.state.japaneseCard[key].explanation}</Card.Title>
                      <Card.Text>
                        {
                          this.state.japaneseCard[key].elements.map((el) => {
                            return (<Col>{el.text}</Col>);
                          })
                        }
                      </Card.Text>
                      <Button variant="primary">Modify Point</Button>
                      <Button onClick={ () => this.deletePoint(this.state.japaneseCard[key].id)} id={this.state.japaneseCard[key].id} variant="primary">Delete Point</Button>
                    </Card.Body>
                    </Card>
                  </Col>
                );
              })
            }
          </Row>
        </Container>
      );

    }



  }

export default AllPoints;
