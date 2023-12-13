import { ROLE_TYPE } from "../../../constants/actionTypes";
import { addErrorNotification, addSuccessNotification } from "./globalActions";
import { roleService } from "../../../services";

export const getListRole = (param) => {
    return async dispatch => {
        try {

            dispatch({ type: ROLE_TYPE.GET_LIST_REQUEST });

            dispatch({ type: ROLE_TYPE.UPDATE_PAGING_SETTING, payload: param });

            const {
                data,
                success,
                errors,
                message
            } = await roleService.getListRole(param);
            
            if (success) {
                // dispatch get succeedroleActions
                dispatch({ 
                    type: ROLE_TYPE.GET_LIST_SUCCEED,
                    payload: data
                });
            }

            if (!success) {
                // dispatch get error
                dispatch({ 
                    type: ROLE_TYPE.GET_LIST_FAIL,
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

export const deleteRoleItem = (roleItem, onSuccess, onFailure, messageSucceed) => {
    return async dispatch => {
        try {
            dispatch({ type: ROLE_TYPE.DELETE_REQUEST });
            const { success, errors, message } = await roleService.deleteRoleItem(roleItem.id);

            if (success) {
                // dispatch delete succeed
                dispatch({
                    type: ROLE_TYPE.DELETE_SUCCEED,
                });

                dispatch(addSuccessNotification(messageSucceed))
                typeof onSuccess === 'function' && onSuccess({})
            }

            if (!success) {
                // dispatch delete failed
                dispatch({
                    type: ROLE_TYPE.DELETE_FAIL,
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

export const addnewRoleItem = (roleItem, onSuccess, onFailure, messageSucceed) => {
    return async dispatch => {
        try {
            dispatch({ type: ROLE_TYPE.ADD_REQUEST });

            const { data, success, errors, message } = await roleService.addnewRoleItem(roleItem);

            if (success) {
                dispatch({
                    type: ROLE_TYPE.ADD_SUCCEED,
                    payload: { data }
                });

                dispatch(addSuccessNotification(messageSucceed))
                typeof onSuccess === 'function' && onSuccess({})
            }

            if (!success) {
                dispatch({
                    type: ROLE_TYPE.ADD_FAIL,
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