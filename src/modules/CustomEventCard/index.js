import { useTranslation } from "react-i18next";
import { Card, CardText, CardTitle, Button, CardBody } from "reactstrap";
import "./index.scss";

const CustomEventCard = (props) => {
    const { t, i18n } = useTranslation();
    const { data, onButtonClick, active } = props;

    //Sort Data by isPrimary so Primary question is first.
    if (data.length) {
        for (let i=0; i< data.length; i++) {
            data[i].eventQuestions.sort((a, b) => {
                if(a.isPrimary == b.isPrimary) {
                    return a.question.questionText.length > b.question.questionText.length;
                }
                return a.isPrimary >= b.isPrimary ? -1 : 1;
            });
        }
    }

    return (
        <>
            <div>
                {
                    Object.keys(data).map((item) => (
                        <Card>
                            <CardBody className="text-center">
                                <CardTitle className="txt-title">{new Date(data[item].start).toLocaleTimeString([], { timeStyle: 'short' })} - {data[item].summary}</CardTitle>
                                {/* For each quesiton */}
                                {
                                    Object.keys(data[item].eventQuestions).map((question) => {
                                        return (
                                            <div>
                                                <CardText className="txt-body">{(data[item].eventQuestions)[question].question.questionText}</CardText>
                                                {/* // For each choice */}
                                                {Object.keys((data[item].eventQuestions)[question].question.choices).map(choice => {
                                                    const eventId = data[item].id;
                                                    const questionId = (data[item].eventQuestions)[question].question.id;
                                                    const choiceId = ((data[item].eventQuestions)[question].question.choices)[choice].id;
                                                    return ( 
                                                        <Button.Ripple aria-label={eventId} aria-description={questionId} id={choiceId} className={active[eventId] != null && active[eventId][questionId] != null && active[eventId][questionId].choiceId == choiceId ? "active" : ""} onClick={(event) => {
                                                            const resp = {
                                                                choiceId: choiceId,
                                                                eventParticipantId: (data[item].eventParticipants)[0].id
                                                            }
                                                            onButtonClick(resp, eventId, questionId, choiceId)
                                                        }
                                                        }>{((data[item].eventQuestions)[question].question.choices)[choice].choiceText}</Button.Ripple>
                                                    )
                                                })}
                                            </div>
                                        )
                                    })
                                }
                            </CardBody>
                        </Card>
                    ))
                }
            </div>
        </>
    )

}

export default CustomEventCard;
