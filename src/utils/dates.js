import moment from 'moment'

export function padLeadingZero(value) {
  return value > 9 ? value : `0${value}`;
}

export function getFormattedDateTime(date = new Date()) {
  return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${padLeadingZero(date.getMinutes())}:${padLeadingZero(date.getSeconds())}`;
}

export function getAge(birthday) {
  if (!birthday || birthday === "0001-01-01T00:00:00") return null
  return moment().diff(moment(birthday), 'years')
}