import eventAPI from "../api/eventAPI";
import BaseService from "./baseService";

class EventService extends BaseService {
  getListEvent = async (param) => {
    return eventAPI.getListEvent(param);
  }
  assignChoice = async (param) => {
    return eventAPI.assignChoice(param);
  }
}

export default new EventService();
