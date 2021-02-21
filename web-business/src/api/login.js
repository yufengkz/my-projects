import { get, post, put } from '@/utils/request'

// 登录
export function doLogin(params) {
  return post('/order/v1/api/login/login/pc', params)
}
// 登出
export function doLogout() {
  return post('/order/v1/api/login/logout')
}
// 获取当前用户信息
export function getCurrentInfo() {
  return get('/order/v1/api/user/info')
}

// 发送短信验证码
export function sendSmsCode(params) {
  return get('/order/v1/api/login/smsCode', params)
}
// 修改密码
export function updatePassword(params) {
  return put('/order/v1/api/operate-user/updateUserPwd', params)
}
// 重置密码
export function resetPassword(params) {
  return post('/order/v1/api/login/password/reset', params)
}
// 校验用户是否存在
export function checkPhoneExist(params) {
  return post('customer/check/checkPhoneOrUserName', params)
}
/**
 * 新增手机号修改接口
 */
// 获取图形验证码
export function getImgCode() {
  return get('/order/v1/api/login/img-verify-code')
}

// 校验图形验证码
export function checkImgCode(params) {
  return post('/order/v1/api/login/check', params)
}

// 发送短信验证码
export function sendSmsCode1(params) {
  return get('/order/v1/api/login/sms-institution-verify-code', params)
}

// 修改密码\手机第一步
export function updatePasswordStepOne(params) {
  return post('/order/v1/api/user/modifyPwdNextStep', params)
}

// 修改手机号第二步
export function updateMobileStepTwo(params) {
  return post('/order/v1/api/user/modifyMobile', params)
}
