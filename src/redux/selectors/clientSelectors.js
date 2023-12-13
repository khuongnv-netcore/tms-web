import { createSelector } from 'reselect'

const clientReducer = state => state.get('clientReducer')

// -- mapped activities state -->
const activitiesState = createSelector(clientReducer, state =>
  state.get('activities')
)
export const activitiesSelector = {
  selectActivities: createSelector(activitiesState, state =>
    state.get('items')
  ),
  selectIsActivitiesFetching: createSelector(activitiesState, state =>
    state.get('itemsFetching')
  ),
  selectPastDueActivitiesCount: createSelector(activitiesState, state =>
    state.get('pastDueItemsCount')
  ),
  selectPastDueActivities: createSelector(activitiesState, state =>
    state.get('pastDueItems')
  ),
  selectIsPastDueActivitiesFetching: createSelector(activitiesState, state =>
    state.get('pastDueItemsFetching')
  ),
  selectToggleActivityStatusSuccess: createSelector(activitiesState, state =>
    state.get('toggleActivityStatusSuccess')
  ),
  selectToggleActivityStatusFetching: createSelector(activitiesState, state =>
    state.get('toggleActivityStatusFetching')
  )
}

const appointmentsState = createSelector(clientReducer, state =>
  state.get('appointments')
)
export const appointmentsSelector = {
  selectAppointments: createSelector(appointmentsState, state =>
    state.get('items')
  ),
  selectAppointmentsRequest: createSelector(appointmentsState, state =>
    state.get('itemsFetching')
  ),
  selectUpdateAppointmentRequest: createSelector(appointmentsState, state => state.get('updateAppointmentRequest')),
  selectCreateAppointmentFetching: createSelector(appointmentsState, state => state.get('createAppointmentRequest')),
}

const documentsState = createSelector(clientReducer, state =>
  state.get('documents')
)
export const documentsSelector = {
  selectDocuments: createSelector(documentsState, state => state.get('items')),
  selectDocumentsFetching: createSelector(documentsState, state => state.get('itemsFetching')),
  selectDocumentsSkip: createSelector(documentsState, state => state.get('skip')),
  selectUploadDocumentsFetching: createSelector(documentsState, state => state.get('uploadDocumentsRequest')),
  selectUploadDocumentsSuccess: createSelector(documentsState, state => state.get('uploadDocumentsSuccess')),
  selectCanSeeMoreDocument: createSelector(documentsState, state => state.get('canSeeMore')),
}

const userState = createSelector(clientReducer, state =>
  state.get('user')
)
export const userSelector = {
  selectCognitiveBaseline: createSelector(userState, state => state.get('cognitiveBaseline')),
  selectPaymentIntent: createSelector(userState, state => state.get('paymentIntent')),
  selectCoupon: createSelector(userState, state => state.get('coupon')),
  selectApplingCoupon: createSelector(userState, state => state.get('applingCoupon')),
  selectUpdateAvatarFetching: createSelector(userState, state => state.get('updateAvatarFetching')),
  selectProfilePictureUrl: createSelector(userState, state => state.get('profilePictureUrl')),
}

const cognitiveBaselineState = createSelector(clientReducer, state =>
  state.get('cognitiveBaseline')
)
export const cognitiveBaselineSelector = {
  selectListCognitiveBaseline: createSelector(cognitiveBaselineState, state =>
    state.get('items')
  ),
  selectListCognitiveBaselineRequest: createSelector(cognitiveBaselineState, state =>
    state.get('itemsFetching')
  )
}
