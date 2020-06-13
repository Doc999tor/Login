import React from 'react'
import ReactDOM from 'react-dom'
import SignIn from './pages/sign-in/sign-in.jsx'
// import Forgot from './pages/forgot/forgot.jsx'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './style.less'

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path={_config.routing.sign_in_path} component={SignIn} />
      {/* <Route path={_config.routing.forgot_path} component={Forgot} /> */}
      <Route path='*' component={SignIn} />
    </Switch>
  </Router>, document.getElementById('root'))
