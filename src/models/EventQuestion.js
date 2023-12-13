import { getModelPropDefaultValue as getDefault } from '../utils/common'
import Question from "./Question";

export default class EventQuestion {
  constructor(data, initModel = true) {
    if (initModel) {
      this.init(data)
    }
  }

  init(data) {
    if (!data) return;
    this.id = getDefault(data.id, 'string', null)
    this.created = getDefault(data.created, 'date')
    this.modified = getDefault(data.modified, 'date')
    this.isPrimary = getDefault(data.isPrimary, 'boolean')
    this.eventId = getDefault(data.eventId, 'string', null)    
    this.questionId = getDefault(data.questionId, 'string', null) 
    this.question = new Question(getDefault(data.question, 'object'))
  }
}
