import { getModelPropDefaultValue as getDefault } from '../utils/common'
import EventParticipant from "./EventParticipant";
import EventQuestion from "./EventQuestion";

export default class Event {
  constructor(data, initModel = true) {
    if (initModel) {
      this.init(data)
    }
  }

  init(data) {
    if (!data) return

    this.id = getDefault(data.id, 'string')
    this.created = getDefault(data.created, 'date')
    this.modified = getDefault(data.modified, 'date')
    this.start = getDefault(data.start, 'date')
    this.end = getDefault(data.end, 'date')
    this.title = getDefault(data.title, 'string')
    this.summary = getDefault(data.summary, 'string')
    this.description = getDefault(data.description, 'string')
    this.location = getDefault(data.location, 'string')
    this.isRecurring = getDefault(data.isRecurring, 'boolean')
    this.eventParticipants = (data.eventParticipants || []).map(eventParticipant => new EventParticipant(getDefault(eventParticipant, 'object')))
    this.eventQuestions = (data.eventQuestions || []).map(eventQuestion => new EventQuestion(getDefault(eventQuestion, 'object')))
  }
}
