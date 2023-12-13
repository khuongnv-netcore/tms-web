// ** React Imports
import { Suspense, useContext, lazy } from 'react'

// ** Utils
// import { isUserLoggedIn } from '@utils'
import { useLayout } from '@hooks/useLayout'
import { AbilityContext } from '@src/utility/context/Can'
import { useRouterTransition } from '@hooks/useRouterTransition'

// ** Custom Components
// import Spinner from '@components/spinner/Loading-spinner' // Uncomment if your require content fallback
import LayoutWrapper from '@layouts/components/layout-wrapper'

// ** Router Components
import { BrowserRouter as AppRouter, Route, Switch, Redirect } from 'react-router-dom'

// ** Routes & Default Routes
import { DefaultRoute, Routes } from './routes'

// ** Layouts
import BlankLayout from '@layouts/BlankLayout'
import VerticalLayout from '@src/layouts/VerticalLayout'

import { useAuth0 } from '../auth0';
import { getUserData } from '@utils';

const Router = () => {
  // ** Hooks
  const [layout, setLayout] = useLayout()
  const [transition, setTransition] = useRouterTransition()
  const { isAuthenticated, isAdmin } = useAuth0();

  // ** Default Layout
  const DefaultLayout = 'VerticalLayout'

  // ** All of the available layouts
  const Layouts = { BlankLayout, VerticalLayout }

  // ** Current Active Item
  const currentActiveItem = null

  // ** Return Filtered Array of Routes & Paths
  const LayoutRoutesAndPaths = layout => {
    const LayoutRoutes = []
    const LayoutPaths = []

    if (Routes) {
      Routes.filter(route => {
        // ** Checks if Route layout or Default layout matches current layout
        if (route.layout === layout || (route.layout === undefined && DefaultLayout === layout)) {
          LayoutRoutes.push(route)
          LayoutPaths.push(route.path)
        }
      })
    }

    return { LayoutRoutes, LayoutPaths }
  }

  // ** Init Error Component
  const Error = lazy(() => import('../views/error/Error'))
  const CustomerLandingPage = lazy(() =>
  import("../views/answer_page")
  );

  const NotAdminAuthorize = lazy(() => import('../views/not_admin_authorize/index'))

  /**
   ** Final Route Component Checks for Login & User Role and then redirects to the route
   */
  const FinalRoute = props => {
    const route = props.route
    let action, resource
    
    // ** Assign vars based on route meta
    if (route.meta) {
      action = route.meta.action ? route.meta.action : null
      resource = route.meta.resource ? route.meta.resource : null
    }
    //If not authenticated
    if (!isAuthenticated) {
      //if route is a public route, show it
      if(route.meta && route.meta.publicRoute) {
        return <route.component {...props} />
      }
      //if route is not public, redirect to the public landing page.
      return <Redirect to="/" />;
    }

    const userData = getUserData();
    if (
      (!isAuthenticated && route.meta === undefined) ||
      (!isAuthenticated && route.meta && !route.meta.authRoute && !route.meta.publicRoute) ||
      !userData
    ) {
      /**
       ** If user is not Logged in & route meta is undefined
       ** OR
       ** If user is not Logged in & route.meta.authRoute, !route.meta.publicRoute are undefined
       ** Then redirect user to login
       */

      return <Redirect to='/login' />
    } else if (route.meta && route.meta.authRoute && isAuthenticated) {
      // ** If route has meta and authRole and user is Logged in then redirect user to home page (DefaultRoute)
      return <Redirect to='/' />
    // } else if (DefaultRoute === "NoInformationCustomer") {
    //   // if user did not complete its information
    //   return <Redirect to={DefaultRoute} />;
    } else {
      // ** If none of the above render component
      return <route.component {...props} />
    }
  }

  // ** Return Route to Render
  const ResolveRoutes = () => {
    return Object.keys(Layouts).map((layout, index) => {
      // ** Convert Layout parameter to Layout Component
      // ? Note: make sure to keep layout and component name equal

      const LayoutTag = Layouts[layout]

      // ** Get Routes and Paths of the Layout
      const { LayoutRoutes, LayoutPaths } = LayoutRoutesAndPaths(layout)

      // ** We have freedom to display different layout for different route
      // ** We have made LayoutTag dynamic based on layout, we can also replace it with the only layout component,
      // ** that we want to implement like VerticalLayout or HorizontalLayout
      // ** We segregated all the routes based on the layouts and Resolved all those routes inside layouts

      // ** RouterProps to pass them to Layouts
      const routerProps = {}
      return (
        <Route path={LayoutPaths} key={index}>
          <LayoutTag
            routerProps={routerProps}
            layout={layout}
            setLayout={setLayout}
            transition={transition}
            setTransition={setTransition}
            currentActiveItem={currentActiveItem}
          >
            <Switch>
              {LayoutRoutes.map(route => {
                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    exact={route.exact === true}
                    render={props => {
                      // ** Assign props to routerProps
                      Object.assign(routerProps, {
                        ...props,
                        meta: route.meta,
                      })

                      return (
                        <Suspense fallback={null}>
                          {/* Layout Wrapper to add classes based on route's layout, appLayout and className */}
                          <LayoutWrapper
                            layout={DefaultLayout}
                            transition={transition}
                            setTransition={setTransition}
                            /* Conditional props */
                            /*eslint-disable */
                            {...(route.appLayout
                              ? {
                                  appLayout: route.appLayout
                                }
                              : {})}
                            {...(route.meta
                              ? {
                                  routeMeta: route.meta
                                }
                              : {})}
                            {...(route.className
                              ? {
                                  wrapperClass: route.className
                                }
                              : {})}
                            /*eslint-enable */
                          >
                            <FinalRoute route={route} {...props} />
                          </LayoutWrapper>
                        </Suspense>
                      )
                    }}
                  />
                )
              })}
            </Switch>
          </LayoutTag>
        </Route>
      )
    })
  }

  return (
    <AppRouter basename={process.env.REACT_APP_BASENAME}>
      {
        isAdmin === false ? (
          isAuthenticated === false ? (
            <Switch>
              <Route path="/login" component={lazy(() => import('../views/login/Login'))} />
              {isAuthenticated === false ? (
              <Route path="" component={CustomerLandingPage} />
              ) : null}
              <Route
                exact
                path='*'
                render={() => {
                  return <Redirect to='/login' />
                }}
              />
            </Switch>
          ) : (
            <Switch>
              <Route path='*' component={NotAdminAuthorize} />
            </Switch>
          )
        ) : (
          <Switch>
            {/* If user is logged in Redirect user to DefaultRoute else to login */}
            <Route path="/login" component={lazy(() => import('../views/login/Login'))} />
            <Route
              exact
              path='/'
              render={() => {
                return isAuthenticated ? <Redirect to={DefaultRoute} /> : <Redirect to='/login' />
              }}
            />
            {ResolveRoutes()}
            <Route path="/microsoft-coming-soon" component={lazy(() => import('../views/coming_soon/microsoft_coming_soon/MicrosoftComingSoon'))} />
            {/* NotFound Error page */}
            <Route path='*' component={Error} />
          </Switch>
        )
      }
    </AppRouter>
  //   <AppRouter basename={process.env.REACT_APP_BASENAME}>
  //   {
  //     <Switch>
  //       {/* If user is logged in Redirect user to DefaultRoute else to login */}
  //       <Route
  //         path="/login"
  //         component={lazy(() => import("../views/login/Login"))}
  //       />
  //       {isAuthenticated === false ? (
  //         <Route path="" component={CustomerLandingPage} />
  //       ) : null}
  //       <Route
  //         exact
  //         path="/"
  //         render={() => {
  //           return isAuthenticated ? (
  //             <Redirect to={DefaultRoute} />
  //           ) : (
  //             <Redirect to="" />
  //           );
  //         }}
  //       />
  //       {ResolveRoutes()}
  //       {/* NotFound Error page */}
  //       <Route path="*" component={Error} />
  //     </Switch>
  //   }
  // </AppRouter>
  )
}

export default Router
