import React, {Component} from 'react'
import {loadJS, apiServices} from 'services'
import './sign-in.less'

class SignIn extends Component {
  state = {
    isVisiblePass: false,
    isValidEmail: true,
    isValidPass: true,
    passValue: '',
    emailValue: '',
    errMessage: (() => {
      // when loading the constructor, check url for an error
      let params = (new URL(document.location)).searchParams
      let error = params.get(_config.routing.url_params.error)
      if (error === _config.routing.url_params.values.incorrect) {
        return _config.translations.sign_in.error_incorrect
      } else {
        return ''
      }
    })()
  }
  componentDidMount () {
    // recaptcha v3
    loadJS(`https://www.google.com/recaptcha/api.js?render=${_config.keys.recaptcha_v3}`, document.body)
    // recaptcha v2
    loadJS('https://www.google.com/recaptcha/api.js', document.body)
  }
  // toggle password -> show/hide
  togglePass = () => {
    let inputPass = this.pass
    if (inputPass.type === 'password') {
      inputPass.type = 'text'
      this.setState({isVisiblePass: true})
    } else {
      this.setState({isVisiblePass: false})
      inputPass.type = 'password'
    }
  }
  // check email and pass values
  checkPassAndEmail = () => {
    // if password and email empty
    if (this.state.emailValue === '' && this.state.passValue === '') {
      this.setState({isValidEmail: false, isValidPass: false, errMessage: _config.translations.sign_in.enter_email_pass})
      return false
    } else { return true }
  }
  checkEmail = () => {
    // mail epmty
    if (this.state.emailValue === '') {
      this.setState({isValidEmail: false, errMessage: _config.translations.sign_in.missing_email})
      return false
    } else {
      // check valid email
      let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      // mail not valid (if not: @, .com or there are prohibited characters)
      if (!re.test(this.state.emailValue)) {
        this.setState({isValidEmail: false, errMessage: _config.translations.sign_in.wrong_email})
        return false
      } else {
        this.setState({errMessage: '', isValidEmail: true})
        return true
      }
    }
  }
  checkPassword = () => {
    // pass epmty
    if (this.state.passValue === '') {
      this.setState({isValidPass: false, errMessage: _config.translations.sign_in.missing_password})
      this.checkPassAndEmail()
      return false
    } else if (this.state.passValue.length < 8) {
      this.setState({isValidPass: false, errMessage: _config.translations.sign_in.password_short})
      return false
    } else {
      this.setState({isValidPass: true, errMessage: ''})
      return true
    }
  }
  recaptchaCallback = () => {
    if (grecaptcha.getResponse() && grecaptcha.getResponse().length) {
      this.form.submit()
    }
  }
  render () {
    return (
      <div style={{backgroundImage: `linear-gradient( rgba(79, 45, 167, 0.7) 100%, rgba(93, 54, 177, 0.7)100%), url(${_config.urls.static}login-bg.jpg#blur)`}} className='sign-in'>
        <div className='sign-in-wrap'>
          <img className='sign-in-htm__logo' src={_config.urls.static + 'logo.svg'} />
          <form ref={form => this.form = form} action={_config.urls.check_login} method='POST'>
            <div className='login-form__text'>{_config.translations.sign_in.title}</div>
            <button className='login-form__button google dispay-none'>
              <img className='login-form__img' src={_config.urls.static + 'search.svg'} />
              <span>{_config.translations.sign_in.login_google}</span>
            </button>
            <input className='login-form__time-zone'
              type='text'
              name='time_zone'
              defaultValue={Intl && Intl.DateTimeFormat && Intl.DateTimeFormat().resolvedOptions().timeZone} />
            <span className='login-form__text or dispay-none' >{_config.translations.sign_in.login_or}</span>
            <div className={`group email ${this.state.isValidEmail ? '' : 'err'}`}>
              <img className='group__email'
                src={_config.urls.static + (this.state.isValidEmail ? 'mail.svg' : 'mail-err.svg')} />
              <input type='email'
                name='email'
                ref={email => this.email = email}
                onChange={e => this.setState({emailValue: e.target.value})}
                // if the password and email are empty then we do not do an additional check
                onBlur={() => { this.checkPassAndEmail() && this.checkEmail() }}
                className='group__input email'
                placeholder={_config.translations.sign_in.enter_email}
                autoComplete='username' />
            </div>
            <div className={`group password ${this.state.isValidPass ? '' : 'err'}`}>
              <img className='group__lock'
                src={_config.urls.static + (this.state.isValidPass ? 'lock.svg' : 'lock-err.svg')} />
              <input type='password'
                name='pass'
                onChange={e => this.setState({passValue: e.target.value})}
                // if the password and email are empty then we do not do an additional check
                onBlur={() => { this.checkPassAndEmail() && this.checkPassword() }}
                ref={pass => this.pass = pass}
                className='group__input password'
                data-type='password'
                placeholder={_config.translations.sign_in.enter_password}
                autoComplete='current-password' />
              {this.state.passValue && <img className='group__eye'
                onClick={this.togglePass}
                src={_config.urls.static + (this.state.isVisiblePass ? 'eye-off.svg' : 'eye.svg')} />}
            </div>
            <div className='login-err'>
              {this.state.errMessage && <img className='login-err__img' src={_config.urls.static + 'vector.svg'} />}
              <span className='login-err__text'>{this.state.errMessage}</span>
            </div>
            <div id='g-recaptcha-response' name='g-recaptcha-response' className='g-recaptcha' data-size='invisible' data-sitekey={_config.keys.recaptcha_v2} />
            <button className='login-form__button login-button'
              type={this.state.isValidEmail && this.state.isValidPass ? 'submit' : 'button'}
              onClick={e => {
                e.preventDefault()
                this.checkPassword() && this.checkEmail() && this.checkPassAndEmail() && grecaptcha.ready(() => {
                  grecaptcha.execute(_config.keys.recaptcha_v3, {action: 'homepage'}).then(token => {
                    apiServices.post(_config.urls.recaptcha_post.replace('{token}', token)).then(response => {
                      if (!JSON.parse(response.success) && !grecaptcha.getResponse()) {
                        grecaptcha.execute()
                      }
                    })
                  })
                })
                this.recaptchaCallback()
              }}>
              {_config.translations.sign_in.login}
            </button>
            <span className='login-form__forgot' onClick={() => this.props.history.push(_config.routing.forgot_path)}>
              {_config.translations.sign_in.forgot_password}
            </span>
          </form>
          <footer className='dont-have-acc'>{_config.translations.sign_in.dont_have_acc} &nbsp;
            <span className='dont-have-acc__sign-up'>{_config.translations.sign_in.sign_up}</span>
          </footer>
        </div>
      </div>
    )
  }
}

export default SignIn
