import { getModelPropDefaultValue as getDefault } from '../utils/common'

export default class Role {
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
    this.roleType = getDefault(data.roleType, 'string')
    this.displayName = getDefault(data.displayName, 'string')
  }
}
