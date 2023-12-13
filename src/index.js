// ** React Imports
import ReactDOM from 'react-dom'

// ** Redux Imports
import { store } from './redux/storeConfig/store'

// ** Ripple Button
// import './@core/components/ripple-button'

// ** PrismJS
// import 'prismjs'
// import 'prismjs/themes/prism-tomorrow.css'
// import 'prismjs/components/prism-jsx.min'

// ** React Perfect Scrollbar
// import 'react-perfect-scrollbar/dist/css/styles.css'

// ** React Toastify
import '@styles/react/libs/toastify/toastify.scss'

// ** Core styles
// import './@core/assets/fonts/feather/iconfont.css'
// import './@core/scss/core.scss'
// import './assets/scss/style.scss'

// ** Service Worker
import * as serviceWorker from './serviceWorker'

import * as Sentry from '@sentry/react'
import {history} from "./redux/store/configureStore";
// eslint-disable-next-line no-unused-vars
import Root from './Root'
// eslint-disable-next-line no-unused-vars
import { Auth0Provider } from './auth0';
import './translations/index'

const onRedirectCallback = appState => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

const { REACT_APP_SENTRY_ENVIRONMENT: sentryEnvironment, REACT_APP_PACKAGE_VERSION, REACT_APP_PACKAGE_NAME } = process.env

const sentryReleaseVersion = `${REACT_APP_PACKAGE_NAME}@${REACT_APP_PACKAGE_VERSION}`

if (sentryReleaseVersion && sentryEnvironment && sentryEnvironment !== 'local') {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    environment: sentryEnvironment,
    release: sentryReleaseVersion,
  })
}

ReactDOM.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN}
    client_id={process.env.REACT_APP_AUTH0_CLIENT_ID}
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
    responseType='token id_token'
    audience={process.env.REACT_APP_AUTH0_AUDIENCE}
  >
    <Root store={store}/>
  </Auth0Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
