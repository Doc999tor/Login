import React from 'react';
import './support_link.less'

const SupportLink = () => (
  <div className='sup-wrap'>
    <a href={_config.urls.contact_us} className='contact_us_link'>
      <span className='link_text'>{_config.translations.log_in.contact_us_link_label}</span>
      <span className='help'><img src={`${_config.urls.static}ic_help.svg`} alt='help' /></span>
    </a>
  </div>
)

export default SupportLink
