import { useEffect, useState } from 'react';
import { Toast, ToastBody, ToastHeader, Row, Col } from 'reactstrap'
import './style.scss'

const close = (
    <button type='button' className='ml-1 close'>
      <span>×</span>
    </button>
)

const ToastCustom = (props) => {
  const { notification } = props;

  return (
      <div className="toast-position toast-transition toast-width">
          <Toast>
              <ToastHeader icon={notification?.variant} className="toast-header-padding"> 
                {notification?.variant === 'danger' ? ("Error") : ("Succeed")}
              </ToastHeader>
              <ToastBody>
                {notification?.message}
              </ToastBody>
          </Toast>
      </div>
    )
}

export default ToastCustom
  