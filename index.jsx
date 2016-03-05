import React from 'react'
import { render } from 'react-dom'
import Board from './board'

class App extends React.Component {
  state = {
    words: ['initial']
  }

  componentDidMount() {
    fetch('http://api.wordnik.com/v4/words.json/randomWords?includePartOfSpeech=noun&minCorpusCount=1000000&minLength=4&limit=25&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5').then(res => res.json()).then((json) => {
      this.setState({ words: json.map(word => word.word) })
    });
  }

  render() {
    return <Board words={this.state.words} />
  }
}

render(<App />, document.body.appendChild(document.createElement('div')))
