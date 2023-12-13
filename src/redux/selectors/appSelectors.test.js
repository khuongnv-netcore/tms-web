import { fromJS } from 'immutable'

import { appSelectors } from './appSelectors'


const state = fromJS({
  localeReducer: {
    locale: 'en',
  },
  loadingReducer: {
    loading: false,
  },
  toastrReducer: {
    sampleField: 'sample value'
  }
})


describe('appSelectors selectors should work correctly', () => {
  
  it('selectLocale should work correctly', () => {
    const localeState = state.get('localeReducer')
    const expectedItems = localeState.get('locale')
    const actualItems = appSelectors.selectLocale(state)
    expect(actualItems).toEqual(expectedItems)
  })
  
  it('selectLoading should work correctly', () => {
    const localeState = state.get('loadingReducer')
    const expectedItems = localeState.get('loading')
    const actualItems = appSelectors.selectLoading(state)
    expect(actualItems).toEqual(expectedItems)
  })
  
  it('selectToastr should work correctly', () => {
    const localeState = state.get('toastrReducer')
    const expectedItems = localeState
    const actualItems = appSelectors.selectToastr(state)
    expect(actualItems).toEqual(expectedItems)
  })
})
