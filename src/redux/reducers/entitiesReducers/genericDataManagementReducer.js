import produce from 'immer'
import { GENERIC_DATA_MANAGEMENT_TYPE, USER_TYPE } from '../../../constants/actionTypes';
import { createReducer } from '../../../utils/reduxHelpers';

const initialState = {
    list: [],
    pagination: {
        pageIndex: 0,
        pageCount: 10,
        total: -1,
        orderBy: "",
        sortBy: ""
    },
}

const handleGetListSucceed = produce((draftState, { payload }) => {
    const { list, total } = payload;
    draftState.pagination.total = total;
    draftState.list = list;
});

const handleUpdatePagingSetting = produce((draftState, { payload }) => {
const { pageCount, pageIndex, orderBy, sortBy } = payload;
    draftState.pagination.pageCount = pageCount;
    draftState.pagination.pageIndex = pageIndex;
    draftState.pagination.orderBy = orderBy;
    draftState.pagination.sortBy = sortBy;
    draftState.list = [];
});

export default createReducer(initialState, {
    [GENERIC_DATA_MANAGEMENT_TYPE.GET_LIST_SUCCEED]: handleGetListSucceed,
    [GENERIC_DATA_MANAGEMENT_TYPE.UPDATE_PAGING_SETTING]: handleUpdatePagingSetting

})
