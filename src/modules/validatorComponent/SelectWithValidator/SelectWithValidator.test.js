import React from 'react'
import { shallow } from 'enzyme'
import { SelectWithValidator } from '..'

describe('Validator Select Field component should work correctly', () => {
    let wrapper
    const initProps = {
      name: "name"
    }
    beforeEach(() => {
      wrapper = shallow(<SelectWithValidator {...initProps} />)
    })
  
    afterEach(() => {
      wrapper.unmount()
    })
  
    it('Validator Select should render correctly', () => {
      expect(wrapper.exists()).toBeTruthy()
    })
})