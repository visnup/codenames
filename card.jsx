import React from 'react'
import css from './card.css'

class Card extends React.Component {
  render() {
    return <h1 className={css.className}>{this.props.word}</h1>
  }
}

export default Card
