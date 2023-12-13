import produce from 'immer'
import { EVENT_TYPE } from '../../../constants/actionTypes';
import { createReducer } from '../../../utils/reduxHelpers';

const initialState = {
    listEvent: [],
    pagination: {
        pageIndex: 0,
        pageCount: 10,
        total: -1,
        orderBy: "",
        sortBy: ""
    },
    activeChoices: {}
}

const handleGetListEventSucceed = produce((draftState, { payload }) => {
    const { listEvent, total } = payload;
    draftState.pagination.total = total;
    draftState.listEvent = listEvent;
    //draftState.activeChoices = {};
});

const handleUpdatePagingSetting = produce((draftState, { payload }) => {
    const { pageCount, pageIndex, orderBy, sortBy } = payload;
    draftState.pagination.pageCount = pageCount;
    draftState.pagination.pageIndex = pageIndex;
    draftState.pagination.orderBy = orderBy;
    draftState.pagination.sortBy = sortBy;
    draftState.listEvent = [];
});

const handleSetActiveChoice = produce((draftState, { payload }) => {
    const { eventId, questionId, choiceId } = payload;
    if (draftState.activeChoices[eventId] == null) {
        draftState.activeChoices[eventId] = {};
        draftState.activeChoices[eventId][questionId] = {};
        draftState.activeChoices[eventId][questionId] = { choiceId };
    } else {
        draftState.activeChoices[eventId][questionId] = { choiceId }
    }
});

export default createReducer(initialState, {
    [EVENT_TYPE.GET_LIST_SUCCEED]: handleGetListEventSucceed,
    [EVENT_TYPE.UPDATE_PAGING_SETTING]: handleUpdatePagingSetting,
    [EVENT_TYPE.SET_ACTIVE_CHOICE]: handleSetActiveChoice
})
