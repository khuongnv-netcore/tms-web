import { GLOBAL_ACTION_TYPE } from "../../../constants/actionTypes";

function addNotification({message, variant}) {
    return dispatch => {

        dispatch(
            {
                type: GLOBAL_ACTION_TYPE.ADD_NOTIFICATION, 
                payload: {
                    message,
                    variant
                }
            }
        );
    }
}

export const addErrorNotification = message => addNotification({ message, variant: 'danger' })

export const addSuccessNotification = message => addNotification({ message, variant: 'success' })

export const removeNotification = () => {
    return dispatch => {
        dispatch(
            {
                type: GLOBAL_ACTION_TYPE.REMOVE_NOTIFICATION
            }
        )
    }
}