import React, { PropTypes } from 'react'
import classNames from 'classnames'
import css from './card.css'

class Card extends React.Component {
  static propTypes = {
    reveal: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    word: PropTypes.string.isRequired
  }

  render() {
    const cx = classNames(css.className, this.props.type, { reveal: this.props.reveal })
    return <h1 className={cx} {...this.props}>{this.props.word}</h1>
  }
}

export default Card
