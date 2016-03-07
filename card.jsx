import React from 'react'
import classNames from 'classnames'
import css from './card.css'

class Card extends React.Component {
  render() {
    const cx = classNames(css.className, this.props.color)
    return <h1 className={cx} {...this.props}>{this.props.word}</h1>
  }
}

export default Card
