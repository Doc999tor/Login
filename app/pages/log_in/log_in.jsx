import React, { useState, useEffect } from 'react'
import IncorrectCredentials from './components/incorrect_credentials/index.jsx'
import './log_in.less'

const LogIn = () => {
  const [incorrectCredentials, setIncorrectCredentials] = useState(false)
  const [emailValue, setEmailValue] = useState(sessionStorage.getItem('log_in_email') || '')
  const [validEmail, setIsValidEmailValue] = useState(true)
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const handleCheckEmail = () => {
    if (emailValue === '') {
      setIsValidEmailValue(false)
      return false
    } else {
      if (!re.test(emailValue)) {
        setIsValidEmailValue(false)
        return false
      } else {
        setIsValidEmailValue(true)
        return true
      }
    }
  }

  const handleChangeEmail = e => {
    const value = e.target.value
    setEmailValue(value)
    setIsValidEmailValue(true)
    sessionStorage.setItem('log_in_email', value)
  }

  const [showPass, setShowPassValue] = useState(false)
  const handleSetShowPassValue = () => setShowPassValue(!showPass)

  const [passValue, setPassValue] = useState(sessionStorage.getItem('log_in_pass') || '')
  const [validPass, setValidPassValue] = useState(true)
  const handleSetPassValue = () => {
    if (passValue && passValue.length > 3) {
      setValidPassValue(true)
      return true
    }
    setValidPassValue(false)
    return false
  }
  const handleCangePass = e => {
    const value = e.target.value
    setPassValue(value)
    setValidPassValue(true)
    sessionStorage.setItem('log_in_pass', value)
  }
  const handleCheckPassEmail = () => {
    if (passValue && passValue.length > 3 && emailValue && re.test(emailValue)) {
      return true
    }
    return false
  }

  const handleSubmit = (e) => {
    if ((passValue && passValue.length < 3) || !passValue) {
      setValidPassValue(false)
    }
    if ((emailValue && !re.test(emailValue)) || !emailValue) {
      setIsValidEmailValue(false)
    }
  }

  useEffect(
    () => {
      const searchParams = new URLSearchParams(window.location.search)
      const errorParameter = searchParams.get('error')
      if (errorParameter === 'incorrect-credentials') {
        setIncorrectCredentials(true)
        setIsValidEmailValue(false)
        setValidPassValue(false)
      }
    },
    []
  )

  return (
    <div className='log_in'>
      <div className='main-content'>
        <div style={{ backgroundImage: 'linear-gradient(123deg, #591ec0, #6623db 28%, #7d3ee8 54%, #be95ff 113%)' }} className='bottom_bgr'>
          <img className='wave' src={`${_config.urls.static}wave.svg`} alt='wave' />
          <div className='logo-wrap'>
            {incorrectCredentials
              ? <IncorrectCredentials />
              : <a href={_config.urls.home} className='home-link'>
                  <img className='log-in-logo' src={`${_config.urls.static}logo.svg`} />
                  <img className='log-in-logo-name' src={`${_config.urls.static}atzma.im.svg`} />
                </a>}
          </div>
        </div>
          <div className='log-in-wrap'>
            <h1>{_config.translations.log_in.main_title}</h1>
            <a href={window.location.origin + _config.urls.sign_up} className='log-in-question'><span>{_config.translations.log_in.subtitle}</span><span className='sign_label'>{_config.translations.log_in.sign_up_link_label}</span></a>
            <form action={_config.urls.check_login} method='POST'>
              <div className='text-content-wrap'>
                <input className='time-zone'
                  type='text'
                  name='time_zone'
                  defaultValue={Intl && Intl.DateTimeFormat && Intl.DateTimeFormat().resolvedOptions().timeZone} />
                <div className={`group${validEmail ? '' : ' err'}`}>
                  <img className='phone_img' src={`${_config.urls.static}${validEmail ? 'ic_email.svg' : 'ic_email-error.svg'}`} />
                  <input
                    type='email'
                    name='email'
                    value={emailValue}
                    onBlur={handleCheckEmail}
                    className='group__input'
                    onChange={handleChangeEmail}
                    autoComplete='username'
                    placeholder={_config.translations.log_in.email_placeholder}
                  />
                </div>
                <div className={`group${validPass ? '' : ' err_pass'}`}>
                  <img className='phone_img' src={`${_config.urls.static}${validPass ? 'ic_pass.svg' : 'ic_pass-error.svg'}`} />
                  <input
                    type={showPass ? 'text' : 'password'}
                    name='current-password'
                    value={passValue}
                    className='group__input'
                    onChange={handleCangePass}
                    onBlur={handleSetPassValue}
                    autoComplete='current-password'
                    placeholder={_config.translations.log_in.password_placeholder}
                  />
                  {passValue && <img className='group__eye' onClick={handleSetShowPassValue} src={_config.urls.static + (showPass ? 'eye-off.svg' : 'eye.svg')} />}
                </div>
              </div>
              <button className='login-form__button login-button' type={handleCheckPassEmail() ? 'submit' : 'button'} onClick={!handleCheckPassEmail() && handleSubmit}>
                {_config.translations.log_in.log_in_btn_label}
              </button>
            </form>
          </div>
      </div>
      {incorrectCredentials && <div className='sup-wrap'>
        <a href={_config.urls.contact_us} className='contact_us_link'>
          <span className='link_text'>{_config.translations.log_in.contact_us_link_label}</span>
          <span className='help'><img src={`${_config.urls.static}ic_help.svg`} alt='help' /></span>
        </a>
      </div>}
    </div>
  )
}

export default LogIn
