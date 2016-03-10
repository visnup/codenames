import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import css from './board.css'
import Card from '../components/card'

class Board extends React.Component {
  static propTypes = {
    double: PropTypes.string.isRequired,
    words: PropTypes.array,
    types: PropTypes.array,
    reveal: PropTypes.array,
    revealCard: PropTypes.func.isRequired
  }

  render() {
    return (
      <div {...css}>
        {this.props.words.map((word, i) => {
          return (
            <Card
              key={String(word.id)}
              word={word.word}
              type={this.props.types[i]}
              reveal={this.props.reveal[i]}
              onClick={() => this.props.revealCard(i)}
            />
          )
        })}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return {
    revealCard: (i) => {
      dispatch({ type: 'reveal', i })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board)
