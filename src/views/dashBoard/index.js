import React, { useState } from 'react'
import { Row, Button, Card, CardImg, CardBody, CardText } from "reactstrap";
import logoImg from "../../assets/images/systemlogo/DaytaLogo.svg"
import "./index.scss";
import { useAuth0 } from "../../auth0"
import { pathKeys } from "../../constants"
import { getUserData } from '@utils';
import {
  calendarService
} from "../../services/index";
import { useHistory, Redirect } from 'react-router-dom'
import { TERM_OF_USE } from '../../constants/common';

const StaticsItem = (props) => {
  return (
    <>
      Dash board status

    </>
  )
}

const DashBoard = () => {
  const { logout } = useAuth0()
  const history = useHistory();
  const [confirmDisconnect, setConfirmDisconnect] = useState(false);

  const handleLogout = () => {
    logout({ returnTo: `${window.location.origin}${pathKeys.ROOT}` })
  }

  const reconnectCalendar = () => {
    calendarService.connectCalendar().then((res) => {
      const { success, data } = res;
      if (success && data == true) {
        window.location.reload();
      }
    });
  }

  const disconnectCalendar = () => {
    calendarService.disconnectCalendar().then((res) => {
      const { success, data } = res;
      
      if (success && data == true) {
        window.location.reload();
      }
    });
  }

  const confirmDisconnectCalendar = (e) => {
    setConfirmDisconnect(true);
  }

  const userData = getUserData();

  return (
    <>
      <Card className="text-center" style={{ width: "60%", transform: 'translate(-50%, 10%)', left: '50%', top: '50%' }}>
        <CardImg className="img" src={logoImg} alt="Logo" />
        {
          userData.isConnectedCalendar && !confirmDisconnect &&
          <CardBody className="card-text">
            <CardText className="mb-3" style={{ fontWeight: "700" }}>
              <h2>Your calendar is connected!</h2>
            </CardText>
            <CardText className="mb-3" style={{ fontWeight: "700" }}>
              <h4>There's nothing more for you to do now. You'll receive emails after your meetings from Dayta with more instructions</h4>
            </CardText>
            <CardText className="mb-3">
              <a href="javascript:void(0)" onClick = {(e) => confirmDisconnectCalendar(e)}>
                <h6 className='disconnect-link'>Click here to disconnect your email and stop receiving meeting surveys and analytics from Dayta</h6>
              </a>
            </CardText>
            <CardText className="mb-2">
              <button className="btn-logout" onClick={() => handleLogout()}>
                Logout
              </button>
            </CardText>
          </CardBody>
        }

        {
          userData.isConnectedCalendar && confirmDisconnect &&
          <CardBody className="card-text">
            <CardText className="mb-3" style={{ fontWeight: "700" }}>
              <h2>Are you sure you want to leave?</h2>
            </CardText>
            <CardText className="mb-3" style={{ fontWeight: "700" }}>
              <h3>Disconnecting will remove Dayta from your meetings.</h3>
            </CardText>
            <CardText className="mb-3" style={{ fontWeight: "700" }}>
              <h3>You will no longer receive meeting surveys and feedback reports from Dayta.</h3>
            </CardText>
            <CardText className="mb-3">
              <button className="btn-disconnect" onClick={() => disconnectCalendar()}>
                DISCONNECT <br />
                {userData.emailAddress}
              </button>
            </CardText>
            <CardText className="mb-2">
              <button className="btn-logout" onClick={() => handleLogout()}>
                Logout
              </button>
            </CardText>
          </CardBody>
        }

        {
          !userData.isConnectedCalendar &&
          <CardBody className="card-text">
            <CardText className="mb-3" style={{ fontWeight: "700" }}>
              <h2>Reconnect your account</h2>
            </CardText>
            <CardText className="mb-2" style={{ fontWeight: "700" }}>
              <h3>This account was previously disconnected. Click here below to begin receiving surveys and feedback reports for Dayta</h3>
            </CardText>
            <CardText className="mb-3">
              <button className="btn-connect" onClick={() => reconnectCalendar()}>
                Reconnect <br />
                {userData.emailAddress}
              </button>
            </CardText>
            <CardText className="mb-2">
              <button className="btn-logout" onClick={() => handleLogout()}>
                Logout
              </button>
            </CardText>
          </CardBody>
        }

      </Card>
    </>
  );
}

export default DashBoard