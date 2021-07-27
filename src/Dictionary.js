import React from 'react';
import './App.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


class Dictionary extends React.Component {
  render() {
    return (
      <div id='card-dictionary'>
        {
          this.props.displayDictionary ?
            <Row id="toggleDict">
              <Col xs={12} className="my-4">
                <Card>
                  <Card.Header as="h5">Dictionary (Only use when stuck!)</Card.Header>
                  <Card.Body>
                    <Row>
                      <Col xs={6}>
                          <Button variant="primary" onClick={ this.props.showDictionary } > Hide Answer </Button>
                      </Col>
                      <Col xs={6}>
                        {this.props.currentKanji &&
                          <>
                            <h5>{ this.props.currentKanji } : { this.props.currentKana }</h5>
                            <h5>English Meaning : { this.props.currentEnglish } </h5>
                          </>
                        }
                        { !this.props.currentKanji &&
                          <h5>{ this.props.currentKana } : { this.props.currentEnglish }</h5>
                        }
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          :
          <Row id="toggleDict">
            <Col xs={12} className="my-4">
              <Card>
                <Card.Header as="h5">Dictionary (Only use when stuck!)</Card.Header>
                <Card.Body>
                  <Row>
                    <Col xs={6}>
                        <Button variant="primary" onClick={ this.props.showDictionary } > Show Answer </Button>
                    </Col>
                    <Col xs={6}>

                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        }

      </div>
    );
  }
}

export default Dictionary;
