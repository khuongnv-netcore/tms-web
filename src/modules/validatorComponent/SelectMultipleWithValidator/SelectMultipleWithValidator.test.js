import React from 'react'
import { shallow } from 'enzyme'
import { SelectMultipleWithValidator } from '..'

describe('Validator Multiple Select Field component should work correctly', () => {
    let wrapper
    const initProps = {
      name: "name"
    }
    beforeEach(() => {
      wrapper = shallow(<SelectMultipleWithValidator {...initProps} />)
    })
  
    afterEach(() => {
      wrapper.unmount()
    })
  
    it('Validator Multiple Select should render correctly', () => {
      expect(wrapper.exists()).toBeTruthy()
    })
})