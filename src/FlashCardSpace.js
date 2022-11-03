import React from 'react';
import './App.css';
import VocabList from './VocabList';
import JapaneseInputWindow from './JapaneseInputWindow';
import CardLinks from './CardLinks';
import Dictionary from './Dictionary';


import Button from 'react-bootstrap/Button';
// Not in bootstrap 5!
// import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as wanakana from 'wanakana';

class FlashCardSpace extends React.Component {
  constructor(props){
    super(props);
    this.inputFocus = React.createRef();
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
      displayDictionary: false,
      cardOrder: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
      cardOrderCounter: 0,
      nextIndex: 0,
      error: false,
      language: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleKanji = this.handleKanji.bind(this);
    this.handleKana = this.handleKana.bind(this);
    this.shuffleQuizOrder = this.shuffleQuizOrder.bind(this);
    this.selectNextCard = this.selectNextCard.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.getFlashCards = this.getFlashCards.bind(this);
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
    this.handleLevelChange = this.handleLevelChange.bind(this);
    this.handleLessonChange = this.handleLessonChange.bind(this);
    this.showList = this.showList.bind(this);
    this.showDictionary = this.showDictionary.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);

  }



  showList(event) {
    this.setState({
      displayList: !this.state.displayList
    });
  }
  showDictionary(event) {
    this.setState({
      displayDictionary: !this.state.displayDictionary
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
    }, () => {
      this.setState({
        nextIndex: this.state.cardOrder[this.state.cardOrderCounter],
        questionId: this.state.japaneseCard[this.state.cardOrder[this.state.cardOrderCounter]].id,
        answerKanji: this.state.japaneseCard[this.state.cardOrder[this.state.cardOrderCounter]].kanji,
        answerKana: this.state.japaneseCard[this.state.cardOrder[this.state.cardOrderCounter]].kana,
        answerEng: this.state.japaneseCard[this.state.cardOrder[this.state.cardOrderCounter]].eng,
      });
    });

  }
  shuffleQuizOrder(originalArray){
    let temp;
    let randomIndex;

    // Using Fisher-Yates Shuffle Algorithm to make array of indexs for quiz cards in randomized order
    for(let i = originalArray.length; --i > 0; i--) {
      // This was why the first card in the array was always set to zero index
      randomIndex = Math.floor(Math.random() * (i + 1));
      temp = originalArray[randomIndex];
      originalArray[randomIndex] = originalArray[i];
      originalArray[i] = temp;
    }

    return originalArray;

  }
  setQuizCardOrder(event) {
    let cardOrder = Array.from(Array(this.state.japaneseCard.length).keys());
    cardOrder = this.shuffleQuizOrder(cardOrder);
    console.log(`card order has been set: \n${cardOrder}`)
    this.setState({
      cardOrder: cardOrder,
      nextIndex: cardOrder[1]
    });
  }


  checkAnswer(event, clicked = true) {

    if(clicked === true){
      console.log('I was submited by clicking');
      this.inputFocus.current.focus();
    } else {
      console.log('I was submited by pressing enter key');
    }
    // if(this.inputFocus && this.inputFocus.current.focus()) {
    //   this.inputFocus.current.focus();
    // };

    if(this.state.nextIndex === this.state.cardOrder[this.state.japaneseCard.length - 1]) {
      this.setState({
          finished: true,
          cardOrderCounter: 0,
          nextIndex: 0,
          input: '',
          score: this.state.score + 1
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

        // This is where I need to use Regex match to make the matches easier; probably make new method for this.
        let answer_matched = new RegExp(`\\b(${this.state.input})\\b`, "gi")
        console.log()
        console.log(`The input matches the answer: ${answer_matched.test(this.state.answerEng)} \n the regex is: ${answer_matched} \n the answer is: ${this.state.answerEng}`)
        // if(this.state.input === this.state.answerEng) {
        if(new RegExp(`\\b(${this.state.input})\\b`, "gi").test(this.state.answerEng)) {
          // Trying to get this to work in the order I want!!!
          this.setState({
            correctArray: this.state.correctArray.concat(this.state.japaneseCard[this.state.questionId]),
          }, () => {
            // Trying to get this to do so after this.state.correctArray is finished updating
            // PREVIOUS CODE: onlyOneLeft ? [] : idIsZero ? cards.slice(this.state.randomNumber + 1) : cards.slice(0, this.state.randomNumber).concat(cards.slice(this.state.randomNumber + 1)),
            this.setState({
              score: this.state.score + 1,
              input: '',
              error: false
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
            error: true
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
              input: '',
              error: false
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
              error: true
            });
        }
      }
    }
  }

  handleLanguageChange(event) {
    this.setState({
      language: event.target.value,
      level: null,
      lesson: null
    });
  }

  handleLevelChange(event) {
    this.setState({
      level: event.target.value,
      lesson: null
    }, () => {

      fetch(`/api/${this.state.language}/${this.state.level}/info`, {
        method:'GET',
        headers: {'x-access-token': localStorage.getItem('token')}
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.setState({
            numberOfLessons: data
          });
        }
      );
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

      if(this.state.lesson === 'all'){
        fetch(`/api/${this.state.language}/${this.state.level}/all`, {
          method:'GET',
          headers: {'x-access-token': localStorage.getItem('token')}
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            this.setState({
              japaneseCard: data,
              finished: false,
              input: '',
              score: 0
            }, () => {
              cardOrder: this.setQuizCardOrder();
              this.setState({
                questionId: this.state.japaneseCard[0].id,
                answerKana: this.state.japaneseCard[0].kana,
                answerKanji: this.state.japaneseCard[0].kanji,
                answerEng: this.state.japaneseCard[0].eng
  
              });
            });
          }
        );
      } else {
        fetch(`/api/${this.state.language}/${this.state.level}/${this.state.lesson}`, {
          method:'GET',
          headers: {'x-access-token': localStorage.getItem('token')}
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            
            this.setState({
              japaneseCard: data,
              finished: false,
              input: '',
              score: 0,
            }, () => {
              this.setQuizCardOrder();   
            });
          }
        )
        .then(() => {
          this.setState({
            questionId: this.state.japaneseCard[this.state.cardOrder[0]].id,
            answerKana: this.state.japaneseCard[this.state.cardOrder[0]].kana,
            answerKanji: this.state.japaneseCard[this.state.cardOrder[0]].kanji,
            answerEng: this.state.japaneseCard[this.state.cardOrder[0]].eng

        });
        });
      }

      



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
    // this.getFlashCards();
  }

  componentDidUpdate(){
    // if(this.state.cardOrder){
    //   this.setQuizCardOrder();
    // }
  }

  handleKeyPress(event){
    if (event.key === 'Enter') {
      console.log('Pressed enter key');
      this.checkAnswer(event, false);
    }
  }
  render() {
    const noKanji = <h3>{ this.state.answerKana }</h3>;
    const hasKanji = <h3>{ this.state.answerKanji }</h3>;
    const finished = <h1> Finished! </h1>;

    return (
      <Container className="mb-5 clearfix">
        <Dictionary
          displayDictionary={this.state.displayDictionary}
          showDictionary={this.showDictionary}
          currentEnglish={this.state.answerEng}
          currentKana={this.state.answerKana}
          currentKanji={this.state.answerKanji}
        />
        <VocabList
          displayList={this.state.displayList}
          showList={this.showList}
          cardList={this.state.japaneseCard}
        />
        <Row >
          <Col className="mt-4">
            <h2 className="text-center">Japanese and Korean Quizes</h2>

            <div className="p-5 mb-4 bg-light rounded-3">
              <p
                className="text-center">
                  Score: { this.state.score }
              </p>
              <h2
                className="text-center">
                  { this.state.finished ? finished : this.state.answerKanji ? hasKanji : noKanji }
              </h2>
              { this.state.finished ? 
              
              <></> : 
              
              <JapaneseInputWindow
                error={this.state.error}
                handleKeyPress={this.handleKeyPress}
                inputFocus={this.inputFocus}
                kanji={this.state.answerKanji}
                checkAnswer={this.checkAnswer}
                handleKanji={this.handleKanji}
                handleKana={this.handleKana}
                input={this.state.input}
              />
              
              }
              {
                this.state.answerKanji && <p>You need a Japanese keyboard for this.</p>
              }
              { this.state.finished && <Button onClick={this.getFlashCards}> Restart Quiz </Button> }
            </div>
          </Col>
        </Row>
        <CardLinks submitChanges={this.getFlashCards} handleLanguageChange={this.handleLanguageChange} handleLevelChange={this.handleLevelChange} handleLessonChange={this.handleLessonChange} language={this.state.language} level={this.state.level} numberOfLessons={this.state.numberOfLessons}/>
      </Container>
    );
  }
};

export default FlashCardSpace;
