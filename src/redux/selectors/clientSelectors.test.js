import { fromJS } from 'immutable'

import * as clientSelectors from './clientSelectors'


const state = fromJS({
  clientReducer: {
    activities: {
      items: ['sample', 'activities', 'item']
    },
    appointments: {
      items: ['sample', 'appointments', 'item'],
      itemsFetching: false,
      updateAppointmentRequest: false,
      createAppointmentRequest: false,
    },
    documents: {
      items: null,
      skip: 0,
      itemsFetching: false,
      uploadDocumentsRequest: false,
      uploadDocumentsSuccess: false,
      canSeeMore: false,
    },
    user: {
      cognitiveBaseline: null,
      paymentIntent: null,
      coupon: null,
      applingCoupon: false
    }
  }
})


describe('activitiesSelector selectors should work correctly', () => {

  const { activitiesSelector, appointmentsSelector } = clientSelectors
  const activities = state.getIn(['clientReducer', 'activities'])
  const appointmentsState = state.getIn(['clientReducer', 'appointments'])

  it('selectActivities should work correctly', () => {
    const expectedItems = activities.get('items')
    const actualItems = activitiesSelector.selectActivities(state)
    expect(actualItems).toEqual(expectedItems)
  })

  it('selectIsActivitiesFetching should work correctly', () => {
    const expectedItems = activities.get('itemsFetching')
    const actualItems = activitiesSelector.selectIsActivitiesFetching(state)
    expect(actualItems).toEqual(expectedItems)
  })

  it('selectToggleActivityStatusSuccess should work correctly', () => {
    const expectedItems = activities.get('toggleActivityStatusSuccess')
    const actualItems = activitiesSelector.selectToggleActivityStatusSuccess(state)
    expect(actualItems).toEqual(expectedItems)
  })

  it('selectToggleActivityStatusFetching should work correctly', () => {
    const expectedItems = activities.get('toggleActivityStatusFetching')
    const actualItems = activitiesSelector.selectToggleActivityStatusFetching(state)
    expect(actualItems).toEqual(expectedItems)
  })

  it('selectAppointments should work correctly', () => {
    const expectedItems = appointmentsState.get('items')
    const actualItems = appointmentsSelector.selectAppointments(state)
    expect(actualItems).toEqual(expectedItems)
  })

  it('selectAppointmentsRequest should work correctly', () => {
    const expectedItems = appointmentsState.get('itemsFetching')
    const actualItems = appointmentsSelector.selectAppointmentsRequest(state)
    expect(actualItems).toEqual(expectedItems)
  })

  it('selectUpdateAppointmentRequest should work correctly', () => {
    const expectedItems = appointmentsState.get('updateAppointmentRequest')
    const actualItems = appointmentsSelector.selectUpdateAppointmentRequest(state)
    expect(actualItems).toEqual(expectedItems)
  })

  it('selectCreateAppointmentFetching should work correctly', () => {
    const expectedItems = appointmentsState.get('createAppointmentRequest')
    const actualItems = appointmentsSelector.selectCreateAppointmentFetching(state)
    expect(actualItems).toEqual(expectedItems)
  })

  it('selectPastDueActivitiesCount should work correctly', () => {
    const expectedItems = activities.get('pastDueItemsCount')
    const actualItems = activitiesSelector.selectPastDueActivitiesCount(state)
    expect(actualItems).toEqual(expectedItems)
  })

  it('selectPastDueActivities should work correctly', () => {
    const expectedItems = activities.get('pastDueItems')
    const actualItems = activitiesSelector.selectPastDueActivities(state)
    expect(actualItems).toEqual(expectedItems)
  })

  it('selectIsPastDueActivitiesFetching should work correctly', () => {
    const expectedItems = activities.get('pastDueItemsFetching')
    const actualItems = activitiesSelector.selectIsPastDueActivitiesFetching(state)
    expect(actualItems).toEqual(expectedItems)
  })
})

describe('documentsSelector selectors should work correctly', () => {

  const { documentsSelector } = clientSelectors
  const documents = state.getIn(['clientReducer', 'documents'])

  it('selectDocuments should work correctly', () => {
    const expectedItems = documents.get('items')
    const actualItems = documentsSelector.selectDocuments(state)
    expect(actualItems).toEqual(expectedItems)
  })

  it('selectDocumentsFetching should work correctly', () => {
    const expectedItems = documents.get('itemsFetching')
    const actualItems = documentsSelector.selectDocumentsFetching(state)
    expect(actualItems).toEqual(expectedItems)
  })

  it('selectDocumentsSkip should work correctly', () => {
    const expectedItems = documents.get('skip')
    const actualItems = documentsSelector.selectDocumentsSkip(state)
    expect(actualItems).toEqual(expectedItems)
  })

  it('selectUploadDocumentsFetching should work correctly', () => {
    const expectedItems = documents.get('uploadDocumentsRequest')
    const actualItems = documentsSelector.selectUploadDocumentsFetching(state)
    expect(actualItems).toEqual(expectedItems)
  })

  it('selectUploadDocumentsSuccess should work correctly', () => {
    const expectedItems = documents.get('uploadDocumentsSuccess')
    const actualItems = documentsSelector.selectUploadDocumentsSuccess(state)
    expect(actualItems).toEqual(expectedItems)
  })

  it('selectCanSeeMoreDocument should work correctly', () => {
    const expectedItems = documents.get('canSeeMore')
    const actualItems = documentsSelector.selectCanSeeMoreDocument(state)
    expect(actualItems).toEqual(expectedItems)
  })
})

describe('userSelector selectors should work correctly', () => {

  const { userSelector } = clientSelectors
  const documents = state.getIn(['clientReducer', 'user'])

  it('selectCognitiveBaseline should work correctly', () => {
    const expectedItems = documents.get('cognitiveBaseline')
    const actualItems = userSelector.selectCognitiveBaseline(state)
    expect(actualItems).toEqual(expectedItems)
  })

  it('selectPaymentIntent should work correctly', () => {
    const expectedItems = documents.get('paymentIntent')
    const actualItems = userSelector.selectPaymentIntent(state)
    expect(actualItems).toEqual(expectedItems)
  })

  it('selectCoupon should work correctly', () => {
    const expectedItems = documents.get('coupon')
    const actualItems = userSelector.selectCoupon(state)
    expect(actualItems).toEqual(expectedItems)
  })

  it('selectApplingCoupon should work correctly', () => {
    const expectedItems = documents.get('applingCoupon')
    const actualItems = userSelector.selectApplingCoupon(state)
    expect(actualItems).toEqual(expectedItems)
  })

  it('selectUpdateAvatarFetching should work correctly', () => {
    const expectedItems = documents.get('updateAvatarFetching')
    const actualItems = userSelector.selectUpdateAvatarFetching(state)
    expect(actualItems).toEqual(expectedItems)
  })

  it('selectProfilePictureUrl should work correctly', () => {
    const expectedItems = documents.get('profilePictureUrl')
    const actualItems = userSelector.selectProfilePictureUrl(state)
    expect(actualItems).toEqual(expectedItems)
  })
})
