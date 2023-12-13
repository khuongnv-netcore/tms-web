import { createSelector } from 'reselect'

const localeReducer = state => state.get('localeReducer')
const loadingReducer = state => state.get('loadingReducer')
const toastrReducer = state => state.get('toastrReducer')

export const appSelectors = {
  selectLocale: createSelector(localeReducer, state =>
    state.get('locale')
  ),
  selectLoading: createSelector(loadingReducer, state =>
    state.get('loading')
  ),
  selectToastr: toastrReducer,
}
