import { React } from 'react'
import { Row, Button, Card, CardImg, CardBody, CardText } from "reactstrap";
import logoImg from "../../../assets/images/systemlogo/DaytaLogo.svg"
import { pathKeys } from "../../../constants"
import { useHistory, Redirect } from 'react-router-dom'
import './index.scss'
const MicrosoftComingSoon = () => {
  
    const siginUpNotifiedUrl = "https://getdayta.com/office365 ";
    const history = useHistory();
    const handleBack = () => {
      history.push(pathKeys.ROOT);
      }

      const handleSignUpNotified = () => {
        window.open(siginUpNotifiedUrl, "_blank");
        }
  
    return (
      <>
      <Card className="text-center" style={{ width: "60%", transform: 'translate(-50%, -50%)', left: '50%', top: '50%' }}>
        <CardImg className="img" src={logoImg} alt="Logo" />
        <CardBody className="card-text">
          <CardText className="mb-3" style={{ fontWeight: "700" }}>
            <h2>Coming Soon!</h2>
          </CardText>
          <CardText className="mb-3" style={{ fontWeight: "700" }}>
            <h3>Our Microsoft 365 Integration is still in the works. Enter your email below and we'll let you know when it's ready</h3>
          </CardText>
          <CardText className="mb-2">
            <button className= "btn-sign-up-notified" onClick={() => handleSignUpNotified()}>
              SIGN UP TO BE NOTIFIED
            </button>
          </CardText>
          <CardText className="mb-2">
            <button className= "btn-back" onClick={() => handleBack()}>
              Back
            </button>
          </CardText>
        </CardBody>
      </Card>
      </>
    );
};
export default MicrosoftComingSoon;