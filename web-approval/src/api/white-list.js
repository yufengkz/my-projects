import {
  get,
  post,
  put
} from '@/utils/request'

import { combineUrlParam, downloadFileByUrl } from '@/utils/tool'

// 获取白名单企业信息列表
export function getWhiteList(params) {
  return get('/ifpc/v1/api/whiteList/list', params)
}

// 白名单企业查询结果导出
export function exportWhiteList(params) {
  const url = combineUrlParam(
    process.env.VUE_APP_BASE_API + '/ifpc/v1/api/whiteList/export',
    params
  )
  downloadFileByUrl(url)
}

// 白名单邀请码发送
export function sendWhiteListCode(params) {
  return post('/ifpc/v1/api/whiteList/send', params)
}

// 编辑白名单信息
export function editWhiteList(params) {
  return put('/ifpc/v1/api/whiteList/', params)
}

// 获取白名单推送记录分页列表
export function getWhiteListLog(params) {
  return get('/ifpc/v1/api/whiteList/record/list', params)
}

// 白名单推送记录查询结果导出
export function exportWhiteListLog(params) {
  const url = combineUrlParam(
    process.env.VUE_APP_BASE_API + '/ifpc/v1/api/whiteList/record/export',
    params
  )
  downloadFileByUrl(url)
}
