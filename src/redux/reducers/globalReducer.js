import produce from 'immer'
import { GLOBAL_ACTION_TYPE } from '../../constants/actionTypes'
import { createReducer } from '../../utils/reduxHelpers'

const initialState = {
    notifications: [],
}

const handleAddNotification = produce((draftState, { payload: notification }) => {
    draftState.notifications.push(notification)
})

const handleRemoveNotification = produce((draftState, { payload: notification }) => {
    draftState.notifications = [];
})

export default createReducer(initialState, {
    [GLOBAL_ACTION_TYPE.ADD_NOTIFICATION]: handleAddNotification,
    [GLOBAL_ACTION_TYPE.REMOVE_NOTIFICATION]: handleRemoveNotification,
  })
  