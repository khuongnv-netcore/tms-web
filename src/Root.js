// ** React Imports
import { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from "prop-types";

// ** Redux Imports
import { Provider } from 'react-redux'
import { store } from './redux/storeConfig/store'

// ** Intl, CASL & ThemeColors Context
import ability from './configs/acl/ability'
import { ToastContainer } from 'react-toastify'
import { AbilityContext } from './utility/context/Can'
import { ThemeContext } from './utility/context/ThemeColors'
import { IntlProviderWrapper } from './utility/context/Internationalization'

// ** Spinner (Splash Screen)
import Spinner from './@core/components/spinner/Fallback-spinner'

// ** Ripple Button
import './@core/components/ripple-button'

// ** PrismJS
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-jsx.min'

// ** React Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** React Toastify
import '@styles/react/libs/toastify/toastify.scss'

// ** Core styles
import './@core/assets/fonts/feather/iconfont.css'
import './@core/scss/core.scss'
import './assets/scss/style.scss'

// * font custom
import './@core/assets/fonts/TextFont/Inter/Inter.css'


import { useAuth0 } from './auth0';
import ReduxToastr from 'react-redux-toastr';
import { Notifier } from './modules';


const Root = ({ store }) => {
  const { loading } = useAuth0();
  
  // ** Lazy load app
  // eslint-disable-next-line no-unused-vars
  const LazyApp = lazy(() => import('./App'))

  if (loading) {
    return <Spinner />;
  }

  return (
    <Provider store={store}>
      <Suspense fallback={<Spinner />}>
        <AbilityContext.Provider value={ability}>
          <ThemeContext>
            <IntlProviderWrapper>
              <LazyApp />
              <ToastContainer newestOnTop />
              <Notifier />
            </IntlProviderWrapper>
          </ThemeContext>
        </AbilityContext.Provider>
      </Suspense>
    </Provider>
  );
};

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
