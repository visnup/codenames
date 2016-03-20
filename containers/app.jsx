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
    return (
      <div {...css}>
        <div className="controls">
          <label>
            <input
              type="checkbox"
              checked={this.props.spymaster}
              onClick={this.props.toggleSpymaster} />
            {' '}
            I am spymaster
          </label>
          <span className="instructions">
            {this.props.double.toUpperCase()} goes first
          </span>
        </div>
        <Board />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    spymaster: state.spymaster,
    double: chain(state.words)
              .countBy('type')
              .findKey(count => count === 9)
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
