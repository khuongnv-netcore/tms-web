import React from 'react'
import { shallow } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { User } from '.'
// const mockCurrentUserId = 'MOCK_USERID'
// jest.mock('../../components/auth0', () => ({
//   ...jest.requireActual('../../components/auth0'),
//   useAuth0: jest.fn(() => ({
//     user: { id: mockCurrentUserId }
//   }))
// }))

jest.mock('react-i18next', () => ({
    // this mock makes sure any components using the translate hook can use it without a warning being shown
    useTranslation: () => {
      return {
        t: (str) => str,
        i18n: {
          changeLanguage: () => new Promise(() => {}),
        },
      };
    },
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(() => ({ id: 'clientId' })),
}))

describe('User component should work correctly', () => {
    let store, wrapper
    const initProps = {}

    const initialState = {output:10}
    const mockStore = configureStore()
    // eslint-disable-next-line prefer-const
    store = mockStore(initialState)
    beforeEach(() => {
      wrapper = shallow(
        <Provider store={store}>
            <User {...initProps} />
        </Provider>
      )
    })
  
    afterEach(() => {
      wrapper.unmount()
      jest.clearAllMocks()
    })
  
    it('User should render correctly', () => {
      expect(wrapper.exists()).toBeTruthy()
    })
})