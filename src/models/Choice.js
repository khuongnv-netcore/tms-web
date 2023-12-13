import { getModelPropDefaultValue as getDefault } from '../utils/common'

export default class Choice {
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
    this.choiceText = getDefault(data.choiceText, 'string')    
    this.order = getDefault(data.order, 'number') // check
  }
}
