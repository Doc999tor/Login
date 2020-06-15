import React, { useState } from 'react'
import SendModal from '../send_modal/index.jsx'
import './sign-in.less'

const LogIn = () => {
  const [emailValue, setEmailValue] = useState(sessionStorage.getItem('log_in_email') || '')
  const handleChangeEmail = e => {
    const value = e.target.value
    setEmailValue(value)
    sessionStorage.setItem('log_in_email', value)
  }
  const [validEmail, setIsValidEmailValue] = useState(true)
  const handleCheckEmail = () => {
    if (emailValue === '') {
      setIsValidEmailValue(false)
      return false
    } else {
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (!re.test(emailValue)) {
        setIsValidEmailValue(false)
        return false
      } else {
        setIsValidEmailValue(true)
        return true
      }
    }
  }

  const [showPass, setShowPassValue] = useState(false)
  const handleSetShowPassValue = () => setShowPassValue(!showPass)

  const [passValue, setPassValue] = useState(sessionStorage.getItem('log_in_pass') || '')
  const handleCangePass = e => {
    const value = e.target.value
    setPassValue(value)
    sessionStorage.setItem('log_in_pass', value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (handleCheckEmail()) {
      console.log('valid - ', emailValue)
    } else {
      console.log('something wrong')
    }
  }



  const send = false
  const sending = false
  const validName = true
  const validPhone = true

  return (
    <div className='log_in'>
      <div className='main-content'>
        <div style={{ backgroundImage: 'linear-gradient(123deg, #591ec0, #6623db 28%, #7d3ee8 54%, #be95ff 113%)' }} className='bottom_bgr'>
          <img className='wave' src={`${_config.urls.static}wave.svg`} alt='wave' />
          <div className='logo-wrap'>
            <a href={_config.urls.home} className='home-link'>
              <img className='log-in-logo' src={`${_config.urls.static}logo.svg`} />
              <img className='log-in-logo-name' src={`${_config.urls.static}atzma.im.svg`} />
            </a>
          </div>
        </div>
        {send
          ? <SendModal sending={sending} />
          : (
            <div className='log-in-wrap'>
              <h1>{_config.translations.log_in.main_title}</h1>
              <p className='log-in-question'><span>{_config.translations.log_in.subtitle}</span><a href={window.location.origin + _config.urls.login}>{_config.translations.log_in.sign_up_link_label}</a></p>
              <form onSubmit={handleSubmit}>
                <div className='text-content-wrap'>
                  <div className={`group${validEmail ? '' : ' err'}`}>
                    <img className='phone_img' src={`${_config.urls.static}ic_email.svg`} />
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
                  <div className={`group${validPhone ? '' : ' err_pass'}`}>
                    <img className='phone_img' src={`${_config.urls.static}ic_pass.svg`} />
                    <input
                      type={showPass ? 'text' : 'password'}
                      name='pass'
                      value={passValue}
                      className='group__input'
                      onChange={handleCangePass}
                      autoComplete='current-password'
                      placeholder={_config.translations.log_in.password_placeholder}
                    />
                    {passValue && <img className='group__eye' onClick={handleSetShowPassValue} src={_config.urls.static + (showPass ? 'eye-off.svg' : 'eye.svg')} />}
                  </div>
                </div>
                <button className='login-form__button login-button' type='submit'>
                  {_config.translations.log_in.log_in_btn_label}
                </button>
              </form>
            </div>
          )}
      </div>
    </div>
  )
}

export default LogIn
