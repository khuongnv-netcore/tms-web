import { USER_TYPE } from "../../../constants/actionTypes";
import { userService } from "../../../services";
import { addErrorNotification, addSuccessNotification } from "./globalActions";

export const getUserInfo = (param) => {
    return async dispatch => {
        try {

            dispatch({ type: USER_TYPE.GET_CURRENT_USER_REQUEST });

            const {
                data,
                success,
                errors,
                message
            } = await userService.getUserInfo(param);

            if (success) {
                // dispatch get succeed
                dispatch({ 
                    type: USER_TYPE.GET_CURRENT_USER_SUCCEED,
                    payload: data
                });
            }

            if (!success) {
                // dispatch get error
                dispatch({ 
                    type: USER_TYPE.GET_CURRENT_USER_FAIL, 
                    payload: { errors, message }
                });
                const errorMessage = errors?.message?.[0] || 'An error occurred'
                dispatch(addErrorNotification(errorMessage))
            }


        } catch (error) {
            dispatch(addErrorNotification(error.message))
        }
    }
}

export const getListUser = (param) => {
    return async dispatch => {
        try {

            dispatch({ type: USER_TYPE.GET_LIST_REQUEST });

            dispatch({ type: USER_TYPE.UPDATE_PAGING_SETTING, payload: param });

            const {
                data,
                success,
                errors,
                message
            } = await userService.getListUser(param);

            if (success) {
                // dispatch get succeed
                dispatch({ 
                    type: USER_TYPE.GET_LIST_SUCCEED,
                    payload: data
                });
            }

            if (!success) {
                // dispatch get error
                dispatch({ 
                    type: USER_TYPE.GET_LIST_FAIL,
                    payload: { errors, message }
                });
                const errorMessage = errors?.message?.[0] || 'An error occurred'
                dispatch(addErrorNotification(errorMessage))
            }


        } catch (error) {
            dispatch(addErrorNotification(error.message))
        }
    }
}

export const updateUserRole = (userRoleData, onSuccess, onFailure, messageSucceed) => {
    return async dispatch => {
        try {

            dispatch({ type: USER_TYPE.UPDATE_ROLE_REQUEST });

            const { data, success, errors, message } = await userService.updateUserRole(userRoleData);

            if (success) {
                dispatch({
                    type: USER_TYPE.UPDATE_ROLE_SUCCEED
                });

                dispatch(addSuccessNotification(messageSucceed))
                typeof onSuccess === 'function' && onSuccess({})
            }

            if (!success) {
                dispatch({
                    type: USER_TYPE.UPDATE_ROLE_FAIL,
                    payload: {
                        errors, message
                    }
                })

                dispatch(addErrorNotification(errors?.message?.[0] || 'An error occurred'))
                typeof onFailure === 'function' && onFailure(errors)
            }


        } catch (error) {
            dispatch(addErrorNotification(error.message))
        }
    }
}

export const updateUser = (userData, onSuccess, onFailure, messageSucceed) => {
    return async dispatch => {
        try {

            dispatch({ type: USER_TYPE.UPDATE_REQUEST });

            const { data, success, errors, message } = await userService.updateUser(userData);

            if (success) {
                dispatch({
                    type: USER_TYPE.UPDATE_SUCCEED
                });

                dispatch(addSuccessNotification(messageSucceed))
                typeof onSuccess === 'function' && onSuccess({})
            }

            if (!success) {
                dispatch({
                    type: USER_TYPE.UPDATE_FAIL,
                    payload: {
                        errors, message
                    }
                })

                dispatch(addErrorNotification(errors?.message?.[0] || 'An error occurred'))
                typeof onFailure === 'function' && onFailure(errors)
            }


        } catch (error) {
            dispatch(addErrorNotification(error.message))
        }
    }
}