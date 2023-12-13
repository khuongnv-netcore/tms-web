import BaseApi from "./baseApi";
import { User } from "../models";

class CalendarApi extends BaseApi {
    connectCalendar() {
        return super
          .execute(
            this.Methods.POST,
            this.Urls.calendarService.connectCalendar,
            null,
            true
          )
          .then((res) => {
            return res;
          });
    }

    disconnectCalendar() {
        return super
          .execute(
            this.Methods.POST,
            this.Urls.calendarService.disconnectCalendar,
            null,
            true
          )
          .then((res) => {
            return res;
          });
    }
}

export default new CalendarApi();