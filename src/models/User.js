import { getModelPropDefaultValue as getDefault } from '../utils/common'
import Role from "./Role";

export default class User {
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
    this.firstName = getDefault(data.firstName, 'string')
    this.lastName = getDefault(data.lastName, 'string')
    this.emailAddress = getDefault(data.emailAddress, 'string')
    this.emailVerified = getDefault(data.emailVerified, 'string')
    this.roles = (data.roles || []).map(role => new Role(getDefault(role, 'object')))
    this.provider = getDefault(data.provider, 'string')
    this.isConnectedCalendar = getDefault(data.isConnectedCalendar, 'boolean')
  }
}
