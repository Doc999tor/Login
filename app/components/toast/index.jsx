import React, { useEffect, useMemo } from 'react';
import { toastMode } from '../../utils/constants'

import './toast.less'

const Toast = ({ message, type, time = 3000, setIsOpen }) => {
  const icon = useMemo(() => {
    switch (type) {
      case toastMode.error:
        return `${_config.urls.static}ic_alert.svg`
      case toastMode.success:
        return `${_config.urls.static}ic_send_success.svg`
      case toastMode.warning:
        return ''
      default: return ''
    }
  }, [type])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen()
    }, time)

    return () => {
      clearTimeout(timer)
    }
  }, [setIsOpen, time])

  return (
    <div className='notify-wrapper'>
      <div className='notify-img-container'>
        <img src={icon} alt='' />
      </div>
      <div className={`notify-text ${type}`}>
        <span>{message}</span>
      </div>
    </div>
  )
}

export default Toast
