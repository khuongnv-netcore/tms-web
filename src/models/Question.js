import { getModelPropDefaultValue as getDefault } from '../utils/common'
import Choice from "./Choice";

export default class Question {
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
    this.name = getDefault(data.name, 'string')
    this.questionText = getDefault(data.questionText, 'string')    
    this.type = getDefault(data.type, 'string') // fix - SingleChoice
    this.bucket = getDefault(data.bucket, "string") // fix - Value
    this.choices = (data.choices || []).map(choice => new Choice(getDefault(choice, 'object')))
  }
}
