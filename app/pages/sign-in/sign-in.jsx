import React, {Component} from 'react'
import {backgroundImage} from 'services'
import './sign-in.less'

let mail = 'mail.svg'
let lock = 'lock.svg'

class SignIn extends Component {
  render () {
    return (
      <div style={{backgroundImage: `url(${_config.urls.static}coffee-cup-laptop-and-notepad.png)`}} className='sign-in'>
        <div className='sign-in-wrap'>
          <img className='sign-in-htm__logo' src={_config.urls.static + 'logo.svg'} />
          <div className='login-form'>
            <div className='login-form__text'>{_config.translations.title}</div>
            <button className='login-form__button'>
              <img className='login-form__img' src={_config.urls.static + 'search.svg'} />
              <span>{_config.translations.login_google}</span>
            </button>
            <span className='login-form__text or'>{_config.translations.login_or}</span>
            <div className='group'>
              <input type='text'
                style={{background: backgroundImage(mail)}}
                className='group__input'
                placeholder={_config.translations.enter_email} />
            </div>
            <div className='group'>
              <input type='password'
                style={{background: backgroundImage(lock)}}
                className='group__input'
                data-type='password'
                placeholder={_config.translations.enter_password} />
            </div>
            <button className='login-form__button login-button'>
              <span>{_config.translations.login}</span>
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
