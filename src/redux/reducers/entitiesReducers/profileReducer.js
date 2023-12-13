import { fromJS } from 'immutable'

import { createReducer } from '../../../utils/reduxHelpers'
import {
  CHANGE_SELECT_DROPDOWN,
} from '../../constants/profileActions'


const initialState = fromJS({
  isSelect: false,
})

const changeSelectDropdown = (state, action) => {
  const { value } = action.payload
  return state.set('isSelect', value)
}

export default createReducer(initialState, {
  [CHANGE_SELECT_DROPDOWN]: changeSelectDropdown,
});