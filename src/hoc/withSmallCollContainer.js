import React from 'react';
import { Row, Button, Card, Container } from 'react-bootstrap';

export function withSmallCollContainer(OriginalReactComponent) {

    return class extends React.Component {
 
       // we can make some enhancements here
 
       
 
       render() {
 
        return (
            <Card className='row mt-3'>
                <Card.Body className='container align-items-center'>   
                    <Row>
                        <h2 className='h4 mb-1 col-md-6 text-center'>{this.props.componentTitle}</h2>
                        <Button variant="info" className='col-md-6' role="button" onClick={this.props.handleShowContent}>{this.props.button_text}</Button>
                    </Row>
                    {
                        (this.props.showContent) && 
                        <Row class="collapse" id={`collapse-${this.props.id_name}`}>
                            
                            <OriginalReactComponent {...this.props} />
                            
                        </Row>
                    } 
                </Card.Body>
            </Card>
        );
       }
 
    }
 
}

export default withSmallCollContainer;