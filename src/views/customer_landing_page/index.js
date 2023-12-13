import React, { useState } from "react";
import { Row, Button } from "reactstrap";
import { useTranslation } from "react-i18next";
import "./index.scss";
import customerLandingPageIMG from "../../assets/images/svg/customerLandingPage.png";
import { useAuth0 } from "../../auth0";

const CustomerLandingPage = (props) => {
  const { loginWithRedirect } = useAuth0();
  const [t] = useTranslation();
  const [show, setShow] = useState("landingPage");

  return (
    <>
      {show === "landingPage" && (
        <div className="landingPage d-flex flex-column">
          <Row>
            <img
              src={customerLandingPageIMG}
              className="landingPage-img mt-5"
            ></img>
          </Row>
          <Row className="mt-3">
            <span className="text">
              {t("Welcome to Dayta Web App")}
            </span>
          </Row>
          <Row>
            <Button
              color="primary"
              className="btn-login mt-3"
              onClick={() => {
                loginWithRedirect();
              }}
            >
              {t("customer.Login").toUpperCase()}
            </Button>
          </Row>
        </div>
      )}
    </>
  );
};
export default CustomerLandingPage;