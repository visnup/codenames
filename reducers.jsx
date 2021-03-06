const reducers = (state, action) => {
  if (typeof state === 'undefined') {
    return {
      words: [],
      spymaster: false
    }
  }

  switch (action.type) {
    case 'words':
      return { ...state, words: action.words }
    case 'reveal':
      return { ...state, words: state.words.map((word, j) => action.i === j ? { ...word, reveal: !word.reveal } : word) }
    case 'spymaster':
      return { ...state, spymaster: !state.spymaster }
    default:
      return state
  }
}

export default reducers
