import React from 'react';
import './App.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

class VocabList extends React.Component {
  render() {

    return (
      <div id='card-list'>

        {
          this.props.displayList ?

            <Row id="toggleCardList">
              <Col xs={12} className="my-4">

                <Card>
                  <Card.Header as="h5">List of Vocab</Card.Header>
                  <Card.Body>
                    <Button variant="primary" onClick={ this.props.showList } > Hide Cards </Button>
                  </Card.Body>
                </Card>
              </Col>
              {
                this.props.cardList.map((word) => {
                  return (
                      <Col xs={12} sm={6} lg={4} className="my-2">
                        <Card className="text-center bg-light">
                          <Card.Body>
                            <Card.Text>
                              <h3>{word.kanji}</h3>
                              <h5>{word.kana}</h5>
                              <h5>{word.eng}</h5>
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                  );
                })
              }
            </Row>
          :
            <Row id="toggleCardList">
              <Col xs={12} className="my-4">
                <Card>
                  <Card.Header as="h5">List of Vocab</Card.Header>
                  <Card.Body>
                    <Button variant="primary" onClick={ this.props.showList } > Show Cards </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
        }

      </div>
    );

  }
}

export default VocabList;
