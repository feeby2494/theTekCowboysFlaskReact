import React,{Component, useState} from 'react';
import {Row, Col} from 'react-bootstrap';

const RowWithHeading = (props) => {
    return (
        <>
            <Row>
                <Col xs={12}>
                <hr className="my-4">
                </hr>
                </Col>
                <Col xs={12}>
                <h2 className="w-100 text-center">
                    {props.componentHeading}
                </h2>
                </Col>
                <Col xs={12}>
                <hr className="my-4">
                </hr>
                </Col>
            </Row>
        </>
    )
}

export default RowWithHeading;
