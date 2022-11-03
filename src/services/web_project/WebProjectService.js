import React,{Component} from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default class About extends Component {
  constructor(props){
      super(props);
    this.state = {
      showHome: true,
      showProfile: false,
      showContact: false,

    }
    this.handleTabChange = this.handleTabChange.bind(this);

  }


  handleTabChange(event) {
  if( this.state.hasOwnProperty(`show${event.target.id}`)) {
    let tabName = `show${event.target.id}`;
    console.log(tabName);
    this.setState({
      showHome: false,
      showProfile: false,
      showContact: false,
    }, () => {

      this.setState({
        [tabName]: true
      });
    });
  }


  }

render(){
  return(
    <Card>
      <Card.Header>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" >
            <a className="nav-link active" id="Home" onClick={this.handleTabChange}  data-toggle="tab" href="#home" role="tab" aria-controls="homeTab" aria-selected="true">Home</a>
          </li>
          <li className="nav-item" >
            <a className="nav-link" id="Profile" onClick={this.handleTabChange}  data-toggle="tab" href="#profile" role="tab" aria-controls="profileTab" aria-selected="false">Profile</a>
          </li>
          <li className="nav-item" >
            <a className="nav-link" id="Contact" onClick={this.handleTabChange}  data-toggle="tab" href="#contact" role="tab" aria-controls="contactTab" aria-selected="false">Contact</a>
          </li>
        </ul>
      </Card.Header>
      <Card.Body>
        <Row>
          { this.state.showHome && (
            <Col>
              <h5>Home</h5>
            </Col>

          )}
          { this.state.showProfile && (
            <Col>
              <h5>Profile</h5>
            </Col>

          )}
          { this.state.showContact && (
            <Col>
              <h5>Contacts</h5>
            </Col>

          )}
        </Row>
      </Card.Body>
    </Card>
    );
  }
}
