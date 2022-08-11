import React, { useState, useEffect } from 'react';
import { modalTypes } from '../../utils/constants';
import { post } from '../../services/apiServices';
import { IncorrectCredentials, StatusBlock } from '../../components';
import './reset_password.less';

const ResetPassword = () => {
  const [incorrectCredentials, setIncorrectCredentials] = useState(false);
  const [status, setStatus] = useState(modalTypes.default);
  const [emailValue, setEmailValue] = useState(
    sessionStorage.getItem('log_in_email') || ''
  );
  const [validEmail, setIsValidEmailValue] = useState(true);
  const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const handleCheckEmail = () => {
    if (emailValue?.trim() === '') {
      setIsValidEmailValue(false);
      return false;
    }
    if (!re.test(emailValue?.trim())) {
      setIsValidEmailValue(false);
      return false;
    }
    setIsValidEmailValue(true);
    return true;
  };

  const handleFormSubmit = (e) => {
    setStatus(modalTypes.pending);
    e.preventDefault();
    const email = sessionStorage.getItem('log_in_email');
    post(_config.urls.reset_password, { email })
      .then(() => {
        setTimeout(() => setStatus(modalTypes.success), 3000);
      })
      .catch(() => {
        setTimeout(() => setStatus(modalTypes.error), 3000);
        setTimeout(() => {
          window.location = _config.routing.forgot_path;
        }, 5000);
      });
  };

  const handleChangeEmail = (e) => {
    const value = e.target.value.trim();
    setEmailValue(value);
    setIsValidEmailValue(true);
    sessionStorage.setItem('log_in_email', value);
  };

  const handleCheckPassEmail = () => !!(emailValue && re.test(emailValue.trim()));

  const handleSubmit = () => {
    if ((emailValue && !re.test(emailValue)) || !emailValue) {
      setIsValidEmailValue(false);
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const errorParameter = searchParams.get('error');
    if (errorParameter === 'incorrect-credentials') {
      setIncorrectCredentials(true);
      setIsValidEmailValue(false);
    }
  }, []);

  return (
    <div className='reset_password'>
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
            {incorrectCredentials ? (
              <IncorrectCredentials />
            ) : (
              <a href={_config.urls.home} className='home-link'>
                <img
                  className='reset-password-logo'
                  src={`${_config.urls.static}logo.svg`}
                  alt='logo'
                />
                <img
                  className='reset-password-logo-name'
                  src={`${_config.urls.static}atzma.im.svg`}
                  alt='logo-name'
                />
              </a>
            )}
          </div>
        </div>
        {status !== modalTypes.default ? (
          <StatusBlock
            type={modalTypes[status]}
            renderOwnLabel={() => {
              const title = `${modalTypes[status]}_title`;
              const subtitle = `${modalTypes[status]}_subtitle`;
              return (
                <div className='modal-text-container'>
                  <div className='modal-text-container__title'>
                    {_config.translations.popup[title]}
                  </div>
                  <div className='modal-text-container__subtitle'>
                    {_config.translations.popup[subtitle]}
                  </div>
                </div>
              );
            }}
          />
        ) : (
          <div className='reset-password-wrap'>
            <h1>{_config.translations.log_in.reset_password}</h1>
            <p className='reset-password-subtitle'>
              <span>{_config.translations.log_in.reset_password_subtitle}</span>
            </p>
            <form onSubmit={handleFormSubmit}>
              <div className='text-content-wrap'>
                <input
                  className='time-zone'
                  type='text'
                  name='time_zone'
                  defaultValue={
                    Intl
                    && Intl.DateTimeFormat
                    && Intl.DateTimeFormat().resolvedOptions().timeZone
                  }
                />
                <div className={`group${validEmail ? '' : ' err'}`}>
                  <img
                    className='phone_img'
                    src={`${_config.urls.static}${
                      validEmail ? 'ic_email.svg' : 'ic_email-error.svg'
                    }`}
                    alt='email'
                  />
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
              </div>
              <button
                className='login-form__button login-button'
                type={handleCheckPassEmail() ? 'submit' : 'button'}
                onClick={!handleCheckPassEmail() && handleSubmit}
              >
                {_config.translations.forgot.send}
              </button>
            </form>
          </div>
        )}
        {status === modalTypes.default && (
          <div className='tooltips-block'>
            <div>{_config.translations.forgot.dont_want_reset_pwd}</div>
            <div>
              <span>{_config.translations.forgot.goto}</span>{' '}
              <a
                className='reset-password-question'
                href={window.location.origin + _config.urls.login}
              >
                <span className='sign_label'>
                  {_config.translations.log_in.log_in}
                </span>
              </a>
            </div>
            <p />
          </div>
        )}
      </div>
      {status !== modalTypes.pending && (
        <div className='sup-wrap'>
          <a href={_config.urls.contact_us} className='contact_us_link'>
            <span className='link_text'>
              {_config.translations.log_in.contact_us_link_label}
            </span>
            <span className='reset-password-help'>
              {_config.translations.forgot.support}
            </span>
          </a>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
