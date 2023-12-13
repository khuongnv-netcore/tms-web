import {
    CHANGE_SELECT_DROPDOWN,
} from '../../constants/profileActions'

export function changeSelectDropdown(value) {
    return dispatch => {
        dispatch({
            type: CHANGE_SELECT_DROPDOWN,
            payload: {
                value
            }
        })
    }
}
