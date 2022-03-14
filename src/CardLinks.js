import React from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
// import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class CardLinks extends React.Component {
  render() {
    return (
      <div id='card-links'>
        <Row>
          <Col>
            <div className="jumbotron">
              <Form>
              <Form.Group controlId="language-select">
                  <Form.Label for="language-select">Choose your language</Form.Label>
                  <Form.Control as="select" onChange={this.props.handleLanguageChange}>
                    <option value="">Select an Option</option>
                    <option value="korean">Korean</option>
                    <option value="japanese">Japanese</option>
                  </Form.Control>
                </Form.Group>
                {(this.props.language) && 
                  <Form.Group controlId="level-select">
                    <Form.Label for="level-select">Choose your level of {this.props.language.charAt(0).toUpperCase() + this.props.language.slice(1)} Study</Form.Label>
                    
                    {(this.props.language == 'korean') &&
                      <Form.Control as="select" onChange={this.props.handleLevelChange}>
                        <option value="">Select an Option</option>
                        <option value="1">Topik Level I</option>
                      </Form.Control>
                    }
                    {(this.props.language == 'japanese') &&
                      <Form.Control as="select" onChange={this.props.handleLevelChange}>
                        <option value="">Select an Option</option>
                        <option value="5">JLPT N5</option>
                        <option value="4">JLPT N4</option>
                        <option value="3">JLPT N3</option>
                      </Form.Control>
                    }
                  </Form.Group>
                }
                
                {
                  (this.props.numberOfLessons && this.props.level) &&
                    <Form.Group controlId="lesson-select">
                      <Form.Label for="lesson-select">Choose your lesson</Form.Label>
                      <Form.Control as="select" onChange={this.props.handleLessonChange}>
                        <option value="">Select an Option</option>
                        {
                          this.props.numberOfLessons.map((lesson) => {
                            return <option value={lesson}> {lesson} </option>
                          })
                        }
                      </Form.Control>
                    </Form.Group>
                }
                <Button onClick={this.props.submitChanges} variant="primary">
                  Submit
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default CardLinks;
