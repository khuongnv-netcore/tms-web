import React from 'react'
import { shallow } from 'enzyme'
import CustomConfirmModal from '.'

describe('CustomConfirmModal Text Field component should work correctly', () => {
    let wrapper
    const initProps = {}
    beforeEach(() => {
      wrapper = shallow(<CustomConfirmModal {...initProps} />)
    })
  
    afterEach(() => {
      wrapper.unmount()
    })
  
    it('CustomConfirmModal should render correctly', () => {
      expect(wrapper.exists()).toBeTruthy()
    })
})