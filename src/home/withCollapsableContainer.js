import React from 'react';
import { Row, Button, Card } from 'react-bootstrap';

export function withCollapsableContainer(OriginalReactComponent) {

    return class extends React.Component {
 
       // we can make some enhancements here
 
       
 
       render() {
 
        return (
            <Card className='row mt-3'>
                <Card.Header>
                    <h2 className='h2 text-center my-2'>{this.props.componentTitle}</h2>
                    
                </Card.Header>
                <Card.Body>
                    <Button  role="button" onClick={this.props.handleShowContent}>{this.props.button_text}</Button>
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

export default withCollapsableContainer;