import React from 'react'
import SignIn from '../sign-in/sign-in.jsx'
import Forgot from '../forgot/forgot.jsx'

import './home.less'

class Home extends React.Component {
  render () {
    return (
      <div id='home'>
        <SignIn home />
        <Forgot />
      </div>
    )
  }
}

export default Home
