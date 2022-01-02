import React,{Component, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../App.css';

const AllPointsByFilter = (props) => {

  return (
          <Col lg={9}>
            { props.japaneseCard &&
              <Form as={Row} className="my-2" inline>
                <Form.Group as={Col} sm={12} lg={5} controlId="fromFilterLanguage">
                  <Form.Label
                    htmlFor="filterLanguage">
                      Language:
                  </Form.Label>
                  <Form.Control
                    as="select"
                    id="filterLanguage"
                    className="mx-sm-3"
                    onChange={props.handleChange}>
                      <option value="all">All languages</option>
                        {props.languagesList.map((item) => {
                          return (<option value={item}>{item}</option>);
                        })}
                  </Form.Control>
                </Form.Group>
                <Form.Group as={Col} sm={12} lg={5} controlId="formFilterCategory">
                  <Form.Label
                    htmlFor="filterLanguage">
                      Category:
                  </Form.Label>
                  <Form.Control
                    as="select"
                    id="filterCategory"
                    className="mx-sm-3"
                    onChange={props.handleChange}>
                      <option value="all">All categories</option>
                        {props.categoriesList.map((item) => {
                          return (<option value={item}>{item}</option>);
                        })}
                  </Form.Control>
                </Form.Group>
                <Col>
                  <Button sm={12} lg={2} onClick={props.getFilteredPoints} variant="success">Filter</Button>
                </Col>
              </Form>
            }
          </Col>
          );
}

export default AllPointsByFilter;
