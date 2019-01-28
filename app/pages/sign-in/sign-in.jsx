import React, {Component} from 'react'
import {backgroundImage} from 'services'
import './sign-in.less'

class SignIn extends Component {
  state = {
    isVisiblePass: false,
    isValidEmail: true,
    isValidPass: true,
    passValue: '',
    emailValue: '',
    errMessage: ''
  }
  // toggle password -> show/hide
  togglePass = () => {
    if (this.pass.type === 'password') {
      this.pass.type = 'text'
      this.setState({isVisiblePass: true})
    } else {
      this.setState({isVisiblePass: false})
      this.pass.type = 'password'
    }
  }
  // check email and pass values
  checkStuff = () => {
    // if password and email empty
    if (this.state.emailValue === '' && this.state.passValue === '') {
      this.setState({isValidEmail: false})
      this.setState({isValidPass: false})
      this.setState({errMessage: _config.translations.enter_email_pass})
      return false
    }
    // mail epmty
    if (this.state.emailValue === '') {
      this.setState({isValidEmail: false})
      this.setState({errMessage: _config.translations.missing_email})
      this.email.focus()
      return false
    } else {
      this.setState({errMessage: ''})
      // check valid email
      let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      // mail not valid (if not: @, .com or there are prohibited characters)
      if (!re.test(this.state.emailValue)) {
        this.setState({isValidEmail: false})
        this.setState({errMessage: _config.translations.wrong_email})
        this.email.focus()
        return false
      } else {
        this.setState({errMessage: ''})
        this.setState({isValidEmail: true})
      }
    }
    // pass epmty
    if (this.state.passValue === '') {
      this.setState({isValidPass: false})
      this.setState({errMessage: _config.translations.missing_password})
      this.pass.focus()
      return false
    } else {
      this.setState({isValidPass: true})
      this.setState({errMessage: ''})
    }
  }
  render () {
    let mail = this.state.isValidEmail ? 'mail.svg' : 'mail-err.svg'
    let lock = this.state.isValidPass ? 'lock.svg' : 'lock-err.svg'
    return (
      <div style={{backgroundImage: `url(${_config.urls.static}coffee-cup-laptop-and-notepad.png)`}} className='sign-in'>
        <div className='sign-in-wrap'>
          <img className='sign-in-htm__logo' src={_config.urls.static + 'logo.svg'} />
          {/* <div className={`login-form ${this.state.isValidEmail ? 'email-valid' : 'email-err'} ${this.state.isValidPass ? 'pass-valid' : 'pass-err'}`}> */}
          <div className='login-form'>
            <div className='login-form__text'>{_config.translations.title}</div>
            <button className='login-form__button google'>
              <img className='login-form__img' src={_config.urls.static + 'search.svg'} />
              <span>{_config.translations.login_google}</span>
            </button>
            <span className='login-form__text or'>{_config.translations.login_or}</span>
            <div className={`group email ${this.state.isValidEmail ? '' : 'err'}`}>
              <input type='text'
                style={{background: backgroundImage(mail)}}
                ref={email => this.email = email}
                onChange={e => this.setState({emailValue: e.target.value})}
                className='group__input email'
                placeholder={_config.translations.enter_email} />
            </div>
            <div className={`group password ${this.state.isValidPass ? '' : 'err'}`}>
              <input type='password'
                style={{background: backgroundImage(lock)}}
                onChange={e => this.setState({passValue: e.target.value})}
                ref={pass => this.pass = pass}
                className='group__input password'
                data-type='password'
                placeholder={_config.translations.enter_password} />
              {this.state.passValue && <img className='group__eye'
                onClick={this.togglePass}
                src={_config.urls.static + (this.state.isVisiblePass ? 'eye-off.svg' : 'eye.svg')} />}
            </div>
            <div className='login-err'>
              {this.state.errMessage && <img className='login-err__img' src={_config.urls.static + 'vector.svg'} />}
              <span className='login-err__text'>{this.state.errMessage}</span>
            </div>
            <button className='login-form__button login-button' onClick={this.checkStuff}>
              {_config.translations.login}
            </button>
            <span className='login-form__forgot'>{_config.translations.forgot_password}</span>
          </div>
        </div>
        <span className='dont-have-acc'>{_config.translations.dont_have_acc} &nbsp;
          <span className='dont-have-acc__sing-up'>{_config.translations.sing_up}</span>
        </span>
      </div>
    )
  }
}

export default SignIn
