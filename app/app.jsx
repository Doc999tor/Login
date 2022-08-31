import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignIn from './pages/log_in/log_in.jsx';
import Expired from './pages/expired/expired.jsx';
import ResetPassword from './pages/reset_password/reset_password.jsx';
import ChangePassword from './pages/change_password/change_password.jsx';
import { getParam, getPathname } from './utils/helpers';

function App() {
  const page = getParam('page');
  const rid = getParam('rid');
  console.log(page)
  if (page) {
    console.log('here', getPathname(page, rid))
    window.location.href = window.location.origin + getPathname(page, rid);
  }

  return (
    <Router>
      <Switch>
        <Route exact path={_config.routing.sign_in_path} component={SignIn} />
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
        <Route path='*' component={SignIn} />
      </Switch>
    </Router>
  );
}

export default App;
