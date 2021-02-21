import { get, post } from '@/utils/request'

// 查询业务中心列表
export function getList(params) {
  return post('/operate/api/business-center/list', params)
}

/**
 * 贷款申请详情接口
 */
export function getLoanDetail(params) {
  return post('/operate/api/business-center/detail', params)
}

/**
 * 展业订单流程日志
 */
export function queryOrderApproveLog(params) {
  return post('/operate/api/approve-log/queryApproveLogList', params)
}

/**
 * 查询审批进度
 */
export function rejectReason(params) {
  return post('/operate/api/approve-log/queryCurrentProgress', params)
}

/**
 *
 * 获取抵押物影像列表
 */
export function getGuaranteeMortgageFileList(params) {
  return get(`/operate/api/guarantee-mortgage-file/list/${params.mortgageId}`)
}
/**
 *
 * 获取质押物影像列表
 */
export function getGuaranteePledgeFileList(params) {
  return get(`/operate/api/guarantee-pledge-file/list/${params.pledgeId}`)
}
