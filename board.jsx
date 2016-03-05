import React from 'react'
import Card from './card'
import css from './board.css'

class Board extends React.Component {
  render() {
    return (
      <div className={css.className}>
        {this.props.words.map(word => {
          return <Card key={String(word.id)} word={word.word} />
        })}
      </div>
    )
  }
}

export default Board
