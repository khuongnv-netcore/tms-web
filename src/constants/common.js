/* eslint-disable */
export const DateTimeFormat = {
  DATE_TIME: "MMM DD, YYYY hh:mm A",
  SHORT: "MMM DD, YYYY",
  DATE: "MM/DD/YYYY",
  TIME: "hh:mm",
  AM_PM: "A",
  ISO_DATE_TIME: "YYYY-MM-DD[T]HH:mm:ss",
  WEEK_TIME: "MMM DD",
  DATE_PICKER: "dddd, MMMM DD",
  CREATED_DATE: "ddd, MMM DD",
  QUERY_DATE_TIME: "YYYY-MM-DD",
  DATE_TIME_NORMAL: "MM/DD/YYYY HH:mm:ss"
};

export const DAYS_OF_WEEK_ORDER = [0, 1, 2, 3, 4, 5, 6]

export const DEFAULT_PAGE_SIZE = 50;
export const DEFAULT_DOCUMENT_COUNT = 30;
export const DEFAULT_CLIENT_NOTE_COUNT = 5;
export const MAX_CLIENT_SYMPTOMS = 5;
export const DEFAULT_TAGS_PAGE_SIZE = 30;
export const DEFAULT_STANDARD_ACTIVITIES_PAGE_SIZE = 30;
export const DOCTORS_DROPDOWN_LIMIT = 20;
export const COACHES_DROPDOWN_LIMIT = 20;

export const TOKEN_KEY = 'token';
export const DEFAULT_SEARCHBAR_MIN_LENGTH = 3;

export const BOOTSTRAP_VARIANTS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  SUCCESS: 'success',
  WARNING: 'warning',
  DANGER: 'danger',
  INFO: 'info',
  LIGHT: 'light',
  DARK: 'dark',
  LIGHT_BLUE: 'light-blue',
  OUTLINE: 'outline',

  OUTLINE_PRIMARY: 'outline-primary',
  OUTLINE_SECONDARY: 'outline-secondary',
  OUTLINE_SUCCESS: 'outline-success',
  OUTLINE_WARNING: 'outline-warning',
  OUTLINE_DANGER: 'outline-danger',
  OUTLINE_INFO: 'outline-info',
  OUTLINE_LIGHT: 'outline-light',
  OUTLINE_DARK: 'outline-dark',
  OUTLINE_LIGHT_BLUE: 'outline-light-blue',

  LINK: 'link',
  PILLS: 'pills',
  LIGHT: 'light',
}

export const FILTER_TYPES = {
  STRING_SEARCH: 'string',
  DROPDOWN_FILTER: 'dropdown-filter',
}

export const DEFAULT_TOAST_OPTIONS = {
  timeOut: 3000,
  // timeOut: 0,
  closeOnToastrClick: true,
  showCloseButton: true,
  newestOnTop: false,
  position: 'bottom-right',
  transitionIn: 'bounceIn',
  transitionOut: 'fadeOut',
}
export const GENERAL_ERROR_MESSAGE = 'Something went wrong. Please try again'

export const TERM_OF_USE = 'https://www.showerstream.com/'

export const PRIVACY_POLICY = 'https://www.showerstream.com/'

export const CONTACT_US = 'https://www.showerstream.com/'

export const roomStatus = [
  {
    id: 0,
    name: "Available",
    class: "light-success"
  },
  {
    id: 1,
    name: "UnAvailable",
    class: "light-secondary"
  }
]

export const RoleType = [
  {
    id: "Administrator",
    name: "Administrator"
  },
  {
    id: "Support",
    name: "Support"
  },
  {
    id: "User",
    name: "User"
  }
];

export const HeaterType = {
  Electric: 'electric',
  Gas: 'gas'
}

export const regExForDoubleOnly = /^[0-9]+[.]{0,1}[0-9]*$/;
export const regExForNumberOnly = /^[0-9]*$/;
     