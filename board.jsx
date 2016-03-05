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
    map: shuffle(concat(distribution, this.props.first))
  }

  render() {
    return (
      <div {...css}>
        {this.props.words.map((word, i) => {
          return <Card
            key={String(word.id)}
            word={word.word}
            color={this.props.reveal && this.state.map[i]} />
        })}
      </div>
    )
  }
}

export default Board
