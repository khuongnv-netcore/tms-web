// import objectAssign from 'object-assign'
import { fromJS } from 'immutable'

import * as appAction from '../constants/appActions'
import loadingReducer from './loadingReducer'

describe('loadingReducer should work correctly', () => {
  const state = fromJS({
    loading: false
  })

  it('Should handle SHOW_LOADING action correctly', () => {
    const mockAction = { type: appAction.SHOW_LOADING }
    const expectedState = state.set('loading', true)
    const actualState = loadingReducer(state, mockAction)
    expect(expectedState).toEqual(actualState)
  })

  it('Should handle HIDE_LOADING action correctly', () => {
    const mockAction = { type: appAction.HIDE_LOADING }
    const expectedState = state.set('loading', false)
    const actualState = loadingReducer(state, mockAction)
    expect(expectedState).toEqual(actualState)
  })

  it('Should keep state if reducer got an unsubcribed action', () => {
    const mockUnsubcribedActionType = 'MOCK_UNSUBCRIBED_ACTION_TYPE'
    const mockAction = { type: mockUnsubcribedActionType }
    const expectedState = state
    const actualState = loadingReducer(state, mockAction)
    expect(expectedState).toEqual(actualState)
  })
})
