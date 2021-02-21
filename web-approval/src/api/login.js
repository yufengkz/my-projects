import { get, post } from '@/utils/request'

// 登录
export function doLogin(params) {
  return post('/approve/api/login/login', params)
}
// 登出
export function doLogout() {
  return post('/approve/api/login/logout')
}
// 获取当前用户信息
export function getCurrentInfo() {
  return get('/approve/api/approve-role')
}

// 获取图形验证码
export function getImgCode() {
  return get('/approve/api/login/img-verify-code')
}
// 校验图形验证码
export function checkImgCode(params) {
  return post('/approve/api/login/check', params)
}
// 发送短信验证码
export function sendSmsCode(params) {
  return get('/approve/api/login/sms-approve-verify-code', params)
}

// 修改密码第一步
export function updatePasswordStepOne(params) {
  return post('/approve/api/modify-login-info/modifyPwdNextStep', params)
}

// 修改密码第二步
export function updatePasswordStepTwo(params) {
  return post('/approve/api/modify-login-info/modifyPwd', params)
}

// 修改手机号第二步
export function updateMobileStepTwo(params) {
  return post('/approve/api/modify-login-info/modifyMobile', params)
}

// 重置密码
export function resetPassword(params) {
  return post('/ifpc/v1/api/login/password/reset', params)
}
// 校验用户是否存在
export function checkPhoneExist(params) {
  return post('customer/check/checkPhoneOrUserName', params)
}
