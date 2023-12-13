import { React, useEffect } from 'react'
import { useSkin } from '@hooks/useSkin'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { Facebook, Twitter, Mail, GitHub } from 'react-feather'
import InputPasswordToggle from '@components/input-password-toggle'
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Form, FormGroup, Label, Input, CustomInput, Button } from 'reactstrap'
import { useAuth0 } from '../../auth0';
import { common, pathKeys } from '../../constants'
import themeConfig from '@configs/themeConfig'
import logoImg from "../../assets/images/systemlogo/DaytaLogo.svg"
import loginGoogleImg from "../../assets/images/svg/logingoogleimg.svg"
import loginMicrosoftImg from "../../assets/images/svg/loginmicrosoftimg.svg"

import '@styles/base/pages/page-auth.scss'
import SpinnerComponent from '../../@core/components/spinner/Fallback-spinner'
import './login.scss'
const Login = () => {
  const { loginWithRedirect, loading } = useAuth0()
  const history = useHistory();
  useEffect(() => {
    loginWithRedirect()
  }, [loginWithRedirect])

  return (
    <SpinnerComponent />
  )
}

export default Login
