import {
  get,
  post,
  put
} from '@/utils/request'

// 获取图形验证码
export function getImgCode() {
  return get('/ifpc/v1/api/login/img-verify-code')
}

// 登录
export function doLogin(params) {
  return post('/ifpc/v1/api/login/login', params)
}
// 登出
export function doLogout() {
  return post('/ifpc/v1/api/login/logout')
}
// 获取当前用户信息
export function getCurrentInfo() {
  return get('/ifpc/v1/api/operate-role')
}
// 校验图形验证码
export function checkImgCode(params) {
  return post('/ifpc/v1/api/login/check', params)
}
// 发送短信验证码
export function sendSmsCode(params) {
  return get('/ifpc/v1/api/login/sms-operate-verify-code', params)
}
// 修改密码
export function updatePassword(params) {
  return put('/ifpc/v1/api/operate-user/updateUserPwd', params)
}
// 重置密码
export function resetPassword(params) {
  return post('/ifpc/v1/api/login/password/reset', params)
}
// 校验用户是否存在
export function checkPhoneExist(params) {
  return post('customer/check/checkPhoneOrUserName', params)
}
