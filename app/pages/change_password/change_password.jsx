import React, { useState, useEffect } from 'react';
import { post } from '../../services/apiServices';
import {
  IncorrectCredentials,
  StatusBlock,
  SupportLink,
  Toast,
} from '../../components';
import { modalTypes, toastMode } from '../../utils/constants';
import './change_password.less';

const ChangePassword = () => {
  const [toast, setToast] = useState({
    isOpen: false,
    message: '',
    type: 'warning',
    time: 3000,
  });
  const [status, setStatus] = useState(modalTypes.default);
  const [incorrectCredentials, setIncorrectCredentials] = useState(false);
  const [showPass, setShowPassValue] = useState({
    password: false,
    confirmPassword: false,
  });
  const [newPassValue, setNewPassValue] = useState(
    sessionStorage.getItem('new_pass') || ''
  );
  const [newValidPass, setNewValidPass] = useState(true);
  const [confirmPassValue, setConfirmPassValue] = useState(
    sessionStorage.getItem('confirm_pass') || ''
  );
  const [confirmValidPass, setConfirmValidPass] = useState(true);

  const setIsOpen = () => setToast({ ...toast, isOpen: !toast.isOpen });

  const handleSetNewPassValue = () => {
    if (newPassValue?.trim().length > 3) {
      setNewValidPass(true);
      return true;
    }
    setNewValidPass(false);
    return false;
  };
  const handleSetConfirmPassValue = () => {
    if (confirmPassValue?.trim().length > 3) {
      setConfirmValidPass(true);
      return true;
    }
    setNewValidPass(false);
    return false;
  };
  const handleNewChangePass = (e) => {
    const value = e.target.value.trim();
    setNewPassValue(value);
    setNewValidPass(true);
    sessionStorage.setItem('new_pass', value);
  };
  const handleConfirmChangePass = (e) => {
    const value = e.target.value.trim();
    setConfirmPassValue(value);
    setConfirmValidPass(true);
    sessionStorage.setItem('confirm_pass', value);
  };

  const beforeSubmitCheck = () => {
    if ((newPassValue && newPassValue.length < 3) || !newPassValue) {
      setNewValidPass(false);
      return _config.translations.popup.password_error;
    }
    if (newPassValue !== confirmPassValue) {
      setConfirmValidPass(false);
      setNewValidPass(false);
      return _config.translations.popup.password_compare_error;
    }

    return false;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const checkAnswer = beforeSubmitCheck();
    if (!checkAnswer) {
      setStatus(modalTypes.pending);
      const newPassword = sessionStorage.getItem('new_pass');
      const searchParams = new URLSearchParams(window.location.search);
      post(_config.urls.set_password, {
        'current-password': newPassword,
        rid: searchParams.get('rid'),
      })
        .then(() => {
          setTimeout(() => setStatus(modalTypes.success), 3000);
          setTimeout(() => {
            window.location = _config.routing.sign_in_path;
          }, 6000);
        })
        .catch(() => {
          setTimeout(() => {
            setStatus(modalTypes.default);
            setToast({
              ...toast,
              type: toastMode.error,
              message: _config.translations.popup.something_went_wrong,
              isOpen: true,
            });
          }, 3000);
        });
    } else {
      setToast({
        ...toast,
        type: toastMode.error,
        message: checkAnswer,
        isOpen: true,
      });
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const errorParameter = searchParams.get('error');
    if (errorParameter === 'incorrect-credentials') {
      setIncorrectCredentials(true);
      setNewValidPass(false);
      setConfirmValidPass(false);
    }
  }, []);

  return (
    <div className='change_password'>
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
                  className='change-password-logo'
                  src={`${_config.urls.static}logo.svg`}
                  alt=''
                />
                <img
                  className='change-password-logo-name'
                  src={`${_config.urls.static}atzma.im.svg`}
                  alt=''
                />
              </a>
            )}
            {toast.isOpen && (
              <Toast
                message={toast.message}
                type={toast.type}
                time={toast.time}
                setIsOpen={setIsOpen}
              />
            )}
          </div>
        </div>
        {status !== modalTypes.default ? (
          <StatusBlock
            type={modalTypes[status]}
            renderOwnLabel={() => {
              const title = status === modalTypes.pending
                ? `${modalTypes[status]}_title`
                : 'password_change_success_title';
              return (
                <div className='modal-text-container'>
                  <div className='modal-text-container__title'>
                    {_config.translations.popup[title]}
                  </div>
                </div>
              );
            }}
          />
        ) : (
          <div className='change-password-wrap'>
            <h1>{_config.translations.change_password.title}</h1>
            <p className='reset-password-subtitle'>
              <span>{_config.translations.change_password.subtitle}</span>
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
                <div className={`group${newValidPass ? '' : ' err_pass'}`}>
                  <img
                    className='phone_img'
                    src={`${_config.urls.static}${
                      newValidPass ? 'ic_pass.svg' : 'ic_pass-error.svg'
                    }`}
                    alt=''
                  />
                  <input
                    type={showPass.password ? 'text' : 'password'}
                    name='current-password'
                    value={newPassValue}
                    className='group__input'
                    onChange={handleNewChangePass}
                    onBlur={handleSetNewPassValue}
                    autoComplete='current-password'
                    placeholder={
                      _config.translations.change_password
                        .new_password_placeholder
                    }
                  />
                  {newPassValue && (
                    <img
                      className='group__eye'
                      onClick={() => setShowPassValue((state) => ({
                        ...state,
                        password: !showPass.password,
                      }))}
                      src={
                        _config.urls.static
                        + (showPass ? 'eye-off.svg' : 'eye.svg')
                      }
                      alt=''
                    />
                  )}
                </div>
                <div className={`group${confirmValidPass ? '' : ' err_pass'}`}>
                  <img
                    className='phone_img'
                    src={`${_config.urls.static}${
                      confirmValidPass ? 'ic_pass.svg' : 'ic_pass-error.svg'
                    }`}
                    alt=''
                  />
                  <input
                    type={showPass.confirmPassword ? 'text' : 'password'}
                    name='confirm-password'
                    value={confirmPassValue}
                    className='group__input'
                    onChange={handleConfirmChangePass}
                    onBlur={handleSetConfirmPassValue}
                    autoComplete='confirm-password'
                    placeholder={
                      _config.translations.change_password
                        .confirm_password_placeholder
                    }
                  />
                  {confirmPassValue && (
                    <img
                      className='group__eye'
                      onClick={() => setShowPassValue((state) => ({
                        ...state,
                        confirmPassword: !showPass.confirmPassword,
                      }))}
                      src={
                        _config.urls.static
                        + (showPass ? 'eye-off.svg' : 'eye.svg')
                      }
                      alt=''
                    />
                  )}
                </div>
              </div>
              <button className='login-form__button login-button' type='submit'>
                {_config.translations.change_password.continue}
              </button>
            </form>
          </div>
        )}
      </div>
      <SupportLink />
    </div>
  );
};

export default ChangePassword;
