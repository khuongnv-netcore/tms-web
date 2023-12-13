/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from "react";
import createAuth0Client from "@auth0/auth0-spa-js";
import * as jwtDecode from "jwt-decode";

import UserService from "../services/userService";
import { pathKeys, common } from '../constants';
import { cookie } from '../utils';

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname);

/* istanbul ignore next */
export const getTokenSilently = async () => {
  const auth0 = await createAuth0Client({
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
    redirect_uri: window.location.origin,
    audience: process.env.REACT_APP_AUTH0_AUDIENCE
  });
  return auth0.getTokenSilently();
};

export const requestChangePasswordEmail = async (params) => {

  const webAuth = new window.auth0.WebAuth({
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    clientID: process.env.REACT_APP_AUTH0_CLIENT_ID
  });

  return new Promise((resolve) => {
    webAuth.changePassword({
      connection: process.env.REACT_APP_AUTH0_CONNECTION,
      email: params.email
    }, (err, resp) => {
      if (err) {
        resolve({ isSuccess: false, message: err.message || "Connect no found" });
      } else {
        resolve({ isSuccess: true, message: resp });
      }
    });
  })
};

export const setToken = token => {
  cookie.setCookie(common.TOKEN_KEY, token);
};

/* istanbul ignore next */
export const getToken = async () => {
  let token = cookie.getCookie(common.TOKEN_KEY);
  const decoded = token ? jwtDecode(token) : null;

  if (!decoded || decoded.exp < Date.now() / 1000) {
    token = await getTokenSilently();
  }

  return token;
};

export const Auth0Context = React.createContext();
/* istanbul ignore next */
export const useAuth0 = () => useContext(Auth0Context);
export const Auth0Provider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [user, setUser] = useState();
  const [auth0Client, setAuth0] = useState();
  const [loading, setLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client(initOptions);
      setAuth0(auth0FromHook);

      if (
        window.location.search.includes("code=") &&
        window.location.search.includes("state=")
      ) {
        const { appState } = await auth0FromHook.handleRedirectCallback();
        onRedirectCallback(appState);
      }

      const isAuthenticated = await auth0FromHook.isAuthenticated();

      setIsAuthenticated(isAuthenticated);

      /* istanbul ignore else */
      if (isAuthenticated) {
        const token = await auth0FromHook.getTokenSilently();
        setToken(token);

        const user = await auth0FromHook.getUser();
        let retrievedUserInfo = {};

        const [userInfo] = await Promise.all([
          UserService.getUserInfo()
        ])

        if (!userInfo || !userInfo.success || !userInfo.data) {
          setUser({ ...user, ...retrievedUserInfo });
          setLoading(false);
          auth0FromHook.logout({ returnTo: `${window.location.origin}${pathKeys.LOGIN}` });
          return;
        } else {
          const token = await auth0FromHook.getTokenSilently();

          setToken(token);

          window.gtag('set', { 'user_id': userInfo.data.id });

          retrievedUserInfo = {
            ...userInfo.data,
            token
          }
        }

        setUser({ ...user, ...retrievedUserInfo });
        localStorage.setItem('userData', JSON.stringify({ ...user, ...retrievedUserInfo }))
      }

      setLoading(false);
    };
    initAuth0();
    // eslint-disable-next-line
  }, []);

  /* istanbul ignore next */
  const loginWithPopup = async (params = {}) => {
    setPopupOpen(true);
    try {
      await auth0Client.loginWithPopup(params);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      setPopupOpen(false);
    }
    const user = await auth0Client.getUser();
    setUser(user);
    setIsAuthenticated(true);
  };

  /* istanbul ignore next */
  const handleRedirectCallback = async () => {
    setLoading(true);
    await auth0Client.handleRedirectCallback();
    const user = await auth0Client.getUser();
    setLoading(false);
    setIsAuthenticated(true);
    setUser(user);
  };
  /* istanbul ignore next */
  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
        loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
        getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
        getTokenWithPopup: (...p) => auth0Client.getTokenWithPopup(...p),        
        requestChangePasswordEmail: (...p) => requestChangePasswordEmail(...p),
        logout: (...p) => {
          cookie.deleteCookie(common.TOKEN_KEY)
          localStorage.removeItem('userData')
          auth0Client.logout(...p)
        },
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};
