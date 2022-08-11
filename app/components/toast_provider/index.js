import React, { createContext, useCallback, useState } from 'react'
import { reject } from 'lodash'
import ToastContainer from './components/toast_container'

const ToastContext = createContext(null)

let id = 1

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type, time) => {
    setToasts(toasts => [
      ...toasts,
      { id: id++, message, type, time },
    ])
  }, [setToasts])

  const handleErrorAPI = e => {
    addToast(e.response.data.error, 'error', 3000)
  }

  const removeToast = useCallback(id => {
    setToasts(reject(toasts, { id }))
  }, [setToasts])

  return (
    <ToastContext.Provider value={{ addToast, removeToast, handleErrorAPI }}>
      <ToastContainer toasts={toasts} />
      {children}
    </ToastContext.Provider>
  )
}

export function useToast () {
  return React.useContext(ToastContext)
}

export default ToastProvider
