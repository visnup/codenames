import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { chain, fill, sample, shuffle } from 'lodash'

import App from './containers/app'
import reducers from './reducers'

let store = createStore(reducers, applyMiddleware(
  require('redux-logger')()
))

import words from './words.json'
const distribution = shuffle([
  'assassin',
  sample(['red', 'blue']),
  ...fill(Array(8), 'red'),
  ...fill(Array(8), 'blue'),
  ...fill(Array(7), 'bystander')
])
store.dispatch({ type: 'words',
  words: chain(words)
    .shuffle()
    .sampleSize(25)
    .map((word, i) => {
      return {
        id: i,
        word: word,
        type: distribution[i],
        reveal: false
      }
    })
    .value()
})

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.body.appendChild(document.createElement('div'))
)
