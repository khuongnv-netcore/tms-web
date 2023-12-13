import { configure } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

configure({ adapter: new Adapter() })

jest.mock(
  'popper.js',
  () =>
    class Popper {
      static placements = [
        'auto',
        'auto-end',
        'auto-start',
        'bottom',
        'bottom-end',
        'bottom-start',
        'left',
        'left-end',
        'left-start',
        'right',
        'right-end',
        'right-start',
        'top',
        'top-end',
        'top-start',
      ]

      constructor() {
        return {
          destroy: () => {},
          scheduleUpdate: () => {},
        }
      }
    }
)
