export default {
  ROOT: "/",
  HOME: "/home",
  MODAL: "/modal",
  LOGIN: "/login",
  SIGNUP: "/signup",
  DASHBOARD: "/dashboard",
  HELP_CENTER: "/help-center",
  SETTINGS: "/settings",

  MY_PROFILE: "/my-profile",
  
  // new
  REPORT: {
    INVOICE_REPORT: '/report/invoice_reporting',
    DEBUG: '/report/debug'
  },

  MANAGE_DATA: {
    USER: '/manage-data/user',
    GENERIC_DATA_MANAGEMENT: '/manage-data/generic_data_management'
  },
  CUSTOMER_LANDING_PAGE: "/customer_landing_page",
  //answer/{{participantId}}/event/{{EventId}}/question/{{QuestionId}}/choice/{{Id}}
  ANSWER_PAGE: "/answer/:participantId/event/:eventId/question/:questionId/choice/:choiceId",
  MICROSOFT_COMING_SOON: "microsoft-coming-soon"

};
