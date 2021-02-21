import {
  get,
  post
} from '@/utils/request'

import {
  combineUrlParam,
  downloadFileByUrl
} from '@/utils/tool'
// 服务费列表查询
export function getFeesList(params) {
  return get('/ifpc/v1/api/fee/fees', params)
}
// 服务费列表导出
export function excelList(params) {
  // return get('/ifpc/v1/api/fee/excel', params)
  const url = combineUrlParam(process.env.VUE_APP_BASE_API + '/ifpc/v1/api/fee/excel', params)
  downloadFileByUrl(url)
}
// 支用权限状态修改
export function modifyWithdrawal(params) {
  return post('/ifpc/v1/api/fee/withdrawal', params)
}
// 服务费已出账单详情
export function getExistBillList(params) {
  return get('/ifpc/v1/api/fee/existBill', params)
}
// 服务费未出账单详情
export function getbillList(params) {
  return get('/ifpc/v1/api/fee/bill', params)
}
// 缴费记录列表
export function getRepaymentsList(params) {
  return get('/ifpc/v1/api/fee/repayments', params)
}
// 缴费记录详情查询
export function getRepaymentDetail(params) {
  return get('/ifpc/v1/api/fee/repayment', params)
}
// 缴费记录新增/修改
export function modifyRepayment(params) {
  return post('/ifpc/v1/api/fee/repayment', params)
}
// 查询待缴费账单
export function queryPayBill(params) {
  return get('/ifpc/v1/api/fee/payBill', params)
}
// 证明文件上传
export function uploadFile() {
  return process.env.VUE_APP_BASE_API + '/ifpc/v1/api/fee/upload'
}

// 服务费系数查询
export function queryRate(params) {
  return get('/ifpc/v1/api/rate/rate', params)
}
// 服务费系数修改
export function modifyRate(params) {
  return post('/ifpc/v1/api/rate/rate', params)
}
