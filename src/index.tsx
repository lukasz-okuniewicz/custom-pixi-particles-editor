import * as React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import * as PIXI from 'pixi.js-legacy'

// @ts-ignore
window.PIXI = PIXI;

const rootEl = document.getElementById('root')

render(<App />, rootEl)
