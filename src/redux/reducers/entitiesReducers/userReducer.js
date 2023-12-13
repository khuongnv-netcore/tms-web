import produce from 'immer'
import { USER_TYPE } from '../../../constants/actionTypes';
import { createReducer } from '../../../utils/reduxHelpers';

const initialState = {
    listUser: [],
    pagination: {
        pageIndex: 0,
        pageCount: 10,
        total: -1,
        orderBy: "",
        sortBy: ""
    },
    currentUser: null
}

const handleGetListUserSucceed = produce((draftState, { payload }) => {
    const { listUser, total } = payload;
    draftState.pagination.total = total;
    draftState.listUser = listUser;
});

const handleGetCurrentUserSucceed = produce((draftState, { payload }) => {
    draftState.currentUser = payload;
});

const handleUpdatePagingSetting = produce((draftState, { payload }) => {
const { pageCount, pageIndex, orderBy, sortBy } = payload;
    draftState.pagination.pageCount = pageCount;
    draftState.pagination.pageIndex = pageIndex;
    draftState.pagination.orderBy = orderBy;
    draftState.pagination.sortBy = sortBy;
    draftState.listUser = [];
});

export default createReducer(initialState, {
    [USER_TYPE.GET_CURRENT_USER_SUCCEED]: handleGetCurrentUserSucceed,
    [USER_TYPE.GET_LIST_SUCCEED]: handleGetListUserSucceed,
    [USER_TYPE.UPDATE_PAGING_SETTING]: handleUpdatePagingSetting

})
