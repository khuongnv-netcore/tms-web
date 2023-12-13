import { lazy } from 'react'
import { pathKeys, pathNames } from '../../constants'

// ** Document title
const TemplateTitle = '%s - Vuexy React Admin Template'

// ** Default Route
const DefaultRoute = pathKeys.DASHBOARD

const DefaultRouteName = pathNames.DASHBOARD

// ** Merge Routes
const Routes = [
  {
    path: pathKeys.LOGIN,
    component: lazy(() => import('../../views/login/Login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: pathKeys.MICROSOFT_COMING_SOON,
    title: pathNames.MICROSOFT_COMING_SOON,
    component: lazy(() => import("../../views/coming_soon/microsoft_coming_soon/MicrosoftComingSoon")),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: pathKeys.DASHBOARD,
    title: pathNames.DASHBOARD,
    component: lazy(() => import('../../views/dashBoard/index')),
    layout: 'BlankLayout'
    // component: lazy(() => import('../../views/report/debug/index'))
  },
  {
    path: pathKeys.MANAGE_DATA.USER,
    title: pathNames.MANAGE_DATA.USER,
    component: lazy(() => import('../../views/manage_data/user/index')),
  },
  {
    path: pathKeys.MY_PROFILE,
    title: pathNames.MY_PROFILE,
    component: lazy(() => import('../../views/my_profile/index')),
  },
  {
    path: pathKeys.MANAGE_DATA.GENERIC_DATA_MANAGEMENT,
    title: pathNames.MANAGE_DATA.GENERIC_DATA_MANAGEMENT,
    component: lazy(() => import('../../views/manage_data/generic_data_management/index')),
  },
  {
    path: pathKeys.CUSTOMER_LANDING_PAGE,
    title: pathNames.CUSTOMER_LANDING_PAGE,
    component: lazy(() => import("../../views/customer_landing_page")),
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    },
    //permission: [ROLE_TYPES.CUSTOMER],
    //userActivated: true,
  },
  {
    path: pathKeys.ANSWER_PAGE,
    title: pathNames.ANSWER_PAGE,
    component: lazy(() => import("../../views/answer_page")),
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    },
    //permission: [ROLE_TYPES.CUSTOMER],
    //userActivated: true,
  }
  // {
  //   path: pathKeys.REPORT.DEBUG,
  //   title: pathNames.REPORT.DEBUG,
  //   component: lazy(() => import('../../views/report/debug/index'))
  // },
  // {
  //   path: pathKeys.REPORT.INVOICE_REPORT,
  //   title: pathNames.REPORT.INVOICE_REPORT,
  //   component: lazy(() => import('../../views/report/invoice_reporting/index'))
  // }
]

export { DefaultRoute, TemplateTitle, Routes, DefaultRouteName }
