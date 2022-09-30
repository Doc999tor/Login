import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import SignIn from './pages/log_in/log_in.jsx';
import Expired from './pages/expired/expired.jsx';
import ResetPassword from './pages/reset_password/reset_password.jsx';
import ChangePassword from './pages/change_password/change_password.jsx';

function App() {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path={_config.routing.forgot_path}
          component={ResetPassword}
        />
        <Route
          path={_config.routing.change_password_path}
          component={ChangePassword}
        />
        <Route exact path={_config.routing.expired_path} component={Expired} />
        <Route path={_config.routing.login} component={SignIn} />
        <Redirect path='*' to={_config.routing.login} />
      </Switch>
    </Router>
  );
}

export default App;
