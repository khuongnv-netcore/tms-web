import { Map } from 'immutable'

export const createReducer = (initialState, handlersMap) => (
  state = initialState,
  action
) => {
  const handler = handlersMap[action.type]
  if (!handler || typeof handler !== 'function') {
    return state
  }
  return handler(state, action)
}

export const updateItemInArray = (array, itemId, updateItemCallback) => {
  const updatedItems = array.map(item => {
    if (item instanceof Map) {
      // eslint-disable-next-line no-param-reassign
      item = item.toJS()
    }

    if (item.id !== itemId) {
      // Since we only want to update one item, preserve all others as they are now
      return item
    }

    // Use the provided callback to create an updated item
    const updatedItem = updateItemCallback(item)
    return updatedItem
  })
  
  return updatedItems
}

export const updateItemsInArray = (array, updateItems, uniqueKey = 'id') => {
  const newUpdateArray = updateItems.reduce((newUpdateArray, updateItem) => {
    const updateItemIdex = newUpdateArray.findIndex(i => i[uniqueKey] === updateItem[uniqueKey])
    return updateItemIdex === -1
      ? newUpdateArray
      : [
        ...newUpdateArray.slice(0, updateItemIdex),
        updateItem,
        ...newUpdateArray.slice(updateItemIdex + 1),
      ]
  }, [...array])
  return newUpdateArray
}

export const removeItemsInArray = (array = [], itemIds = []) => {
  const updatedItems = array.reduce((updatedItems, item) => {
    return itemIds.includes(item.id) ? updatedItems : [...updatedItems, item]
  }, [])
  return updatedItems
}