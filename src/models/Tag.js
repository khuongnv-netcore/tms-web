import { getModelPropDefaultValue as getDefault } from '../utils/common'

export default class Tag {
  constructor(data, initModel = true) {
    if (initModel) {
      this.init(data)
    }
  }

  init(data) {
    this.id = getDefault(data.id, 'string', null)
    this.name = getDefault(data.name, 'string')
    this.numberOfActivities = getDefault(data.numberOfActivities, 'number', null)
    this.created = getDefault(data.created, 'date')
    this.modified = getDefault(data.modified, 'date', null)
    this.standardActivityTagId = getDefault(data.standardActivityTagId, 'string', null)
  }
}
