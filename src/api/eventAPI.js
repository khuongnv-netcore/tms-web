import { Event } from "../models";
import BaseApi from "./baseApi";

class EventApi extends BaseApi {

    async getListEvent(param) {
        const method = this.Methods.GET;
        const endpoint = this.Urls.event.listPaging;

        let body = null;
        if (param) {
            const { pageCount, pageIndex, start, end, participantId, secret } = param;

            body = {
                ...(((pageCount > -1) && (pageIndex > -1)) && { skip: (pageCount * pageIndex) }),
                ...((pageCount > -1) && { count: pageCount }),
                ...({ start: start }),
                ...({ end: end }),
                ...({ participantId: participantId }),
                ...({ secret: secret }),
            }
        }

        const response = await super.execute(method, endpoint, null, false, body);
        const { data } = response;

        if (!data) {
            return {
                ...response,
                data: {
                    total: 0,
                    listEvent: []
                }
            }
        }

        const { entities, totalEntities } = data

        return {
            ...response,
            data: {
                total: totalEntities,
                listEvent: entities.map(item => { return new Event(item) })
            }
        }
    }

    async assignChoice(param) {
        const { choiceId, eventParticipantId, eventId, participantId, start, end, secret } = param;

        const method = this.Methods.PUT;
        const endpoint = `${this.Urls.choice.assign}`;

        const response = await super.execute(method, endpoint, null, false, { choiceId, eventParticipantId, eventId, participantId, start, end, secret })
        return {
            ...response,
        }
    }

}

export default new EventApi();