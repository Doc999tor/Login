import React from 'react';
import { StatusBlock } from '../../components';
import { modalTypes } from '../../utils/constants';
import './expired.less';

const Expired = () => {
  const renderLinkOnWord = () => {
    const sentence = _config.translations.popup.contact_support;
    const words = sentence.split(' ');
    return (
      <>
        {`${words[0]} ${words[1]} `}
        <a href={_config.urls.contact_us}>{words[2]}</a>
      </>
    )
  }
  return (
    <div className='expired'>
      <div className='main-content'>
        <div
          style={{
            backgroundImage:
            'linear-gradient(123deg, #591ec0, #6623db 28%, #7d3ee8 54%, #be95ff 113%)',
          }}
          className='bottom_bgr'
        >
          <img
            className='wave'
            src={`${_config.urls.static}wave.svg`}
            alt='wave'
          />
          <div className='logo-wrap'>
            <a href={_config.urls.home} className='home-link'>
              <img
                className='expired-logo'
                src={`${_config.urls.static}logo.svg`}
                alt=''
              />
              <img
                className='expired-logo-name'
                src={`${_config.urls.static}atzma.im.svg`}
                alt=''
              />
            </a>
          </div>
        </div>
        <StatusBlock
          type={modalTypes.error}
          renderOwnLabel={() => (
            <div className='modal-text-container'>
              <div className='modal-text-container__title'>
                {_config.translations.popup.something_went_wrong}
              </div>
              <div className='modal-text-container__subtitle'>
                {renderLinkOnWord()}
              </div>
            </div>
          )}
        />
      </div>
      <div className='sup-wrap'>
        <a href={_config.urls.contact_us} className='contact_us_link'>
          <span className='link_text'>
            {_config.translations.log_in.contact_us_link_label}
          </span>
          <span className='help'>
            <img src={`${_config.urls.static}ic_help.svg`} alt='help' />
          </span>
        </a>
      </div>
    </div>
  )
};

export default Expired;
