import { EVENT_TYPE } from "../../../constants/actionTypes";
import { addErrorNotification, addSuccessNotification } from "./globalActions";
import { eventService } from "../../../services";

export const getListEvent = (param) => {
    return async dispatch => {
        try {

            dispatch({ type: EVENT_TYPE.GET_LIST_REQUEST });

            dispatch({ type: EVENT_TYPE.UPDATE_PAGING_SETTING, payload: param });

            const {
                data,
                success,
                errors,
                message
            } = await eventService.getListEvent(param);
            
            if (success) {
                // dispatch get succeedActions
                dispatch({ 
                    type: EVENT_TYPE.GET_LIST_SUCCEED,
                    payload: data
                });
            }

            if (!success) {
                // dispatch get error
                dispatch({ 
                    type: EVENT_TYPE.GET_LIST_FAIL,
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

export const setActiveChoice = (eventId, questionId, choiceId) => {

    return async dispatch => {
        const data = {
            eventId: eventId,
            questionId: questionId,
            choiceId: choiceId
        }

        dispatch({
            type: EVENT_TYPE.SET_ACTIVE_CHOICE,
            payload: data
        });
    }
}

export const assignChoice = (choiceData, onSuccess, onFailure, messageSucceed) => {
    return async dispatch => {
        try {

            dispatch({ type: EVENT_TYPE.ASSIGN_CHOICE_REQUEST });

            const { data, success, errors, message } = await eventService.assignChoice(choiceData);

            if (success) {
                dispatch({
                    type: EVENT_TYPE.ASSIGN_CHOICE_SUCCEED
                });

                dispatch(addSuccessNotification(messageSucceed))
                typeof onSuccess === 'function' && onSuccess({})
            }

            if (!success) {
                dispatch({
                    type: EVENT_TYPE.ASSIGN_CHOICE_FAIL,
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