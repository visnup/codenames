import React from 'react'
import css from './card.css'

const colors = {
  red: 'hsl(0, 50%, 75%)',
  blue: 'hsl(230, 50%, 75%)',
  assassin: 'hsl(0, 0%, 75%)',
  bystander: 'hsl(60, 50%, 85%)'
}

class Card extends React.Component {
  static defaultProps = {
    color: 'bystander'
  }

  render() {
    const style = {
      backgroundColor: colors[this.props.color]
    }
    return <h1 {...css} style={style}>{this.props.word}</h1>
  }
}

export default Card
