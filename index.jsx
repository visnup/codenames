import React from 'react'
import { render } from 'react-dom'
import { shuffle } from 'lodash'
import qs from 'qs'
import Board from './board'

class App extends React.Component {
  state = {
    words: ['initial']
  }

  componentDidMount() {
    const params = qs.stringify({
      includePartOfSpeech: 'noun,adjective,verb',
      minCorpusCount: 1000000,
      minDictionaryCount: 20,
      minLength: 4,
      limit: 25,
      api_key: 'a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'
    })
    fetch(`http://api.wordnik.com/v4/words.json/randomWords?${params}`)
      .then(res => res.json())
      .then((json) => {
        this.setState({ words: shuffle(json) })
      })
  }

  render() {
    return <Board words={this.state.words} />
  }
}

render(<App />, document.body.appendChild(document.createElement('div')))
