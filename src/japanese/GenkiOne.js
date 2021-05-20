import React,{Component} from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Modal from 'react-bootstrap/Modal';
import NumberModal from './NumberModal';
import HourModal from './HourModal';

export default class GenkiOne extends Component {
  constructor(props){
      super(props);
    this.state = {
      showHome: true,
      showCh1: false,
      showCh2: false,
      showCh3: false,
      showCh4: false,
      showCh5: false,
      showCh6: false,
      showCh7: false,
      showCh8: false,
      showCh9: false,
      showCh10: false,
      showCh11: false,
      showCh12: false,
      showNumbersModal: false,
      showTimeModal: false,

    }
    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
  }

  handleTabChange(event) {
  if( this.state.hasOwnProperty(`show${event.target.id}`)) {
    let tabName = `show${event.target.id}`;
    console.log(tabName);
    this.setState({
      showHome: false,
      showCh1: false,
      showCh2: false,
      showCh3: false,
      showCh4: false,
      showCh5: false,
      showCh6: false,
      showCh7: false,
      showCh8: false,
      showCh9: false,
      showCh10: false,
      showCh11: false,
      showCh12: false,
    }, () => {

      this.setState({
        [tabName]: true
      });
    });
  }

  }
  handleClose(event) {
    let properyName = `show${event.target.id}Modal`;
    this.setState({
      [properyName]: false,
    });
  }
  handleShow(event) {
    let properyName = `show${event.target.id}Modal`;
    this.setState({
      [properyName]: true,
    });
    console.log(document.getElementById(`${event.target.id.toLowerCase()}Modal`))


  }

  render(){
    return(
      <Card>
        <Card.Header>
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" >
              <a className="nav-link active" id="Home" onClick={this.handleTabChange}  data-toggle="tab" href="#home" role="tab" aria-controls="homeTab" aria-selected="true">Home</a>
            </li>
            <li className="nav-item" >
              <a className="nav-link" id="Ch1" onClick={this.handleTabChange}  data-toggle="tab" href="#ch1" role="tab" aria-controls="ch1Tab" aria-selected="false">Chapter 1</a>
            </li>
            <li className="nav-item" >
              <a className="nav-link" id="Ch2" onClick={this.handleTabChange}  data-toggle="tab" href="#ch2" role="tab" aria-controls="ch2Tab" aria-selected="false">Chapter 2</a>
            </li>
            <li className="nav-item" >
              <a className="nav-link" id="Ch3" onClick={this.handleTabChange}  data-toggle="tab" href="#ch3" role="tab" aria-controls="ch3Tab" aria-selected="false">Chapter 3</a>
            </li>
            <li className="nav-item" >
              <a className="nav-link" id="Ch4" onClick={this.handleTabChange}  data-toggle="tab" href="#ch4" role="tab" aria-controls="ch4Tab" aria-selected="false">Chapter 4</a>
            </li>
            <li className="nav-item" >
              <a className="nav-link" id="Ch5" onClick={this.handleTabChange}  data-toggle="tab" href="#ch5" role="tab" aria-controls="ch5Tab" aria-selected="false">Chapter 5</a>
            </li>
            <li className="nav-item" >
              <a className="nav-link" id="Ch6" onClick={this.handleTabChange}  data-toggle="tab" href="#ch6" role="tab" aria-controls="ch6Tab" aria-selected="false">Chapter 6</a>
            </li>
            <li className="nav-item" >
              <a className="nav-link" id="Ch7" onClick={this.handleTabChange}  data-toggle="tab" href="#ch7" role="tab" aria-controls="ch7Tab" aria-selected="false">Chapter 7</a>
            </li>
            <li className="nav-item" >
              <a className="nav-link" id="Ch8" onClick={this.handleTabChange}  data-toggle="tab" href="#ch8" role="tab" aria-controls="ch8Tab" aria-selected="false">Chapter 8</a>
            </li>
            <li className="nav-item" >
              <a className="nav-link" id="Ch9" onClick={this.handleTabChange}  data-toggle="tab" href="#ch9" role="tab" aria-controls="ch9Tab" aria-selected="false">Chapter 9</a>
            </li>
            <li className="nav-item" >
              <a className="nav-link" id="Ch10" onClick={this.handleTabChange}  data-toggle="tab" href="#ch10" role="tab" aria-controls="ch10Tab" aria-selected="false">Chapter 10</a>
            </li>
            <li className="nav-item" >
              <a className="nav-link" id="Ch11" onClick={this.handleTabChange}  data-toggle="tab" href="#ch11" role="tab" aria-controls="ch11Tab" aria-selected="false">Chapter 11</a>
            </li>
            <li className="nav-item" >
              <a className="nav-link" id="Ch12" onClick={this.handleTabChange}  data-toggle="tab" href="#ch12" role="tab" aria-controls="ch12Tab" aria-selected="false">Chapter 12</a>
            </li>
          </ul>
        </Card.Header>
        <Card.Body>
          <Row>
            { this.state.showHome && (
              <Col>
                <h5>Welcome to Genki 1 Grammar Summary!</h5>
                <p> I made this to quickly look up grammar I learned from my first Japanese class in university. This is a reference and summary only!</p>
                <a href='#'>Please go out and get this book! It's the best Japanese textbook for beginners.</a>
              </Col>

            )}
            { this.state.showCh1 && (
              <Container>
                <h3>Chapter 1</h3>
                <div className="row">
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">X は Y です。 </div>
                    <div className="card-body text-info">
                      <h5 className="card-title text-center">〜です。 It is...</h5>
                      <h5 className="card-title text-center">XはYです。 X is Y. As for X, it is Y.</h5>
                      <hr />
                      <p className="card-text">学生（がくせい）です。</p>
                      <p className="card-text">私（わたし）はスー・キムです。</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">{'Making Questions => か。'}</div>
                    <div className="card-body text-info">
                      <h5 className="card-title text-center">……か。 What is... Who is/are... Are you... etc...</h5>
                      <hr />
                      <p className="card-text">留学生（りゅうがくせい）ですか。</p>
                      <p className="card-text">はい、留学生です。 Or ええい、留学生じゃないです。</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">noun-1 の noun-2</div>
                    <div className="card-body text-info">
                      <h5 className="card-title text-center">Noun1(further restriction) の Noun2(main ideal)</h5>
                      <hr />
                      <p className="card-text">たけしさんのお母さん（おかあさん）は高校（こうこう）の先生（せんせい）です。</p>
                      <p className="card-text">日本語（にほんご）の学生（がくせい）</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">数字（すいじ）Numbers</div>
                    <div className="card-body text-info text-center">
                      <li class="list-group-item list-group-item-info">0 ゼロ／れい</li>
                      <li class="list-group-item list-group-item-light">1 いち 一</li>
                      <li class="list-group-item list-group-item-info">2 に 二</li>
                    </div>
                    <div className="card-footer text-info">
                    {/* Button trigger modal for numbers */}
                    <NumberModal />
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">字間（じかん）Time</div>
                    <div className="card-body text-info text-center">
                      <li className="list-group-item list-group-item-info">1:00 いちじ 一時</li>
                      <li className="list-group-item list-group-item-light">2:00 にじ 二時</li>
                      <li className="list-group-item list-group-item-info">3:00 さんじ 三時</li>
                    </div>
                    <div className="card-footer text-info">
                      <HourModal />
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">表現ノート（ひょうげんノート）Expression Notes</div>
                    <div className="card-body text-info">

                    </div>
                  </div>
                </div>



              </Container>

            )}
            { this.state.showCh2 && (
              <Container>
                <h3>Chapter 1</h3>
                <div className="row">
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">X は Y です。 </div>
                    <div className="card-body text-info">
                      <h5 className="card-title text-center">〜です。 It is...</h5>
                      <h5 className="card-title text-center">XはYです。 X is Y. As for X, it is Y.</h5>
                      <hr />
                      <p className="card-text">学生（がくせい）です。</p>
                      <p className="card-text">私（わたし）はスー・キムです。</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">{'Making Questions => か。'}</div>
                    <div className="card-body text-info">
                      <h5 className="card-title text-center">……か。 What is... Who is/are... Are you... etc...</h5>
                      <hr />
                      <p className="card-text">留学生（りゅうがくせい）ですか。</p>
                      <p className="card-text">はい、留学生です。 Or ええい、留学生じゃないです。</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">noun-1 の noun-2</div>
                    <div className="card-body text-info">
                      <h5 className="card-title text-center">Noun1(further restriction) の Noun2(main ideal)</h5>
                      <hr />
                      <p className="card-text">たけしさんのお母さん（おかあさん）は高校（こうこう）の先生（せんせい）です。</p>
                      <p className="card-text">日本語（にほんご）の学生（がくせい）</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">数字（すいじ）Numbers</div>
                    <div className="card-body text-info">
                      <h5 className="card-title">Info card title</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">字間（じかん）Time</div>
                    <div className="card-body text-info">
                      <h5 className="card-title">Info card title</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">表現ノート（ひょうげんノート）Expression Notes</div>
                    <div className="card-body text-info">
                      <h5 className="card-title">Info card title</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                  </div>
                </div>
              </Container>
            )}
            { this.state.showCh3 && (
              <Container>
                <h3>Chapter 1</h3>
                <div className="row">
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">X は Y です。 </div>
                    <div className="card-body text-info">
                      <h5 className="card-title text-center">〜です。 It is...</h5>
                      <h5 className="card-title text-center">XはYです。 X is Y. As for X, it is Y.</h5>
                      <hr />
                      <p className="card-text">学生（がくせい）です。</p>
                      <p className="card-text">私（わたし）はスー・キムです。</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">{'Making Questions => か。'}</div>
                    <div className="card-body text-info">
                      <h5 className="card-title text-center">……か。 What is... Who is/are... Are you... etc...</h5>
                      <hr />
                      <p className="card-text">留学生（りゅうがくせい）ですか。</p>
                      <p className="card-text">はい、留学生です。 Or ええい、留学生じゃないです。</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">noun-1 の noun-2</div>
                    <div className="card-body text-info">
                      <h5 className="card-title text-center">Noun1(further restriction) の Noun2(main ideal)</h5>
                      <hr />
                      <p className="card-text">たけしさんのお母さん（おかあさん）は高校（こうこう）の先生（せんせい）です。</p>
                      <p className="card-text">日本語（にほんご）の学生（がくせい）</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">数字（すいじ）Numbers</div>
                    <div className="card-body text-info">
                      <h5 className="card-title">Info card title</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">字間（じかん）Time</div>
                    <div className="card-body text-info">
                      <h5 className="card-title">Info card title</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">表現ノート（ひょうげんノート）Expression Notes</div>
                    <div className="card-body text-info">
                      <h5 className="card-title">Info card title</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                  </div>
                </div>
              </Container>
            )}
            { this.state.showCh4 && (
              <Container>
                <h3>Chapter 1</h3>
                <div className="row">
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">X は Y です。 </div>
                    <div className="card-body text-info">
                      <h5 className="card-title text-center">〜です。 It is...</h5>
                      <h5 className="card-title text-center">XはYです。 X is Y. As for X, it is Y.</h5>
                      <hr />
                      <p className="card-text">学生（がくせい）です。</p>
                      <p className="card-text">私（わたし）はスー・キムです。</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">{'Making Questions => か。'}</div>
                    <div className="card-body text-info">
                      <h5 className="card-title text-center">……か。 What is... Who is/are... Are you... etc...</h5>
                      <hr />
                      <p className="card-text">留学生（りゅうがくせい）ですか。</p>
                      <p className="card-text">はい、留学生です。 Or ええい、留学生じゃないです。</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">noun-1 の noun-2</div>
                    <div className="card-body text-info">
                      <h5 className="card-title text-center">Noun1(further restriction) の Noun2(main ideal)</h5>
                      <hr />
                      <p className="card-text">たけしさんのお母さん（おかあさん）は高校（こうこう）の先生（せんせい）です。</p>
                      <p className="card-text">日本語（にほんご）の学生（がくせい）</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">数字（すいじ）Numbers</div>
                    <div className="card-body text-info">
                      <h5 className="card-title">Info card title</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">字間（じかん）Time</div>
                    <div className="card-body text-info">
                      <h5 className="card-title">Info card title</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">表現ノート（ひょうげんノート）Expression Notes</div>
                    <div className="card-body text-info">
                      <h5 className="card-title">Info card title</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                  </div>
                </div>
              </Container>
            )}
            { this.state.showCh5 && (
              <Container>
                <h3>Chapter 1</h3>
                <div className="row">
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">X は Y です。 </div>
                    <div className="card-body text-info">
                      <h5 className="card-title text-center">〜です。 It is...</h5>
                      <h5 className="card-title text-center">XはYです。 X is Y. As for X, it is Y.</h5>
                      <hr />
                      <p className="card-text">学生（がくせい）です。</p>
                      <p className="card-text">私（わたし）はスー・キムです。</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">{'Making Questions => か。'}</div>
                    <div className="card-body text-info">
                      <h5 className="card-title text-center">……か。 What is... Who is/are... Are you... etc...</h5>
                      <hr />
                      <p className="card-text">留学生（りゅうがくせい）ですか。</p>
                      <p className="card-text">はい、留学生です。 Or ええい、留学生じゃないです。</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">noun-1 の noun-2</div>
                    <div className="card-body text-info">
                      <h5 className="card-title text-center">Noun1(further restriction) の Noun2(main ideal)</h5>
                      <hr />
                      <p className="card-text">たけしさんのお母さん（おかあさん）は高校（こうこう）の先生（せんせい）です。</p>
                      <p className="card-text">日本語（にほんご）の学生（がくせい）</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">数字（すいじ）Numbers</div>
                    <div className="card-body text-info">
                      <h5 className="card-title">Info card title</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">字間（じかん）Time</div>
                    <div className="card-body text-info">
                      <h5 className="card-title">Info card title</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">表現ノート（ひょうげんノート）Expression Notes</div>
                    <div className="card-body text-info">
                      <h5 className="card-title">Info card title</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                  </div>
                </div>
              </Container>
            )}
            { this.state.showCh6 && (
              <Container>
                <h3>Chapter 1</h3>
                <div className="row">
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">X は Y です。 </div>
                    <div className="card-body text-info">
                      <h5 className="card-title text-center">〜です。 It is...</h5>
                      <h5 className="card-title text-center">XはYです。 X is Y. As for X, it is Y.</h5>
                      <hr />
                      <p className="card-text">学生（がくせい）です。</p>
                      <p className="card-text">私（わたし）はスー・キムです。</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">{'Making Questions => か。'}</div>
                    <div className="card-body text-info">
                      <h5 className="card-title text-center">……か。 What is... Who is/are... Are you... etc...</h5>
                      <hr />
                      <p className="card-text">留学生（りゅうがくせい）ですか。</p>
                      <p className="card-text">はい、留学生です。 Or ええい、留学生じゃないです。</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">noun-1 の noun-2</div>
                    <div className="card-body text-info">
                      <h5 className="card-title text-center">Noun1(further restriction) の Noun2(main ideal)</h5>
                      <hr />
                      <p className="card-text">たけしさんのお母さん（おかあさん）は高校（こうこう）の先生（せんせい）です。</p>
                      <p className="card-text">日本語（にほんご）の学生（がくせい）</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">数字（すいじ）Numbers</div>
                    <div className="card-body text-info">
                      <h5 className="card-title">Info card title</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">字間（じかん）Time</div>
                    <div className="card-body text-info">
                      <h5 className="card-title">Info card title</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">表現ノート（ひょうげんノート）Expression Notes</div>
                    <div className="card-body text-info">
                      <h5 className="card-title">Info card title</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                  </div>
                </div>
              </Container>
            )}
            { this.state.showCh7 && (
              <Container>
                <h3>Chapter 1</h3>
                <div className="row">
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">X は Y です。 </div>
                    <div className="card-body text-info">
                      <h5 className="card-title text-center">〜です。 It is...</h5>
                      <h5 className="card-title text-center">XはYです。 X is Y. As for X, it is Y.</h5>
                      <hr />
                      <p className="card-text">学生（がくせい）です。</p>
                      <p className="card-text">私（わたし）はスー・キムです。</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">{'Making Questions => か。'}</div>
                    <div className="card-body text-info">
                      <h5 className="card-title text-center">……か。 What is... Who is/are... Are you... etc...</h5>
                      <hr />
                      <p className="card-text">留学生（りゅうがくせい）ですか。</p>
                      <p className="card-text">はい、留学生です。 Or ええい、留学生じゃないです。</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">noun-1 の noun-2</div>
                    <div className="card-body text-info">
                      <h5 className="card-title text-center">Noun1(further restriction) の Noun2(main ideal)</h5>
                      <hr />
                      <p className="card-text">たけしさんのお母さん（おかあさん）は高校（こうこう）の先生（せんせい）です。</p>
                      <p className="card-text">日本語（にほんご）の学生（がくせい）</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">数字（すいじ）Numbers</div>
                    <div className="card-body text-info">
                      <h5 className="card-title">Info card title</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">字間（じかん）Time</div>
                    <div className="card-body text-info">
                      <h5 className="card-title">Info card title</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">表現ノート（ひょうげんノート）Expression Notes</div>
                    <div className="card-body text-info">
                      <h5 className="card-title">Info card title</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                  </div>
                </div>
              </Container>
            )}
            { this.state.showCh8 && (
              <Container>
                <h3>Chapter 1</h3>
                <div className="row">
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">X は Y です。 </div>
                    <div className="card-body text-info">
                      <h5 className="card-title text-center">〜です。 It is...</h5>
                      <h5 className="card-title text-center">XはYです。 X is Y. As for X, it is Y.</h5>
                      <hr />
                      <p className="card-text">学生（がくせい）です。</p>
                      <p className="card-text">私（わたし）はスー・キムです。</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">{'Making Questions => か。'}</div>
                    <div className="card-body text-info">
                      <h5 className="card-title text-center">……か。 What is... Who is/are... Are you... etc...</h5>
                      <hr />
                      <p className="card-text">留学生（りゅうがくせい）ですか。</p>
                      <p className="card-text">はい、留学生です。 Or ええい、留学生じゃないです。</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">noun-1 の noun-2</div>
                    <div className="card-body text-info">
                      <h5 className="card-title text-center">Noun1(further restriction) の Noun2(main ideal)</h5>
                      <hr />
                      <p className="card-text">たけしさんのお母さん（おかあさん）は高校（こうこう）の先生（せんせい）です。</p>
                      <p className="card-text">日本語（にほんご）の学生（がくせい）</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">数字（すいじ）Numbers</div>
                    <div className="card-body text-info">
                      <h5 className="card-title">Info card title</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">字間（じかん）Time</div>
                    <div className="card-body text-info">
                      <h5 className="card-title">Info card title</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">表現ノート（ひょうげんノート）Expression Notes</div>
                    <div className="card-body text-info">
                      <h5 className="card-title">Info card title</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                  </div>
                </div>
              </Container>
            )}
            { this.state.showCh9 && (
              <Container>
                <h3>Chapter 1</h3>
                <div className="row">
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">X は Y です。 </div>
                    <div className="card-body text-info">
                      <h5 className="card-title text-center">〜です。 It is...</h5>
                      <h5 className="card-title text-center">XはYです。 X is Y. As for X, it is Y.</h5>
                      <hr />
                      <p className="card-text">学生（がくせい）です。</p>
                      <p className="card-text">私（わたし）はスー・キムです。</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">{'Making Questions => か。'}</div>
                    <div className="card-body text-info">
                      <h5 className="card-title text-center">……か。 What is... Who is/are... Are you... etc...</h5>
                      <hr />
                      <p className="card-text">留学生（りゅうがくせい）ですか。</p>
                      <p className="card-text">はい、留学生です。 Or ええい、留学生じゃないです。</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">noun-1 の noun-2</div>
                    <div className="card-body text-info">
                      <h5 className="card-title text-center">Noun1(further restriction) の Noun2(main ideal)</h5>
                      <hr />
                      <p className="card-text">たけしさんのお母さん（おかあさん）は高校（こうこう）の先生（せんせい）です。</p>
                      <p className="card-text">日本語（にほんご）の学生（がくせい）</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">数字（すいじ）Numbers</div>
                    <div className="card-body text-info">
                      <h5 className="card-title">Info card title</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">字間（じかん）Time</div>
                    <div className="card-body text-info">
                      <h5 className="card-title">Info card title</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">表現ノート（ひょうげんノート）Expression Notes</div>
                    <div className="card-body text-info">
                      <h5 className="card-title">Info card title</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                  </div>
                </div>
              </Container>
            )}
            { this.state.showCh10 && (
              <Container>
                <h3>Chapter 1</h3>
                <div className="row">
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">X は Y です。 </div>
                    <div className="card-body text-info">
                      <h5 className="card-title text-center">〜です。 It is...</h5>
                      <h5 className="card-title text-center">XはYです。 X is Y. As for X, it is Y.</h5>
                      <hr />
                      <p className="card-text">学生（がくせい）です。</p>
                      <p className="card-text">私（わたし）はスー・キムです。</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">{'Making Questions => か。'}</div>
                    <div className="card-body text-info">
                      <h5 className="card-title text-center">……か。 What is... Who is/are... Are you... etc...</h5>
                      <hr />
                      <p className="card-text">留学生（りゅうがくせい）ですか。</p>
                      <p className="card-text">はい、留学生です。 Or ええい、留学生じゃないです。</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">noun-1 の noun-2</div>
                    <div className="card-body text-info">
                      <h5 className="card-title text-center">Noun1(further restriction) の Noun2(main ideal)</h5>
                      <hr />
                      <p className="card-text">たけしさんのお母さん（おかあさん）は高校（こうこう）の先生（せんせい）です。</p>
                      <p className="card-text">日本語（にほんご）の学生（がくせい）</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">数字（すいじ）Numbers</div>
                    <div className="card-body text-info">
                      <h5 className="card-title">Info card title</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">字間（じかん）Time</div>
                    <div className="card-body text-info">
                      <h5 className="card-title">Info card title</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">表現ノート（ひょうげんノート）Expression Notes</div>
                    <div className="card-body text-info">
                      <h5 className="card-title">Info card title</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                  </div>
                </div>
              </Container>
            )}
            { this.state.showCh11 && (
              <Container>
                <h3>Chapter 1</h3>
                <div className="row">
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">X は Y です。 </div>
                    <div className="card-body text-info">
                      <h5 className="card-title text-center">〜です。 It is...</h5>
                      <h5 className="card-title text-center">XはYです。 X is Y. As for X, it is Y.</h5>
                      <hr />
                      <p className="card-text">学生（がくせい）です。</p>
                      <p className="card-text">私（わたし）はスー・キムです。</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">{'Making Questions => か。'}</div>
                    <div className="card-body text-info">
                      <h5 className="card-title text-center">……か。 What is... Who is/are... Are you... etc...</h5>
                      <hr />
                      <p className="card-text">留学生（りゅうがくせい）ですか。</p>
                      <p className="card-text">はい、留学生です。 Or ええい、留学生じゃないです。</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">noun-1 の noun-2</div>
                    <div className="card-body text-info">
                      <h5 className="card-title text-center">Noun1(further restriction) の Noun2(main ideal)</h5>
                      <hr />
                      <p className="card-text">たけしさんのお母さん（おかあさん）は高校（こうこう）の先生（せんせい）です。</p>
                      <p className="card-text">日本語（にほんご）の学生（がくせい）</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">数字（すいじ）Numbers</div>
                    <div className="card-body text-info">
                      <h5 className="card-title">Info card title</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">字間（じかん）Time</div>
                    <div className="card-body text-info">
                      <h5 className="card-title">Info card title</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">表現ノート（ひょうげんノート）Expression Notes</div>
                    <div className="card-body text-info">
                      <h5 className="card-title">Info card title</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                  </div>
                </div>
              </Container>
            )}
            { this.state.showCh12 && (
              <Container>
                <h3>Chapter 1</h3>
                <div className="row">
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">X は Y です。 </div>
                    <div className="card-body text-info">
                      <h5 className="card-title text-center">〜です。 It is...</h5>
                      <h5 className="card-title text-center">XはYです。 X is Y. As for X, it is Y.</h5>
                      <hr />
                      <p className="card-text">学生（がくせい）です。</p>
                      <p className="card-text">私（わたし）はスー・キムです。</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">{'Making Questions => か。'}</div>
                    <div className="card-body text-info">
                      <h5 className="card-title text-center">……か。 What is... Who is/are... Are you... etc...</h5>
                      <hr />
                      <p className="card-text">留学生（りゅうがくせい）ですか。</p>
                      <p className="card-text">はい、留学生です。 Or ええい、留学生じゃないです。</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">noun-1 の noun-2</div>
                    <div className="card-body text-info">
                      <h5 className="card-title text-center">Noun1(further restriction) の Noun2(main ideal)</h5>
                      <hr />
                      <p className="card-text">たけしさんのお母さん（おかあさん）は高校（こうこう）の先生（せんせい）です。</p>
                      <p className="card-text">日本語（にほんご）の学生（がくせい）</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">数字（すいじ）Numbers</div>
                    <div className="card-body text-info">
                      <h5 className="card-title">Info card title</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">字間（じかん）Time</div>
                    <div className="card-body text-info">
                      <h5 className="card-title">Info card title</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">表現ノート（ひょうげんノート）Expression Notes</div>
                    <div className="card-body text-info">
                      <h5 className="card-title">Info card title</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                  </div>
                </div>
              </Container>
            )}
          </Row>
        </Card.Body>
      </Card>
      );
    }
}
