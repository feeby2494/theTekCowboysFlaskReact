import React from 'react';
import './App.css';

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
      randomNumber: 0
    }
    this.handleChange = this.handleChange.bind(this);
    this.setRandomNumber = this.setRandomNumber.bind(this);
    this.setFirstCard = this.setFirstCard.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
  }
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }
  setRandomNumber(event) {
    this.setState({
      randomNumber: Math.floor(Math.random() * this.state.japaneseCard.length )
    }, () => {
      while(this.state.japaneseCard[this.state.randomNumber] in this.state.correctArray) {
        console.log('changed random number')
        this.setState({
          randomNumber: Math.floor(Math.random() * this.state.japaneseCard.length )
        });
      }
    });
  }
  setFirstCard(event) {
    const randomNumber = this.state.randomNumber;

    this.setState({
      questionId: this.state.japaneseCard[randomNumber].id,
      answerKana: this.state.japaneseCard[randomNumber].kana,
      answerKanji: this.state.japaneseCard[randomNumber].kanji,
      answerEng: this.state.japaneseCard[randomNumber].eng
    });
  }
  checkAnswer(event) {
    const cards = this.state.japaneseCard;
    let idIsZero = (this.state.questionId === 0);
    let onlyOneLeft = (cards.length === 1);
    const randomNumber = this.state.randomNumber;
    if(this.state.japaneseCard == undefined || this.state.japaneseCard.length == 1) {
      this.setState({
          finished: true
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
            correctArray: this.state.correctArray.concat(this.state.japaneseCard[this.state.randomNumber]),
          }, () => {
            // Trying to get this to do so after this.state.correctArray is finished updating
            // PREVIOUS CODE: onlyOneLeft ? [] : idIsZero ? cards.slice(this.state.randomNumber + 1) : cards.slice(0, this.state.randomNumber).concat(cards.slice(this.state.randomNumber + 1)),
            this.setState({
              japaneseCard: onlyOneLeft ? [] : cards.slice(0, this.state.randomNumber).concat(cards.slice(this.state.randomNumber + 1)),
              score: this.state.score + 1,
              input: ''
            }, () => {
              // Want this to update last, but want it to render and update card!!! Not the same card again...
              this.setRandomNumber();
              this.setState({
                questionId: this.state.japaneseCard[randomNumber].id,
                answerKana: this.state.japaneseCard[randomNumber].kana,
                answerKanji: this.state.japaneseCard[randomNumber].kanji,
                answerEng: this.state.japaneseCard[randomNumber].eng
              });
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
            correctArray: this.state.correctArray.concat(this.state.japaneseCard[this.state.randomNumber]),
          }, () => {
            // Trying to get this to do so after this.state.correctArray is finished updating
            this.setState({
              japaneseCard: onlyOneLeft ? [] : cards.slice(0, this.state.randomNumber).concat(cards.slice(this.state.randomNumber + 1)),
              score: this.state.score + 1,
              input: ''
            }, () => {
              // Want this to update last, but want it to render and update card!!! Not the same card again...
              this.setRandomNumber();
              this.setState({
                questionId: this.state.japaneseCard[randomNumber].id,
                answerKana: this.state.japaneseCard[randomNumber].kana,
                answerKanji: this.state.japaneseCard[randomNumber].kanji,
                answerEng: this.state.japaneseCard[randomNumber].eng
              });
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
  getFlashCards() {
    // use fetch to fetch cards from API
    this.setState({
      japaneseCard: []

    });
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
    this.setFirstCard();
  }
  componentDidMount(){
    // Will get flashcards from API; Might have buttons with eventhandlers change flashcards too
    //this.getFlashCards;
  }
  render() {
    const noKanji = <h3>{ this.state.answerKana }</h3>;
    const hasKanji = <h3>{ this.state.answerKanji }</h3>;
    const finished = <h1> Finished! </h1>

    return (
      <div>
        <p>{ this.state.score }</p>
        { this.state.finished ? finished : this.state.answerKanji ? hasKanji : noKanji }
        <input onChange={this.handleChange} value={this.state.input}/>
        <button onClick={this.setRandomNumber}>Set number</button>
        <button onClick={this.checkAnswer}>Check</button>
        <p>{this.state.randomNumber}</p>
      </div>
    );
  }
};

export default FlashCardSpace;
