import { getModelPropDefaultValue as getDefault } from '../utils/common'

export default class Document {
  constructor(data, initModel = true) {
    if (initModel) {
      this.init(data)
    }
  }

  init(data) {
    this.id = getDefault(data.id, 'string', null)
    this.creatorId = getDefault(data.creatorId, 'string', null)
    this.created = getDefault(data.created, 'date')
    this.modified = getDefault(data.modified, 'date', null)
    this.name = getDefault(data.name, 'string')
    this.ownerId = getDefault(data.ownerId, 'string', null)
    this.staticStorageObjectId = getDefault(data.staticStorageObjectId, 'string', null)
    this.url = getDefault(data.url, 'string')
    this.fileSizeMB = getDefault(data.fileSizeMB, 'number')
    this.fileType = getDefault(data.fileType, 'string')
    this.isVisibleToClient = getDefault(data.isVisibleToClient, 'boolean', null)
  }

  getFileType() {
    return this.fileType.replace(/([\w]*)\//, '')
  }
}
