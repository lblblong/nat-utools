import { Popups } from 'lbl-popups'
import { configure } from 'mobx'
import React from 'react'
import ReactDOM from 'react-dom'
import './assets/css/vs.css'
import { IndexPage } from './pages/manager'
configure({
  enforceActions: 'never',
})

ReactDOM.render(
  <>
    <Popups />
    <IndexPage />
  </>,
  document.getElementById('root'),
)
