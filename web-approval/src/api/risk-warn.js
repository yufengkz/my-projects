import {
  get,
  post
} from '@/utils/request'

import {
  combineUrlParam,
  downloadFileByUrl
} from '@/utils/tool'
/**
 * 风险预警 -- 贷后信息
 */
// 预警列表
export function getWarnList(params) {
  return get('/ifpc/v1/api/operateWarn/list', params)
}
// 预警导出
export function exportList(params) {
  // return get('/ifpc/v1/api/operate-warn/export', params)
  const url = combineUrlParam(process.env.VUE_APP_BASE_API + '/ifpc/v1/api/operateWarn/export', params)
  downloadFileByUrl(url)
}
// 预警详情
export function getWarnDetail(params) {
  return get(`/ifpc/v1/api/operateWarn/${params}`)
}
// 预警审批信息-风控岗
export function submitWarnHandle(params) {
  return post('/ifpc/v1/api/operateWarn/risk/approval', params)
}
// 预警审批信息-审批岗
export function submitWarnApproval(params) {
  return post('/ifpc/v1/api/operateWarn/risk/save', params)
}
// 历史贷后信息
export function getHistoryInfo(params) {
  return get(`/ifpc/v1/api/operateWarn/history/${params}`)
}
/*
 风险预警 -- 融资权限模块接口
  */
// 查询企业融资权限列表
export function getCpmpanyFrozeList(params) {
  return get('/ifpc/v1/api/operateCompanyFroze/queryCpmpanyFrozeList', params)
}
// 企业融资权限查询结果-导出
export function exportCpmpanyFrozeList(params) {
  const url = combineUrlParam(process.env.VUE_APP_BASE_API + '/ifpc/v1/api/operateCompanyFroze/exportCompanyFrozeList', params)
  downloadFileByUrl(url)
}
// 历史记录列表-查看
export function getCpmpanyFrozeAllDetail(params) {
  return get(`/ifpc/v1/api/operateCompanyFroze/queryCompanyForzeAllDetail/${params}`)
}
// 获取/查看融资权限信息
export function getCpmpanyFrozeDetail(params) {
  return get('/ifpc/v1/api/operateCompanyFroze/queryCompanyForzeDetail', params)
}
// 点击历史操作记录
export function getCpmpanyFrozeRecordList(params) {
  return get(`/ifpc/v1/api/operateCompanyFroze/queryCompanyForzeRecordList/${params}`)
}
// 融资权限-风控岗
export function submitResultByFKUser(params) {
  return post('/ifpc/v1/api/operateCompanyFroze/submitResultByFKUser', params)
}
// 融资权限-审批岗
export function submitResultBySPUser(params) {
  return post('/ifpc/v1/api/operateCompanyFroze/submitResultBySPUser', params)
}
// 操作人列表
export function getOperateUserList(params) {
  return get('/ifpc/v1/api/operateCompanyFroze/getOperateUserList', params)
}
// 历史记录中查看
export function getHistoryInfoDetail(params) {
  return get('/ifpc/v1/api/operateCompanyFroze/queryCompanyForzeDetailById', params)
}
