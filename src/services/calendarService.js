import calendarService from "../api/calendarApi";
import BaseService from "./baseService";

class CalendarService extends BaseService {
    connectCalendar = async () => {
      return calendarService.connectCalendar();
    }

    disconnectCalendar = async () => {
        return calendarService.disconnectCalendar();
      }
  }
  
  export default new CalendarService();