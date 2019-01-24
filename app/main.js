import React from 'react'
import ReactDOM from 'react-dom'
import Home from './pages/home/home.jsx';
import { Route, Router } from 'react-router'

const config = window._config
import './style.less'

ReactDOM.render(
  <Home />, document.getElementById('root'))
