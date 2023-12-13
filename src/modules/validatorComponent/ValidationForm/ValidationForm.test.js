import React from 'react'
import { shallow } from 'enzyme'
import ValidationForm from './ValidationForm'

const mockTranslationText = 'SAMPLE TRANSLATED TEXT'
jest.mock('react-i18next', () => ({
  ...jest.requireActual('react-i18next'),
  useTranslation: jest.fn(() => [() => mockTranslationText]),
}))

describe('ValidationForm form component should work correctly', () => {
    let wrapper
    const onSubmit = jest.fn().mockImplementation((_, cb) => cb())
    const formContext = {
        handleSubmit: onSubmit
    }
    const initProps = {
        formContext
    }
    beforeEach(() => {
      wrapper = shallow(<ValidationForm {...initProps} />)
    })
  
    afterEach(() => {
      wrapper.unmount()
    })
  
    it('ValidationForm should render correctly', () => {
      expect(wrapper.exists()).toBeTruthy()
    })
})