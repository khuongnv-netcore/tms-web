import produce from 'immer'
import { createSelector } from 'reselect'

const entitiesSelector = produce(state => state.entities)

export const roleSelector = createSelector(entitiesSelector, produce(state => state.role))

export const roleDataSelector = {
    listRole: createSelector(roleSelector, produce(state => state.listRole)),
    pagination: createSelector(roleSelector, produce(state => state.pagination)),
}

export const userSelector = createSelector(entitiesSelector, produce(state => state.user))

export const userDataSelector = {
    listUser: createSelector(userSelector, produce(state => state.listUser)),
    pagination: createSelector(userSelector, produce(state => state.pagination)),
    currentUser: createSelector(userSelector, produce(state => state.currentUser))
}

export const genericDataManagementSelector = createSelector(entitiesSelector, produce(state => state.genericDataManagement))

export const genericDataManagementDataSelector = {
    list: createSelector(genericDataManagementSelector, produce(state => state.list)),
    pagination: createSelector(genericDataManagementSelector, produce(state => state.pagination)),
}

export const eventSelector = createSelector(entitiesSelector, produce(state => state.event))

export const eventDataSelector = {
    listEvent: createSelector(eventSelector, produce(state => state.listEvent)),
    pagination: createSelector(eventSelector, produce(state => state.pagination)),
    activeChoices: createSelector(eventSelector, produce(state => state.activeChoices))
}