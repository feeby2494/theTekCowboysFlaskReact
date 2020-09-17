import React from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

class JapaneseInputWindow extends React.Component {
  render() {

    return (
      <div id="japaneseInputWindow">
        {
          this.props.kanji ?
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <Button onClick={this.props.checkAnswer} variant="outline-primary">Check Answer</Button>
              </InputGroup.Prepend>
              <FormControl onKeyPress={this.props.handleKeyPress} ref={this.props.inputFocus} id='kanjiToKana' onChange={this.props.handleKanji} value={this.props.input} placeholder="Kanji or Hanja present: use kana or hangul" aria-describedby="basic-addon1" />
            </InputGroup>
          :
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <Button onClick={this.props.checkAnswer} variant="outline-primary">Check Answer</Button>
              </InputGroup.Prepend>
              <FormControl onKeyPress={this.props.handleKeyPress} ref={this.props.inputFocus} onChange={this.props.handleKana} value={this.props.input} placeholder="Kana or Hangul present: use English" aria-describedby="basic-addon1" />
            </InputGroup>

        }
      </div>
    );
  }
}

export default JapaneseInputWindow;
