import React from 'react'
import { createPortal } from 'react-dom'
import Toast from '../toast'

import './toast_container.less'

const ToastContainer = ({ toasts }) => {
  return createPortal(
    <div className='notification-wrapper'>
      {
        toasts.map(item => <Toast key={item.id} {...item} />)
      }
    </div>,
    document.body,
  )
}

export default ToastContainer
