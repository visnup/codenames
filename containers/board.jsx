import React, { PropTypes } from 'react'

import { concat, fill, shuffle } from 'lodash'
import css from './board.css'
import Card from '../components/card'

const distribution = concat(
  fill(Array(8), 'red'),
  fill(Array(8), 'blue'),
  fill(Array(7), 'bystander'),
  'assassin'
)

class Board extends React.Component {
  static propTypes = {
    first: PropTypes.string.isRequired,
    words: PropTypes.array
  }

  state = {
    types: shuffle(concat(distribution, this.props.first)),
    reveal: fill(Array(25), false)
  }

  revealCard(i) {
    this.setState({
      reveal: this.state.reveal.map((value, j) => i === j || value)
    })
  }

  render() {
    return (
      <div {...css}>
        {this.props.words.map((word, i) => {
          let onClick = this.revealCard.bind(this, i)
          return (
            <Card
              key={String(word.id)}
              word={word.word}
              type={this.state.types[i]}
              reveal={this.state.reveal[i]}
              onClick={onClick}
            />
          )
        })}
      </div>
    )
  }
}

export default Board
