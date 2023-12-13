import React from 'react'
import { shallow } from 'enzyme'
import TextFieldWithValidator from './TextFieldWithValidator'

describe('Validator Text Field component should work correctly', () => {
    let wrapper
    const initProps = {
      name: "name"
    }
    beforeEach(() => {
      wrapper = shallow(<TextFieldWithValidator {...initProps} />)
    })
  
    afterEach(() => {
      wrapper.unmount()
    })
  
    it('ValidatorTextField should render correctly', () => {
      expect(wrapper.exists()).toBeTruthy()
    })
})