import React from 'react';
import './App.css';
import VocabList from './VocabList';
import JapaneseInputWindow from './JapaneseInputWindow';
import CardLinks from './CardLinks';


import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as wanakana from 'wanakana';

class FlashCardSpace extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      japaneseCard: [
        {
          id: 0,
          kana: "ぜんぶ",
          eng: "all",
          kanji: "全部"
        },
        {
          id: 1,
          kana: "ズボン",
          eng: "pants",
          kanji: null
        },
        {
          id: 2,
          kana: "ゼロ",
          eng: "zero",
          kanji: null
        }
      ],
      input: '',
      questionId: null,
      answerKanji: '',
      answerKana: '',
      answerEng: '',
      correctArray: [],
      wrongArray: [],
      score: 0,
      finished: false,
      level: null,
      lesson: '',
      startingAgain: false,
      numberOfLessons: null,
      displayList: false,
      cardOrder: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
      cardOrderCounter: 0,
      nextIndex: 0
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleKanji = this.handleKanji.bind(this);
    this.handleKana = this.handleKana.bind(this);
    this.shuffleQuizOrder = this.shuffleQuizOrder.bind(this);
    this.selectNextCard = this.selectNextCard.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.getFlashCards = this.getFlashCards.bind(this);
    this.handleLevelChange = this.handleLevelChange.bind(this);
    this.handleLessonChange = this.handleLessonChange.bind(this);
    this.showList = this.showList.bind(this);
  }
  showList(event) {
    this.setState({
      displayList: !this.state.displayList
    });
  }
  handleChange(event) {
    this.setState({
      input: event.target.value
    },() => {
      return null;
    });
  }
  handleKanji(event) {
    // Using Wanakana made by Tofugo inc for English to Hiragana conversion; works great!!!
    this.setState({
      input: event.target.value
    },() => {
      let textInKana = wanakana.toKana( this.state.input, { IMEMode : true  });
      this.setState({
        input: textInKana
      })
    });
  }
  handleKana(event) {
    this.setState({
      input: event.target.value
    },() => {
      return null;
    });
  }
  selectNextCard(event) {

    this.setState({
      cardOrderCounter: this.state.cardOrderCounter + 1,
      nextIndex: this.state.cardOrder[this.state.cardOrderCounter],
      questionId: this.state.japaneseCard[this.state.cardOrder[this.state.cardOrderCounter]].id,
      answerKanji: this.state.japaneseCard[this.state.cardOrder[this.state.cardOrderCounter]].kanji,
      answerKana: this.state.japaneseCard[this.state.cardOrder[this.state.cardOrderCounter]].kana,
      answerEng: this.state.japaneseCard[this.state.cardOrder[this.state.cardOrderCounter]].eng,
    });

  }
  shuffleQuizOrder(originalArray){
    let temp;
    let randomIndex;

    // Using Fisher-Yates Shuffle Algorithm to make array of indexs for quiz cards in randomized order
    for(let i = originalArray.length; --i > 0; i--) {
      randomIndex = Math.floor(Math.random() * (i + 1));
      temp = originalArray[randomIndex];
      originalArray[randomIndex] = originalArray[i];
      originalArray[i] = temp;
    }

    return originalArray;

  }
  setQuizCardOrder(event) {
    let cardOrder = this.state.cardOrder;
    cardOrder = this.shuffleQuizOrder(cardOrder);
    this.setState({
      cardOrder: cardOrder
    });
  }


  checkAnswer(event) {
    const cards = this.state.japaneseCard;
    let idIsZero = (this.state.questionId === 0);
    let onlyOneLeft = (cards.length === 1);
    const randomNumber = this.state.randomNumber;

    if(this.state.nextIndex === this.state.cardOrder[18]) {
      this.setState({
          finished: true,
          cardOrderCounter: 0,
          nextIndex: 0,
          input: ''
        });
    } else {

//       handleMonthChange_next = () => {
//     this.setState({
//         currentMonth: +this.state.currentMonth + 1
//     }, () => {
//      this.props.getCalendarData(this.state.currentMonth)
//     })
// }
      // No Kanji in question - use English as answer (answerEng)
      if(!this.state.answerKanji) {
        if(this.state.input === this.state.answerEng) {
          // Trying to get this to work in the order I want!!!
          this.setState({
            correctArray: this.state.correctArray.concat(this.state.japaneseCard[this.state.questionId]),
          }, () => {
            // Trying to get this to do so after this.state.correctArray is finished updating
            // PREVIOUS CODE: onlyOneLeft ? [] : idIsZero ? cards.slice(this.state.randomNumber + 1) : cards.slice(0, this.state.randomNumber).concat(cards.slice(this.state.randomNumber + 1)),
            this.setState({
              score: this.state.score + 1,
              input: ''
            }, () => {
              // Want this to update last, but want it to render and update card!!! Not the same card again...
              this.selectNextCard();
              // this.setState({
              //   questionId: this.state.japaneseCard[randomNumber].id,
              //   answerKana: this.state.japaneseCard[randomNumber].kana,
              //   answerKanji: this.state.japaneseCard[randomNumber].kanji,
              //   answerEng: this.state.japaneseCard[randomNumber].eng
              // });
            });
          });
        } else {
          this.setState({
            wrongArray: this.state.wrongArray.concat(this.state.japaneseCard[this.state.questionId]),
            input: '',
          });
        }
      }
      // Kanji in question - use Hirakana or katakana as answer (answerKana)
      if(this.state.answerKanji) {
        if(this.state.input === this.state.answerKana ) {
          // Trying to get this to work in the order I want!!!
          this.setState({
            correctArray: this.state.correctArray.concat(this.state.japaneseCard[this.state.questionId]),
          }, () => {
            // Trying to get this to do so after this.state.correctArray is finished updating
            this.setState({
              score: this.state.score + 1,
              input: ''
            }, () => {
              // Want this to update last, but want it to render and update card!!! Not the same card again...
              this.selectNextCard();
              // this.setState({
              //   questionId: this.state.japaneseCard[randomNumber].id,
              //   answerKana: this.state.japaneseCard[randomNumber].kana,
              //   answerKanji: this.state.japaneseCard[randomNumber].kanji,
              //   answerEng: this.state.japaneseCard[randomNumber].eng
              // });
            });
          });
        } else {
          this.setState({
              wrongArray: this.state.wrongArray.concat(this.state.japaneseCard[this.state.questionId]),
              input: '',
            });
        }
      }
    }
  }
  handleLevelChange(event) {
    this.setState({
      level: event.target.value
    }, () => {
      fetch('/api/japanese/' + this.state.level + '/info')
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.setState({
            numberOfLessons: data
          });
        }
      )
    });
  }

  handleLessonChange(event) {
    this.setQuizCardOrder();
    this.setState({
      lesson: event.target.value,
      finished: false
    });
  }

  getFlashCards(event) {
    // first get info

      // use fetch to fetch cards from API
      fetch('/api/japanese/' + this.state.level + '/' + this.state.lesson)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.setState({
            japaneseCard: data,
            finished: false,
            input: '',
            score: 0
          }, () => {
            this.setState({
              questionId: this.state.japaneseCard[0].id,
              answerKana: this.state.japaneseCard[0].kana,
              answerKanji: this.state.japaneseCard[0].kanji,
              answerEng: this.state.japaneseCard[0].eng
            });
          });
        }
      );

    // Will get cards from API running on flask or node
    // flask api will have jwt
    // flask api will have different levels of JLPT vocab
    // will have different groups of ten to twenty words
    // have button to choose new group of words or to choose different levels
    // will have excel or csv import app to aid in adding words
    // will have login jwt and logout jwt
    // have api to add, delete, modify words
  }

  componentWillMount() {
    // This is recommended not to be used anymore and is being phased out in React

  }
  componentDidMount(){
    // Will get flashcards from API; Might have buttons with eventhandlers change flashcards too
    //this.getFlashCards;
  }
  render() {
    const noKanji = <h3>{ this.state.answerKana }</h3>;
    const hasKanji = <h3>{ this.state.answerKanji }</h3>;
    const finished = <h1> Finished! </h1>;

    return (
      <Container>
        <VocabList displayList={this.state.displayList} showList={this.showList} cardList={this.state.japaneseCard}/>
        <Row >
          <Col className="mt-4">
            <h2 className="text-center">Japanese Quizes</h2>
            <Jumbotron>
              <p className="text-center">Score: { this.state.score }</p>
              <h2 className="text-center">{ this.state.finished ? finished : this.state.answerKanji ? hasKanji : noKanji }</h2>

              <JapaneseInputWindow kanji={this.state.answerKanji} checkAnswer={this.checkAnswer} handleKanji={this.handleKanji} handleKana={this.handleKana} input={this.state.input}/>
              {
                this.state.answerKanji && <p>You need a Japanese keyboard for this.</p>
              }
              <Button onClick={this.getFlashCards}> Restart Quiz </Button>
            </Jumbotron>
          </Col>
        </Row>
        <CardLinks submitChanges={this.getFlashCards} handleLevelChange={this.handleLevelChange} handleLessonChange={this.handleLessonChange} level={this.state.level} numberOfLessons={this.state.numberOfLessons}/>
      </Container>
    );
  }
};

export default FlashCardSpace;
