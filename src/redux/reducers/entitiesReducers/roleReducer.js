import produce from 'immer'
import { ROLE_TYPE } from '../../../constants/actionTypes';
import { createReducer } from '../../../utils/reduxHelpers';

const initialState = {
    listRole: [],
    pagination: {
        pageIndex: 0,
        pageCount: 10,
        total: -1,
        orderBy: "",
        sortBy: ""
    },
}

const handleGetListRoleSucceed = produce((draftState, { payload }) => {
    const { listRole, total } = payload;
    draftState.pagination.total = total;
    draftState.listRole = listRole;
});

const handleUpdatePagingSetting = produce((draftState, { payload }) => {
    const { pageCount, pageIndex, orderBy, sortBy } = payload;
    draftState.pagination.pageCount = pageCount;
    draftState.pagination.pageIndex = pageIndex;
    draftState.pagination.orderBy = orderBy;
    draftState.pagination.sortBy = sortBy;
    draftState.listRole = [];
});

export default createReducer(initialState, {
    [ROLE_TYPE.GET_LIST_SUCCEED]: handleGetListRoleSucceed,
    [ROLE_TYPE.UPDATE_PAGING_SETTING]: handleUpdatePagingSetting
})
