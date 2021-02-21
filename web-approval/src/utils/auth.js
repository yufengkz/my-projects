import Cookies from 'js-cookie'

const TokenKey = 'sc-token'

export function getToken() {
  return Cookies.get(TokenKey)
}

window.getToken = getToken

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getSystemType() {
  return Cookies.get('systemType')
}

export function setSystemType(type) {
  return Cookies.set('systemType', type)
}

export function removeSystemType() {
  return Cookies.remove('systemType')
}
