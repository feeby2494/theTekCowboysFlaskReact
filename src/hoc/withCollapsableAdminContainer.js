import React from 'react';
import { Row, Button, Card } from 'react-bootstrap';

export function withCollapsableAdminContainer(OriginalReactComponent) {

    return class extends React.Component {
 
       // we can make some enhancements here
 
       
 
       render() {
 
        return (
            <Card className='row mt-3 '>
                <Card.Body className='container align-items-center'>
                    <Row className='mb-1'>
                        <h2 className='h4 text-center my-2 col-md-6'>{this.props.componentTitle}</h2>
                        <Button className="col.md-6" variant="outline-danger" role="button" onClick={this.props.handleShowContent}>{this.props.button_text}</Button>
                    </Row>
                    
                
                    {
                        (this.props.showContent) && 
                        <>
                        <hr/>
                        <Row class="collapse" id={`collapse-${this.props.id_name}`}>

                            
                            <OriginalReactComponent {...this.props} />
                            
                        </Row>
                        </>
                    }
                </Card.Body>
            </Card>
        );
       }
 
    }
 
}

export default withCollapsableAdminContainer;