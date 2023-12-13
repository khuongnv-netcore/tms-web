/* istanbul ignore file */
export default {
  baseUrl: `${process.env.REACT_APP_API_ROOT}/api/`,
  users: {
    main: "User",
    me: "User/CurrentUser",
    getList: "User/ListUser",
    filter: "User/Filter",
    role: "User/SetRoles"
  },
  role: {
    listPaging: "Role"
  },
  genericDataManagement: {
    listPaging: "Role"
  },
  event: {
    listPaging: "Event/Filter"
  },
  choice: {
    assign: "Response/AssignChoice"
  },
  calendarService: {
    connectCalendar: "Calendar/Connect",
    disconnectCalendar: "Calendar/Disconnect"
  }
};
