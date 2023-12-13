import { getModelPropDefaultValue as getDefault } from '../utils/common'

export default class PagingList {
  constructor(data, initModel = true) {
    if (initModel) {
      this.init(data)
    }
  }

  init(data) {
    const { total, pageSize } = data
    this.total = getDefault(total, 'number')
    this.pageSize = getDefault(pageSize, 'number')
  }

  setItems(items) {
    this.items = items
  }
}
