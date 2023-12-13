import { createSelector } from 'reselect'

const profileReducer = state => state.get('profileReducer')

export const profileSelectors = {
  isSelect: createSelector(profileReducer, state => {
    return state.get('isSelect')
  }
  )
}