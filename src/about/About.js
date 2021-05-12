import React,{Component} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class About extends Component {
    constructor(){
        super();

    }


    render(){
        return(
            <Container>
              <Row className="mt-3">
                <Col>
                  <h5>This is Seolynn.</h5>
                  <p>Our names are: Jamie and Sumi.</p>
                  <p>Our main goal is to offer motivation to online students learning Japanese, Korean, and web development through remote means to help learners grow and develop.
                  Learning without motivation is impossible.
                  </p>
                  <p>Often we begin our studies with great ethiusaium, then after some time we hit a dead end. We get burned out. We get that feeling
                  of, "well I don't feel like it right now." We have nobody to learn with. We have no real reason to learn and apply what we learned. And our fundalmetals are still weak and
                  this hurts our self-esteem. We know these issues.
                  </p>
                  <p>
                  Both of us have experience learning foreign languages, web development, electronics, accounting, and many other things. Learning Japanese for me never really went anywhere.
                  I'm still terible at Japanese. I never had a reason to use it, had low self-esteem in my Japanese ablitly, and have been burned out ever since taking Japanese in university.
                  </p>
                  <p>My Korean on the other hand is better, but now days I have no reason to use Korean. I no longer live in Korea! Same story for my web development skills. As many developers know,
                  it's really hard to get your foot in the door into Web development! I'm still working a non-development job and I have been learning online for nearly 5 years!!! </p>
                  <p>Through my own experience, I know I must change the tables. I need a reason to learn and apply what I've been studying and nobody is going to just hand me the Opportunities!
                  I need to build that Opportunity myself. This is what Seolynn is. An online site and community aimed at helping others in the same situation as me.</p>
                  <p>Watch me as I re-learn Japanese and Korean. Watch me as I add new features to this site and build how-to articles for tricky web-development issues. Watch me struggle, but learn from me
                  and apply it to your life. Here at Seolynn we offer the motivation to keep going.
                  </p>
                </Col>
              </Row>
            </Container>
        )
    }
}
