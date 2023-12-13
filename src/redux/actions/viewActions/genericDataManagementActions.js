import { GENERIC_DATA_MANAGEMENT_TYPE } from "../../../constants/actionTypes";
import { addErrorNotification, addSuccessNotification } from "./globalActions";
import { genericDataManagementService } from "../../../services";

export const getList = (param) => {
    return async dispatch => {
        try {

            dispatch({ type: GENERIC_DATA_MANAGEMENT_TYPE.GET_LIST_REQUEST });

            dispatch({ type: GENERIC_DATA_MANAGEMENT_TYPE.UPDATE_PAGING_SETTING, payload: param });

            const {
                data,
                success,
                errors,
                message
            } = await genericDataManagementService.getList(param);
            
            if (success) {
                // dispatch get succeedroleActions
                dispatch({ 
                    type: GENERIC_DATA_MANAGEMENT_TYPE.GET_LIST_SUCCEED,
                    payload: data
                });
            }

            if (!success) {
                // dispatch get error
                dispatch({ 
                    type: GENERIC_DATA_MANAGEMENT_TYPE.GET_LIST_FAIL,
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

export const deleteItem = (Item, onSuccess, onFailure, messageSucceed) => {
    return async dispatch => {
        try {
            dispatch({ type: GENERIC_DATA_MANAGEMENT_TYPE.DELETE_REQUEST });
            const { success, errors, message } = await genericDataManagementService.deleteItem(Item.id);

            if (success) {
                // dispatch delete succeed
                dispatch({
                    type: GENERIC_DATA_MANAGEMENT_TYPE.DELETE_SUCCEED,
                });

                dispatch(addSuccessNotification(messageSucceed))
                typeof onSuccess === 'function' && onSuccess({})
            }

            if (!success) {
                // dispatch delete failed
                dispatch({
                    type: GENERIC_DATA_MANAGEMENT_TYPE.DELETE_FAIL,
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

export const addItem = (Item, onSuccess, onFailure, messageSucceed) => {
    return async dispatch => {
        try {
            dispatch({ type: GENERIC_DATA_MANAGEMENT_TYPE.ADD_REQUEST });

            const { data, success, errors, message } = await genericDataManagementService.addItem(Item);

            if (success) {
                dispatch({
                    type: GENERIC_DATA_MANAGEMENT_TYPE.ADD_SUCCEED,
                    payload: { data }
                });

                dispatch(addSuccessNotification(messageSucceed))
                typeof onSuccess === 'function' && onSuccess({})
            }

            if (!success) {
                dispatch({
                    type: GENERIC_DATA_MANAGEMENT_TYPE.ADD_FAIL,
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

export const updateItem = (itemData, onSuccess, onFailure, messageSucceed) => {
    return async dispatch => {
        try {

            dispatch({ type: GENERIC_DATA_MANAGEMENT_TYPE.UPDATE_ROLE_REQUEST });

            const { data, success, errors, message } = await genericDataManagementService.updateItem(itemData);

            if (success) {
                dispatch({
                    type: GENERIC_DATA_MANAGEMENT_TYPE.UPDATE_ROLE_SUCCEED
                });

                dispatch(addSuccessNotification(messageSucceed))
                typeof onSuccess === 'function' && onSuccess({})
            }

            if (!success) {
                dispatch({
                    type: GENERIC_DATA_MANAGEMENT_TYPE.UPDATE_ROLE_FAIL,
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