import { fromJS } from 'immutable'

import { createReducer } from '../../utils/reduxHelpers'
import { SHOW_LOADING, HIDE_LOADING } from '../constants/appActions'

const initialState = fromJS({
  loading: false
})

const showLoading = state => {
  return state.set('loading', true)
}
const hideLoading = state => {
  return state.set('loading', false)
}

export default createReducer(initialState, {
  [SHOW_LOADING]: showLoading,
  [HIDE_LOADING]: hideLoading
})
