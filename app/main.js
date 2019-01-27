import React from 'react'
import ReactDOM from 'react-dom'
import Home from './pages/home/home.jsx'
import Forgot from './pages/forgot/forgot.jsx'
import {browserHistory, Router, Route} from 'react-router'

import './style.less'

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={Home} />
    <Route path='/forgot' component={Forgot} />
    <Route path='/singup' component={Home} />
  </Router>, document.getElementById('root'))
