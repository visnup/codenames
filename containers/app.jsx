import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import css from './app.css'
import Board from './board'

class App extends React.Component {
  static propTypes = {
    spymaster: PropTypes.bool.isRequired,
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
        <label>
          <input
            type="checkbox"
            checked={this.props.spymaster}
            onClick={this.props.toggleSpymaster} />
          {' '}
          I am spymaster
        </label>
        <Board />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    spymaster: state.spymaster
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
