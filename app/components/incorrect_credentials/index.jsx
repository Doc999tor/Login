import React from 'react'
import './styles.less'

const IncorrectCredentials = () => {
  return (
    <div className='existing_email_strip'>
      <img src={`${_config.urls.static}ic_alert.svg`} alt='alert' />
      <p className='existing_email_label'>{_config.translations.log_in.incorrect_credentials}</p>
    </div>
  )
}

export default IncorrectCredentials
