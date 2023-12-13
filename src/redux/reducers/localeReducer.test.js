import { fromJS } from 'immutable'

import * as appAction from '../constants/appActions'
import localeReducer from './localeReducer'

describe('localeReducer should work correctly', () => {
  const state = fromJS({
    locale: 'en'
  })

  it('Should handle CHANGE_LOCATE_SUCCESS action correctly', () => {
    const mockAction = { type: appAction.CHANGE_LOCATE_SUCCESS, value: 'SOME_LOCATION_CODE' }
    const expectedState = state.set('locale', mockAction.value)
    const actualState = localeReducer(state, mockAction)
    expect(expectedState).toEqual(actualState)
  })

  it('Should keep state if reducer got an unsubcribed action', () => {
    const mockUnsubcribedActionType = 'MOCK_UNSUBCRIBED_ACTION_TYPE'
    const mockAction = { type: mockUnsubcribedActionType }
    const expectedState = state
    const actualState = localeReducer(state, mockAction)
    expect(expectedState).toEqual(actualState)
  }) 
})