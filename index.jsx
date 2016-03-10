import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { fill, sample, shuffle } from 'lodash'
import qs from 'qs'

import App from './containers/app'

let store = createStore((state, action) => {
  if (typeof state === 'undefined') {
    const distribution = [
      'assassin',
      sample(['red', 'blue']),
      ...fill(Array(8), 'red'),
      ...fill(Array(8), 'blue'),
      ...fill(Array(7), 'bystander')
    ]
    return {
      words: [],
      reveal: fill(Array(25), false),
      spymaster: false,
      types: shuffle(distribution)
    }
  }

  switch (action.type) {
    case 'fetch_words':
      return { ...state, words: action.words }
    case 'reveal':
      return { ...state, reveal: state.reveal.map((value, j) => action.i === j || value) }
    case 'spymaster':
      return { ...state, spymaster: !state.spymaster }
    default:
      return state
  }
})

const query = qs.stringify({
  includePartOfSpeech: 'noun,verb-transitive',
  minCorpusCount: 100000,
  minDictionaryCount: 5,
  minLength: 3,
  maxLength: 10,
  limit: 25,
  api_key: 'a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'
})
fetch(`http://api.wordnik.com/v4/words.json/randomWords?${query}`)
  .then(res => res.json())
  .then((json) => { store.dispatch({ type: 'fetch_words', words: shuffle(json) }) })

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.body.appendChild(document.createElement('div'))
)
