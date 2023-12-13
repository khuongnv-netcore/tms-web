// ** Dropdowns Imports
import { Fragment, useEffect, useState } from 'react'

import UserDropdown from './UserDropdown'

// ** Third Party Components
import { Sun, Moon, Menu } from 'react-feather'
import { NavItem, NavLink } from 'reactstrap'

import { useLocation } from 'react-router-dom'
import { DefaultRouteName, Routes} from '../../../../router/routes/index'

const NavbarUser = props => {
  // ** Props
  const { skin, setSkin, setMenuVisibility } = props;
  const [pageTitle, setPageTitle] = useState(`${DefaultRouteName}`);

  const location = useLocation();

  // ** Function to toggle Theme (Light/Dark)
  const ThemeToggler = () => {
    if (skin === 'dark') {
      return <Sun className='ficon' onClick={() => setSkin('light')} />
    } else {
      return <Moon className='ficon' onClick={() => setSkin('dark')} />
    }
  }

  useEffect(() => {
    const targetRoute = Routes.find(x => x.path === location.pathname && (!x.layout || (x.layout !== "BlankLayout")))
    if (targetRoute) {
      setPageTitle(targetRoute.title);
    }
  }, [location])

  return (
    <Fragment>
      <ul className='navbar-nav d-xl-none d-flex align-items-center'>
        <NavItem className='mobile-menu mr-auto'>
          <NavLink className='nav-menu-main menu-toggle hidden-xs is-active' onClick={() => setMenuVisibility(true)}>
            <Menu className='ficon' />
          </NavLink>
        </NavItem>
      </ul>
      <div className='bookmark-wrapper d-flex align-items-center'>
        <NavItem className='d-none d-lg-block'>
          <NavLink className='nav-link-style'>
            { pageTitle }
          </NavLink>
        </NavItem>
      </div>
      <ul className='nav navbar-nav align-items-center ml-auto'>
        <UserDropdown />
      </ul>
    </Fragment>
  )
}
export default NavbarUser
