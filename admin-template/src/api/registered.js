import {
  get
  // post
} from '@/utils/request'

import {
  combineUrlParam,
  downloadFileByUrl
} from '@/utils/tool'
// 列表查询
export function getUserList(params) {
  return get('/ifpc/v1/api/user/list', params)
}
// 字典
export function getEnum(params) {
  return get('/ifpc/v1/api/enum/enum', params)
}
// 注册用户列表导出
export function excelList(params) {
  const url = combineUrlParam(process.env.VUE_APP_BASE_API + '/ifpc/v1/api/user/export', params)
  downloadFileByUrl(url)
}
// 用户认证列表
export function getAuthRecordList(params) {
  return get('/ifpc/v1/api/authRecord/list', params)
}
// 认证导出
export function recordExcelList(params) {
//   return get('/ifpc/v1/api/authRecord/export', params)
  const url = combineUrlParam(process.env.VUE_APP_BASE_API + '/ifpc/v1/api/authRecord/export', params)
  downloadFileByUrl(url)
}

// 查看详情
export function getDetail(params) {
  return get(`/ifpc/v1/api/user/${params}`)
}
