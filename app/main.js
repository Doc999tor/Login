import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import SignIn from './pages/log_in/log_in.jsx'
import ResetPassword from './pages/reset_password/reset_password.jsx'

import './style.less'

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path={_config.routing.sign_in_path} component={SignIn} />
      <Route exact path={_config.routing.forgot_path} component={ResetPassword} />
      <Route path='*' component={SignIn} />
    </Switch>
  </Router>, document.getElementById('root')
)
