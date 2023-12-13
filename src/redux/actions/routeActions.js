/* istanbul ignore file */
import {
  push as routerPush,
  replace as routerReplace,
  goBack as routerGoBack,
} from 'connected-react-router/immutable'

import { showErrorNotification } from './appActions'

export function replace(path, state) {
  return (dispatch) => {
    try {
      const replaceAction = routerReplace(path, state)
      dispatch(replaceAction)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
      dispatch(showErrorNotification(error))
    }
  }
}
export function push(path, lastState = {}, currentState = {}) {
  return (dispatch) => {
    try {
      const pushAction = routerPush(path, { lastState, currentState })
      dispatch(pushAction)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
      dispatch(showErrorNotification(error))
    }
  }
}

export function goBack() {
  return (dispatch) => {
    try {
      const goBackAction = routerGoBack()
      dispatch(goBackAction)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
      dispatch(showErrorNotification(error))
    }
  }
}
