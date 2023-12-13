import React, { useEffect } from "react";
import { Row, Button, Card, CardImg, CardBody, CardText } from "reactstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { eventDataSelector } from "../../redux/selectors/entitiesSelector";
import "./index.scss";
import { CustomEventCard } from "../../modules";
import logoImg from "../../assets/images/systemlogo/DaytaLogo.svg"
import { eventActions } from "../../redux/actions";
import { useLocation, useParams } from "react-router-dom";


const AnswerPage = () => {
  const [t] = useTranslation();
  const dispatch = useDispatch();

  const { participantId, eventId, questionId, choiceId } = useParams();
  const search = useLocation().search;
  const staticParams = {
    secret: new URLSearchParams(search).get('accessToken'),
    start: new URLSearchParams(search).get("start"),
    end: new URLSearchParams(search).get("end")
  }

  const listEvent = useSelector(eventDataSelector.listEvent);
  const eventPaginationSetting = useSelector(eventDataSelector.pagination);

  const activeChoices = useSelector(eventDataSelector.activeChoices);

  const getListEvent = (param) => {
    const parameters = {
      secret: staticParams.secret,
      start: staticParams.start,
      end: staticParams.end,
      participantId: participantId,
      pageIndex: param.pageIndex,
      pageCount: param.pageCount
    }
    dispatch(eventActions.getListEvent(parameters))
  }

  const handleAssignChoice = (param, eventId, questionId, choiceId) => {
    Object.assign(param, staticParams);

    dispatch(eventActions.assignChoice(
      param,
      null,
      null,
      t('Updated choice response')
    ));

    dispatch(eventActions.setActiveChoice(eventId, questionId, choiceId));
  }

  const setOnLoad = () => {
    const param = {
      choiceId: choiceId,
      eventId: eventId,
      participantId: participantId
    }
    handleAssignChoice(param, eventId, questionId, choiceId)
  }

  useEffect(() => {
    getListEvent(eventPaginationSetting);
    setOnLoad();
  }, [])

  return (
    <>
      <div>
        <Card className="text-center">
          <CardImg className="img" src={logoImg} alt="Logo" />
          <CardBody className="card-text">
            <CardText>Your team is working with Dayta to improve the quality of meetings and waste less time.</CardText>
            <CardText>Your responses are anonymous and only used to aggregate meeting sentiment.</CardText>
            <CardText>You have {listEvent.length} meetings to rate.</CardText>
            <CardText>(This should take less than a minute)</CardText>
          </CardBody>
        </Card>
        <CustomEventCard
          data={listEvent}
          onButtonClick={(formData, eventId, questionId, choiceId) => { handleAssignChoice(formData, eventId, questionId, choiceId) }}
          active={activeChoices}
        />
        <Row className="btn-row">
          <Button className="btn-submit" onClick={() => window.open("http://www.getdayta.com/thanks-for-your-feedback", "_self")}>Submit</Button>
        </Row>
      </div>
    </>
  );
};
export default AnswerPage;
