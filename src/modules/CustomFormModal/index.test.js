import React from 'react'
import { shallow } from 'enzyme'
import CustomFormModal from '.'

describe('CustomFormModal Text Field component should work correctly', () => {
    let wrapper
    const initProps = {}
    beforeEach(() => {
      wrapper = shallow(<CustomFormModal {...initProps} />)
    })
  
    afterEach(() => {
      wrapper.unmount()
    })
  
    it('CustomFormModal should render correctly', () => {
      expect(wrapper.exists()).toBeTruthy()
    })
})