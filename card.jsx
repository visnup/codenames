import React from 'react'
import classNames from 'classnames'
import css from './card.css'

class Card extends React.Component {
  static defaultProps = {
    color: 'bystander'
  }

  render() {
    const cx = classNames(css.className, this.props.color)
    return <h1 className={cx}>{this.props.word}</h1>
  }
}

export default Card
