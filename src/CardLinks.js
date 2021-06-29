import React from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class CardLinks extends React.Component {
  render() {
    return (
      <div id='card-links'>
        <Row>
          <Col>
            <Jumbotron>
              <Form>
                <Form.Group controlId="japanese-level">
                  <Form.Label for="japanese-level">Choose your level of Japanese Study</Form.Label>
                  <Form.Control as="select" onChange={this.props.handleLevelChange}>
                    <option value="">Select an Option</option>
                    <option value="jlpt_n5">JLPT N5</option>
                    <option value="jlpt_n4">JLPT N4</option>
                    <option value="jlpt_n3">JLPT N3</option>
                    <option value="topik_I">Topik Level I</option>
                  </Form.Control>
                </Form.Group>
                {
                  this.props.numberOfLessons ?
                    <Form.Group controlId="japanese-lesson">
                      <Form.Label for="japanese-lesson">Choose your lesson</Form.Label>
                      <Form.Control as="select" onChange={this.props.handleLessonChange}>
                        <option value="">Select an Option</option>
                        {
                          this.props.numberOfLessons.map((lesson) => {
                            return <option value={lesson}> Lesson {lesson} </option>
                          })
                        }
                      </Form.Control>
                    </Form.Group> :
                    < br />
                }
                <Button onClick={this.props.submitChanges} variant="primary">
                  Submit
                </Button>
              </Form>
            </Jumbotron>
          </Col>
        </Row>
      </div>
    );
  }
}

export default CardLinks;
