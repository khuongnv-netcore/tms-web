/* istanbul ignore file */
import { combineReducers } from 'redux-immutable'
import { connectRouter } from 'connected-react-router/immutable'
import { reducer as toastrReducer } from 'react-redux-toastr'

import loadingReducer from './loadingReducer'
import localeReducer from './localeReducer'


const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    toastrReducer,
    localeReducer,
    loadingReducer,
  })

export default rootReducer
