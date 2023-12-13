import { fromJS } from 'immutable'
import { LOCATION_TYPE } from '../../constants/appActions'

import { createReducer } from '../../utils/reduxHelpers'
import { SHOW_LOADING, HIDE_LOADING } from '../constants/appActions'

const initialState = fromJS({
  location: []
})

// const showLoading = state => {
//   return state.set('loading', true)
// }
// const hideLoading = state => {
//   return state.set('loading', false)
// }

const handleGetListSucceed = state => {
    return state.set('location', state.value)
}

export default createReducer(initialState, {
    [LOCATION_TYPE.GET_LIST_SUCCEED]: handleGetListSucceed,
//   [SHOW_LOADING]: showLoading,
//   [HIDE_LOADING]: hideLoading


})
