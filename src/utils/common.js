export function validateEmail(email) { // eslint-disable-next-line
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export function validatePass(pass) {
  const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
  return passw.test(pass);
}

export function validateNumberPhone(number) {
  let c1 = number.substring(0, 4);
  if (c1 === "+855") {
    return true;
  }
  c1 = number.substring(0, 3);
  return c1 === "+60" || c1 === "+84";
}

export function isObjectUndefinedOrNull(obj) {
  return obj === undefined || obj === null;
}

export function isEmpty(obj) {
  return obj === undefined || obj === null || obj === "";
}

export function getShortVersionText(text, length) {
  return text.length <= length ? text : `${text.slice(0, length)}...`
}

export function replaceUnsetString(value) {
  return String(value).toLowerCase() === 'unset' ? '' : value
}

export function getModelPropDefaultValue(value, valueType, overrideValue) {
  if (value != null) return valueType === 'string' ? replaceUnsetString(value) : value
  if (value === undefined && overrideValue !== undefined) return overrideValue
  switch(valueType) {
    default: 
    case 'date':
    case 'number':
    case 'any':
      return null
    case 'object':
      return {}
    case 'array':
      return []
    case 'boolean':
      return false
    case 'string':
      return ''
  }
}

export function getRandNum(from, to) {
  return Math.floor(Math.random() * to) + from
}

export function randomRGBA(opacity = null) {
  const o = Math.round;
  const r = Math.random;
  const s = 255;
  
  return `rgba(${o(r()*s)},${o(r()*s)},${o(r()*s)},${opacity != null ? opacity : r().toFixed(1)})`;
}

function isYoutubeURL(src) {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
  const match = src.match(regExp)
  return match
}

function isVimeoURL(src) {
  const regExp = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/
  const match = src.match(regExp)
  return match
}

export function detectVideoProvider(src) {
  if (typeof src !== 'string') return null
  if (isYoutubeURL(src)) return 'youtube'
  if (isVimeoURL(src)) return 'vimeo'
  return null
}

export function parseGridViewState(gridViewState = {}, sortingKeysMap = {}) {
  const {
    pageSize = 0,
    pageIndex = 10,
    sortBy = [],
  } = gridViewState
  // -- not support multi sorting at this time -->
  const { id: sortedField, desc } = sortBy[0] || {}
  const sort = sortedField ? `${sortingKeysMap[sortedField] || sortedField}.${desc ? 'desc' : 'asc'}` : null

  return {
    skip: pageSize * pageIndex,
    count: pageSize,
    sort,
  }
}

export const formatDocSize = docSizeByMB => {
  const docSize = docSizeByMB < 1
    ? `${Math.round(docSizeByMB * 1000)} KB`
    : `${Number(docSizeByMB).toFixed(2)} MB`
  return docSize
}

export function parseFloatTofix (value, fixed = 2) {
  return parseFloat((value).toFixed(fixed))
}
