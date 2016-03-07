import React from 'react'
import { concat, fill, shuffle } from 'lodash'
import Card from './card'
import css from './board.css'

const distribution = concat(
  fill(Array(8), 'red'),
  fill(Array(8), 'blue'),
  fill(Array(7), 'bystander'),
  'assassin'
)

class Board extends React.Component {
  state = {
    map: shuffle(concat(distribution, this.props.first)),
    reveal: fill(Array(25), false)
  }

  render() {
    return (
      <div {...css}>
        {this.props.words.map((word, i) => {
          let reveal = this.props.reveal || this.state.reveal[i]
          let onClick = this.toggleCard.bind(this, i)
          return (
            <Card
              key={String(word.id)}
              word={word.word}
              color={reveal && this.state.map[i]}
              onClick={onClick}
            />
          )
        })}
      </div>
    )
  }

  toggleCard(i) {
    this.setState({
      reveal: this.state.reveal.map((value, j) => i === j || value)
    })
  }
}

export default Board
