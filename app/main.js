import React from 'react'
import ReactDOM from 'react-dom'
import SignIn from './pages/sign-in/sign-in.jsx'
import Forgot from './pages/forgot/forgot.jsx'
import {browserHistory, Router, Route} from 'react-router'

import './style.less'

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path={_config.routing.sing_in_path} component={SignIn} />
    <Route path={_config.routing.forgot_path} component={Forgot} />
  </Router>, document.getElementById('root'))
