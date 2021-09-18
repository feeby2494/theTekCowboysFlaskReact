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
import MinutesModal from './MinutesModal';
import AgeModal from './AgeModal';
import CountingDaysModal from './CountingDaysModal';
import BigNumbersModal from './BigNumbersModal';

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
                    <div className="card-header text-center">分間 （ふんかん）Minutes</div>
                    <div className="card-body text-info">
                      <li className="list-group-item list-group-item-info">一分 いっぷん</li>
                      <li className="list-group-item list-group-item-light">二分 にふん</li>
                      <li className="list-group-item list-group-item-info">三分 さんぷん</li>
                    </div>
                    <div className="card-footer text-info">
                      <MinutesModal />
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">｡｡｡歳です。I'm ... years old.</div>
                    <div className="card-body text-info">
                      <h5 className="card-title text-center">〜さいです。＝＞ years old</h5>
                      <hr />
                      <p className="card-text">なんさいですか。おいくつですか。</p>
                      <p className="card-text">さんじゅうよんさいです。</p>
                    </div>
                    <div className="card-footer text-info">
                      <AgeModal />
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">日 ＝＞ Counting in days</div>
                    <div className="card-body text-info">
                      <li className="list-group-item list-group-item-info">
                        <div className="row">
                          <p className="col-6">
                            一日
                          </p>
                          <p className="col-6">
                            いちにち (ついたち/いっぴ)
                          </p>
                        </div>
                      </li>
                      <li className="list-group-item list-group-item-light">
                        <div className="row">
                          <p className="col-6">
                            二日
                          </p>
                          <p className="col-6">
                            ふつか
                          </p>
                        </div>
                      </li>
                    </div>
                    <div className="card-footer text-info">
                      <CountingDaysModal />
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">｡｡｡年｡｡｡月｡｡｡日 ＝＞ The date</div>
                    <div className="card-body text-info">

                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">表現ノート（ひょうげんノート）Expression Notes</div>
                    <div className="card-body text-info">

                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">Extra Links</div>
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
                    <div className="card-header text-center">これ それ あれ どれ</div>
                    <div className="card-body text-info">
                      <p className="card-title text-center">これは｡｡｡ This is... (this thing here)</p>
                      <p className="card-title text-center">それは｡｡｡ This is... (that thing infront of you)</p>
                      <p className="card-title text-center">あれは｡｡｡ That is... (that one over there)</p>
                      <p className="card-title text-center">どれは｡｡｡ Which one...</p>
                      <hr />
                      <p className="card-text">これはいくらですか。</p>
                      <p className="card-text">それはさんぜんえんです。</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">この／その／あの／どの ＋ Noun</div>
                    <div className="card-body text-info">
                    <p className="card-title text-center">このとけいは｡｡｡ This watch... (this watch here)</p>
                    <p className="card-title text-center">そのとけいは｡｡｡ This is... (that watch infront of you)</p>
                    <p className="card-title text-center">あのとけいは｡｡｡ That is... (that watch over there)</p>
                    <p className="card-title text-center">どのとけいは｡｡｡ Which watch...</p>
                      <hr />
                      <p className="card-text">このとけいはいくらですか。</p>
                      <p className="card-text">そのとけいはさんぜんえんです。</p>
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
                    <div className="card-header text-center">ここ／そこ／あそこ／どこ</div>
                    <div className="card-body text-info">
                      <p className="card-title text-center">ここ ＝＞ here, near me</p>
                      <p className="card-title text-center">そこ ＝＞ there, near you</p>
                      <p className="card-title text-center">あそこ ＝＞ over there</p>
                      <p className="card-title text-center">どこ ＝＞ where</p>
                      <hr />
                      <p className="card-text">すみません。郵便局（ゆうびんきょく）はどこですか。</p>
                      <p className="card-text">あそこです。</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">だれの noun</div>
                    <div className="card-body text-info">
                    <p className="card-title text-center">だれ ＝＞ who</p>
                    <p className="card-title text-center">だれの ＝＞ whose</p>
                    <hr />
                    <p className="card-text">これはだれのかばんですか。</p>
                    <p className="card-text">それはスーさんのかばんです。</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">noun も</div>
                    <div className="card-body text-info">
                    <p className="card-title text-center">A は X です。 A is X.</p>
                    <p className="card-title text-center">B も X です。 B too is X.</p>
                    <hr />
                    <p className="card-text">たけしさんは車（くるま）が好きです（すきです）。</p>
                    <p className="card-text">私（わたし）も車（くるま）が好きです（すきです）。</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">noun じゃないです。</div>
                    <div className="card-body text-info">
                    <p className="card-title text-center">X は Y です。 X is Y.</p>
                    <p className="card-title text-center">X は Y じゃないです。 X is not Y.</p>
                    <p className="card-title text-center">X は Y じゃありません。 X is not Y. （more conservative speech style）</p>
                    <p className="card-title text-center">X は Y ではありません。 X is not Y. （formal, appropriate for writing）</p>
                    <hr />
                    <p className="card-text">私（わたし）は学生（がくせい）じゃないです。</p>
                    <p className="card-text">私（わたし）は学生（がくせい）じゃありません。</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">〜ね／〜よ</div>
                    <div className="card-body text-info">
                    <p className="card-title text-center">If speaker seeks the listener's confirmation or agreement, then 〜ね is added to end of sentence. </p>
                    <p className="card-title text-center">If speaker seeks to assure the listener of what has been said (authoritative decree), then 〜よ is added to end of sentence.</p>
                    <hr />
                    <p className="card-text">彼（かれ）はばかですね。</p>
                    <p className="card-text">とんかつはさかなじゃないですよ。</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">すうじ</div>
                    <div className="card-body text-info">
                    <p className="card-title text-center"></p>
                    <p className="card-title text-center"></p>
                    <hr />
                    <p className="card-text"></p>

                    </div>
                    <div className="card-footer text-info">
                    {/* Button trigger modal for numbers */}
                    <BigNumbersModal />
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">表現（ひょうげん）ノート</div>
                    <div className="card-body text-info">
                    <p className="card-title text-center"></p>
                    <p className="card-title text-center"></p>
                    <hr />
                    <p className="card-text"></p>

                    </div>
                  </div>
                </div>
              </Container>
            )}
            { this.state.showCh3 && (
              <Container>
                <h3>Chapter 3</h3>
                <div className="row">
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">Verb Conjugation: Present Affirmative & Present Negative</div>
                    <div className="card-body text-info">
                      <h5 className="card-title text-center">食べる　＝＞　食べます；　食べません</h5>
                      <h5 className="card-title text-center">行く　＝＞　行きます；　行きません</h5>
                      <hr />
                      <h5 className="card-title text-center">Irregular Verbs:</h5>
                      <p className="card-text">する　＝＞　します；　しません</p>
                      <p className="card-text">来る　＝＞　来ます；　来ません</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">Verb Types and the "Present Tense"</div>
                    <div className="card-body text-info">
                      <h5 className="card-title text-center">1。A person habitually or regularly engages in these activities。</h5>
                      <h5 className="card-title text-center">2。A person will, or is planning to, perform these activities in the future.</h5>
                      <hr />
                      <p className="card-text">私はよく車を直します。　＝＞　I often work on my car.</p>
                      <p className="card-text">ヤコブは時々朝ごはんを食べません。</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">Particles</div>
                    <div className="card-body text-info">
                      <h5 className="card-title text-center"> を　＝＞　"direct object"; the kind of things that are directly involved in, or affected by, the event. </h5>
                      <h5 className="card-title text-center"> で　＝＞　where the event descirbed by the verb takes place. </h5>
                      <h5 className="card-title text-center"> に　＝＞　many meanings: (1) the goal toward which things move, (2) the time at which an event takes place. </h5>
                      <h5 className="card-title text-center"> へ　＝＞　same meaning as に　for case 1: the goal toward which things move </h5>
                      <hr />
                      <p className="card-text"></p>
                      <p className="card-text"></p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">Time Reference (Particles Required)</div>
                    <div className="card-body text-info">
                      <h5 className="card-title">　に　＝＞　(1) the days of the week like Sunday, (2) numerical time expressions like "at 3:00," and "in December."</h5>
                      <hr />
                      <p className="card-text">土曜日に教科書で勉強します。</p>

                      <p className="card-text">9月に売った商品が届きます。</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">Time Reference (Particles Not Allowed)</div>
                    <div className="card-body text-info">
                      <h5 className="card-title">Do not use "に"　in these situations: (1) time expressions defined relative to the present momment, such as "today" and "tomorrow."</h5>
                      <h5 className="card-title">(2) expressions describing regular intervals, such as "every day."</h5>
                      <h5 className="card-title">(3) the word for "when"</h5>
                      <p className="card-text">明日遊びます。</p>
                      <p className="card-text">毎日仕事に行くために七字十五分に起きます。</p>
                      <p className="card-text">いつ来ますか。</p>
                    </div>
                  </div>
                  <div className="card border-info mb-3 col-md-6 col-xl-4">
                    <div className="card-header text-center">ime Reference (Particles Are Optional)</div>
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
