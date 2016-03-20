import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import css from './board.css'
import Card from '../components/card'

class Board extends React.Component {
  static propTypes = {
    words: PropTypes.array,
    spymaster: PropTypes.bool.isRequired,
    revealCard: PropTypes.func.isRequired
  }

  render() {
    return (
      <div {...css}>
        {this.props.words.map((word, i) => {
          return (
            <Card
              {...word}
              key={String(word.id)}
              spy={this.props.spymaster}
              onClick={e => this.props.revealCard(e, i)}
              onTouchStart={e => this.props.revealCard(e, i)}
            />
          )
        })}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { words, spymaster } = state
  return { words, spymaster }
}

function mapDispatchToProps(dispatch) {
  return {
    revealCard: (e, i) => {
      e.preventDefault()
      dispatch({ type: 'reveal', i })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)
