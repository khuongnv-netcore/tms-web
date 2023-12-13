/* eslint-disable no-console */
import React, { useState as useStateMock} from 'react'
import { mount, shallow } from 'enzyme'
import createAuth0Client from "@auth0/auth0-spa-js";

import { Auth0Provider } from './index'

import UserService from "../services/userService";

jest.mock('@auth0/auth0-spa-js');

jest.mock("../services/userService")

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(init => [init, jest.fn()])
}))

describe('Auth0Provider component should work correctly', () => {
  let wrapper
  const user = {
    givenName: "givenName",
    familyName: "familyName",
    email: "email",
    userType: "userType",
    roles: [
      {
        roleType: "Administrator"
      }
    ]
  }
  const createAuth0ClientMock = jest.fn()
  const mockLogout = jest.fn()
  const handleRedirectCallbackMock = jest.fn()
  const mockSetState = jest.fn();

  beforeEach(() => {
    Object.defineProperty(window, 'gtag', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
    createAuth0ClientMock.mockImplementation(() => ({
      isAuthenticated: jest.fn().mockImplementation(() => true),
      getUser: jest.fn().mockImplementation(() => ({})),
      getTokenSilently: jest.fn().mockImplementation(() => 'token'),
      logout: mockLogout,
      handleRedirectCallback: handleRedirectCallbackMock
    }));

    createAuth0Client.mockImplementation(createAuth0ClientMock)

    useStateMock.mockImplementation(init => [init, mockSetState])
  })

  afterEach(() => {
    wrapper && wrapper.unmount && wrapper.unmount()
    jest.clearAllMocks()
  })

  it('Auth0Provider should render correctly', () => {
    wrapper = shallow(<Auth0Provider />)
    expect(wrapper.exists()).toBeTruthy()
  })

  it('Auth0Provider should handle initAuth0 correctly', async () => {
    useStateMock.mockImplementation(init => [init, mockSetState])

    UserService.getUserInfo.mockImplementation(() => ({ success: true, data: user }))

    wrapper = mount(<Auth0Provider />)

    await new Promise((r) => setTimeout(r, 700));

    expect(createAuth0ClientMock).toHaveBeenCalledTimes(1)
    expect(UserService.getUserInfo).toHaveBeenCalledTimes(1)
    expect(mockSetState).toHaveBeenCalledWith({ token: 'token', ...user })
  })

  it('Auth0Provider should logout if cannot get user info from API', async () => {
    UserService.getUserInfo.mockImplementation(() => null)

    wrapper = mount(<Auth0Provider />)

    await new Promise((r) => setTimeout(r, 700));

    expect(createAuth0ClientMock).toHaveBeenCalledTimes(1)
    expect(UserService.getUserInfo).toHaveBeenCalledTimes(1)
    expect(mockLogout).toHaveBeenCalledTimes(1)
  })

  it('Auth0Provider should handle redirect correctly', async () => {
    global.window = Object.create(window);
    const url = "http://dummy.com?code=code&state=state";
    Object.defineProperty(window, "location", {
        value: new URL(url),
        writable: true
    });

    handleRedirectCallbackMock.mockImplementation(() => ({ appState: {} }))

    UserService.getUserInfo.mockImplementation(() => null)

    wrapper = mount(<Auth0Provider />)

    await new Promise((r) => setTimeout(r, 700));

    expect(createAuth0ClientMock).toHaveBeenCalledTimes(1)
    expect(handleRedirectCallbackMock).toHaveBeenCalledTimes(1)
  })
})
