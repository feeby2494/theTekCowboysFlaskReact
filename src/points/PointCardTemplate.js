import React,{Component, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import '../App.css';

const pointCardTemplate = (props) => {


  return (
    <>
      { props.japaneseCard && Object.keys(props.japaneseCard).map((key, index) => {
          return (
            <Col md={4} className="my-2">
            <Card bg='light'>
              <Card.Header as="h5">{props.japaneseCard[key].title}</Card.Header>
              <Card.Body>
                <Card.Title>{props.japaneseCard[key].explanation}</Card.Title>
                <Card.Text>
                  {
                    props.japaneseCard[key].elements.map((el) => {
                      return (<Col>{el.text}</Col>);
                    })
                  }
                </Card.Text>
                <Button
                  onClick={ () => props.deletePoint(props.japaneseCard[key].id)}
                  id={props.japaneseCard[key].id}
                  variant="primary">
                    Delete Point
                </Button>
              </Card.Body>
              </Card>
            </Col>
          );
        })
      }
    </>
  );
}

export default pointCardTemplate;
