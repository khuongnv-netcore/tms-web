import { get } from 'lodash'

export default class BaseService {
  handleError(error) {
    throw error
  }

  handleResponse(response) {
    const statusCode = get(response, 'statusCode', 200)
    const message = get(response, ['data', 'Message'], '')
    if (statusCode !== 200) {
      throw new Error(message)
    }
    return response
  }
}
