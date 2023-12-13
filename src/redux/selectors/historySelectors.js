/* istanbul ignore file */
import { createSelector } from 'reselect'
import { fromJS } from 'immutable'

const historyReducer = state => state.get('router')

export const historySelector = {
  selectCurrentRouteState: createSelector(historyReducer, (state) =>
    state.getIn(['location', 'state', 'currentState']) || fromJS({})
  ),
  selectLastRouteState: createSelector(historyReducer, (state) =>
    state.getIn(['location', 'state', 'lastState']) || fromJS({})
  ),
}