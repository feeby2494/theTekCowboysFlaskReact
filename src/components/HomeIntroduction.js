import { Row, ListGroup, Button, Col } from "react-bootstrap";

export const HomeIntroduction = (props) => {

  return (
    <Row className="mt-3" >
        <Col md="6">
          <h2>Welcome to Seolynn. </h2>
          <p>
              We are located in Coppell, Tx and open to mail-in repairs from across the country. We can work on phones, tablets, laptops, Macbooks, and motherboards.
              We also do web apps specializing in Python and Javascript stacks. If interested, then start out by filling out the form below!
          </p>
        </Col>
        <Col md="6">
          <h3>Special Offers:</h3>
          <a href={props.linkEbayMBBoards}><Button className="mb-2" variant="success">$150 Macbook Board Repairs on Ebay!</Button></a>
          <a href={props.linkEbayIPBoards}><Button className="mb-2" variant="success">$80 iPad Board Repairs on Ebay!</Button></a>
          <a href={props.linkEbayIPCP}><Button className="mb-2" variant="success">$65 iPad Charging Port Repairs on Ebay!</Button></a>
          <a href={props.linkEbayIPTS}><Button variant="success">$80 iPad Tristar Replacement on Ebay!</Button></a>
        </Col>   
    </Row>
  );
}

