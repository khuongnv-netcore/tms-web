import { combineReducers } from 'redux'

import roleReducer from './roleReducer';
import userReducer from './userReducer';
import profileReducer from './profileReducer';
import genericDataManagementReducer from './genericDataManagementReducer';
import eventReducer from './eventReducer';

export default combineReducers({
    role: roleReducer,
    user: userReducer,
    profile: profileReducer,
    genericDataManagement: genericDataManagementReducer,
    event: eventReducer,
})