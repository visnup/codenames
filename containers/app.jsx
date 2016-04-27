import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { chain } from 'lodash'

import css from './app.css'
import Board from './board'

class App extends React.Component {
  static propTypes = {
    spymaster: PropTypes.bool.isRequired,
    double: PropTypes.string,
    toggleSpymaster: PropTypes.func
  }

  componentDidMount() {
    window.addEventListener('deviceorientation', this.onDeviceOrientation)
  }

  componentWillUnmount() {
    window.removeEventListener('deviceorientation', this.onDeviceOrientation)
  }

  onDeviceOrientation = (e) => {
    if (this.props.spymaster) {
      const { beta, gamma } = e
      if (-50 < beta && beta < 50 && -50 < gamma && gamma < 50) {
        this.props.toggleSpymaster()
      }
    }
  }

  render() {
    let instructions;
    if (this.props.counts.blue && this.props.counts.red) {
      instructions =
        <span>
          <span className="blue">{this.props.counts.blue} left</span>
          <span className="red">{this.props.counts.red} left</span>
        </span>
    } else if (!this.props.counts.blue) {
      instructions = <span className="blue">BLUE wins!</span>
    } else if (!this.props.counts.red) {
      instructions = <span className="red">RED wins!</span>
    }

    return (
      <div {...css}>
        <div className="controls">
          <label>
            <input
              type="checkbox"
              checked={this.props.spymaster}
              onChange={this.props.toggleSpymaster} />
            {' '}
            I am spymaster
          </label>
          <span className="instructions">{instructions}</span>
        </div>
        <Board />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    spymaster: state.spymaster,
    counts: chain(state.words)
              .reject('reveal')
              .countBy('type')
              .value()
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggleSpymaster() {
      dispatch({ type: 'spymaster' })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
