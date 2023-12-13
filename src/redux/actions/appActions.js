
import { actions as toastrActions } from 'react-redux-toastr'
import { captureException } from '@sentry/react'
import {
  SHOW_LOADING,
  HIDE_LOADING,
  SET_HEADER_TEXT,
} from '../constants/appActions'
import { DEFAULT_TOAST_OPTIONS as defaultToastOptions, GENERAL_ERROR_MESSAGE as generalErrorMessage } from '../../constants/common'

export function showLoading() {
  return dispatch => {
    dispatch({
      type: SHOW_LOADING
    })
  }
}

export function hideLoading() {
  return dispatch => {
    dispatch({
      type: HIDE_LOADING
    })
  }
}

export function setHeaderText(text) {
  return dispatch => {
    dispatch({
      type: SET_HEADER_TEXT,
      headerText: text
    })
  }
}

export function showSuccessNotification(message, options = {}) {
  return toastrActions.add({
    type: 'success',
    message,
    options: {...defaultToastOptions, ...options},
  })
}

function reportSentry(error) {
  const errMsg = typeof error === 'object' ? JSON.stringify(error) : error.toString()
  captureException(errMsg, { error })
}

/* istanbul ignore next */
export function showErrorNotification(
  error,
  options = {},
  useGeneralErrorMessage = generalErrorMessage
) {
  reportSentry(error)
  return toastrActions.add({
    type: 'error',
    message: error.toString ? error.toString() : useGeneralErrorMessage || useGeneralErrorMessage,
    options: { ...defaultToastOptions, ...options },
  })
}
