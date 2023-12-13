import { actions as toastrActions } from 'react-redux-toastr'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'

import {
  SHOW_LOADING,
  HIDE_LOADING,
  SET_HEADER_TEXT,
} from '../constants/appActions'
import { DEFAULT_TOAST_OPTIONS as defaultToastOptions } from '../../constants/common'

import {
  showLoading,
  hideLoading,
  setHeaderText,
  showSuccessNotification,
  showErrorNotification
} from './appActions'

describe('App actions should work correctly', () => {
  const middleware = [thunk]
  const mockStore = configureMockStore(middleware)
  const store = mockStore()

  afterEach(() => {
    store.clearActions()
  })

  it('showLoading should work correctly', async () => {
    const expectedActions = [{ type: SHOW_LOADING }]
    await store.dispatch(showLoading())
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('hideLoading should work correctly', async () => {
    const expectedActions = [{ type: HIDE_LOADING }]
    await store.dispatch(hideLoading())
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('setHeaderText should work correctly', async () => {
    const mockHeaderText = 'SAMPLE HEADER TEXT'
    const expectedActions = [
      { type: SET_HEADER_TEXT, headerText: mockHeaderText }
    ]
    await store.dispatch(setHeaderText(mockHeaderText))
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('showSuccessNotification should work correctly', () => {
    const message = 'SAPMLE MESSAGE'
    const expectedActions = [
      toastrActions.add({
        message,
        type: 'success',
        options: {...defaultToastOptions, ...{}},
      })
    ]
    store.dispatch(showSuccessNotification(message))
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('showErrorNotification should work correctly', () => {
    const message = 'SAPMLE MESSAGE'
    const expectedActions = [
      toastrActions.add({
        message,
        type: 'error',
        options: {...defaultToastOptions, ...{}},
      })
    ]
    store.dispatch(showErrorNotification(message, null, false))
    expect(store.getActions()).toEqual(expectedActions)
  })
})
