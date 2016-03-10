import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import css from './app.css'
import Board from './board'

class App extends React.Component {
  static propTypes = {
    spymaster: PropTypes.bool.isRequired,
    toggleSpymaster: PropTypes.func
  }

  render() {
    return (
      <div {...css}>
        <label>
          <input type="checkbox" checked={this.props.spymaster} onClick={this.props.toggleSpymaster} />
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
    toggleSpymaster: () => {
      dispatch({ type: 'spymaster' })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
