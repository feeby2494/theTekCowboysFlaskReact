import React from 'react';
import { Row, Button, Card, Col } from 'react-bootstrap';

export function withSmallCollContainer(OriginalReactComponent) {

    return class extends React.Component {
 
       // we can make some enhancements here
 
       
 
       render() {
 
        return (
            <Card className='row mt-3 pb-3'>
                <Card.Body>    
                     <Row>
                        <h2 className='h4 mb-1 col-lg-6 text-center'>{this.props.componentTitle}</h2>
                        <Button variant="info" className='col-lg-6' role="button" onClick={this.props.handleShowContent}>{this.props.button_text}</Button>
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