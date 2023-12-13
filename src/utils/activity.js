import moment from 'moment'

export const groupActivitiesByDaysOfWeek = (activities, startDate) => {
  const startOfWeek = moment(startDate).startOf('week')
  const endOfWeek = moment(startDate).endOf('week')
  const initVal = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] }
  return (activities || []).reduce((group, activity) => {
    const activityDayOfWeek = moment(activity.date).day()
    const isValidActivityDate =
      moment(activity.date).isSameOrAfter(startOfWeek, 'day') &&
      moment(activity.date).isSameOrBefore(endOfWeek, 'day')
    return {
      ...group,
      [activityDayOfWeek]: [
        ...(group[activityDayOfWeek] || []),
        ...(isValidActivityDate ? [activity] : [])
      ]
    }
    // group[0] will contain any activities on Sunday
    // group[1] will contain any activities on Monday
    // ...
    // group[6] will contain any activities on Saturday
  }, initVal)
}
