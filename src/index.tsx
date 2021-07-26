import { Popups } from 'lbl-popups'
import { configure } from 'mobx'
import React from 'react'
import ReactDOM from 'react-dom'
import './assets/css/vs.css'
import './assets/icon/fonts/icon.css'
import { IndexPage } from './pages/manager'
import reportWebVitals from './react/reportWebVitals'
configure({
  enforceActions: 'never',
})

ReactDOM.render(
  <React.StrictMode>
    <Popups />
    <IndexPage />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
