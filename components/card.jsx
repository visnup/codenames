import React, { PropTypes } from 'react'
import classnames from 'classnames'
import { omit } from 'lodash'
import css from './card.css'

class Card extends React.Component {
  static propTypes = {
    reveal: PropTypes.bool.isRequired,
    spy: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    word: PropTypes.string.isRequired
  }

  render() {
    const { reveal, spy, ...props } = this.props
    const cx = classnames(css.className, this.props.type, { reveal, spy })
    return <h1 {...omit(props, 'id', 'type')} className={cx}>{this.props.word}</h1>
  }
}

export default Card
