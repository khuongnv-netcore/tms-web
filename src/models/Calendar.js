import { getModelPropDefaultValue as getDefault } from '../utils/common'

export default class Calendar {
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
    this.provider = getDefault(data.provider, 'string')
    this.secretAddressIcal = getDefault(data.secretAddressIcal, 'string')
    this.allowSync = getDefault(data.allowSync, 'boolean')
    this.iCalUID = getDefault(data.iCalUID, 'string')
    this.userId = getDefault(data.userId, 'string')
  }
}
