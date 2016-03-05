import React from 'react'
import { render } from 'react-dom'
import Board from './board'

const words = [ 'hello', 'there', 'goodbye' ]
render(<Board words={words} />,
    document.body.appendChild(document.createElement('div')))
