import produce from 'immer'
import { createSelector } from 'reselect'

const globalState = produce(draftState => draftState.global)
export const notificationSelector = createSelector(globalState, produce(draftState => draftState.notifications))
