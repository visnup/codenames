import React from 'react'
import Card from './card'

class Board extends React.Component {
  render() {
    return <div>{this.props.words.map(word => <Card word={word} />)}</div>
  }
}

export default Board
