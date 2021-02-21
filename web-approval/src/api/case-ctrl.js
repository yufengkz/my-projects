/** 审批端 业务公共接口  审批案件管理 授信审批、担保审批、征信审批 */

import { get, post } from '@/utils/request'

/**
 * 审批案件管理 - 授信审批案件列表查询
 */
export function getApplyDebtList(params) {
  return get('/approve/api/approve-credit-transition-case/getApplyDebtList', params)
}

/**
 * 审批案件管理 - 自然人担保审批转案列表
 */
export function getNaturalApprovalListSearch(params) {
  return get('/approve/api/approve-guarantee-transition-case/getAapprovalTransferOfNaturalPersonGuaranteeList', params)
}

/**
 * 审批案件管理 - 法人担保审批转案列表
 */
export function getLegalApprovalListSearch(params) {
  return get('/approve/api/approve-legal-guarantee-transition-case/getLegalPersonGuaranteeApprovalTransfer', params)
}

/**
 * 审批案件管理 - 查证审批案件列表查询
 */
export function getInquiryApprovalListSearch(params) {
  return get('/approve/api/approve-query-credit-transition-case/getInvestigationApprovalAndTransfer', params)
}

/**
 * 审批案件管理 - 查证审批专案 详情
 */
export function getInquiryApprovaDetail(params) {
  return get('/approve/api/approve-query-credit/queryCreditApplication/get', params)
}

/**
 * 审批流转日志
 */
export function getTraceLog(params) {
  return get('/approve/api/approve-flow-trace/getTraceLog', params)
}

/**
 * 审批案件管理 - 法人担保审批转案列表
 */
export function getLegalTransferList(params) {
  return get('/approve/api/approve-legal-guarantee-transition-case/getLegalPersonGuaranteeApprovalTransfer', params)
}

/**
 * 审批案件管理 - 自然人担保审批转案列表
 */
export function getNaturalTransferList(params) {
  return get('/approve/api/approve-guarantee-transition-case/getAapprovalTransferOfNaturalPersonGuaranteeList', params)
}

/**
 * 审批案件管理 人工转案下拉框数据查询
 */
export function getTransferResources(params) {
  return get('/approve/api/approve-credit/transferResources', params)
}

/**
 *审批案件管理 - 自然人担保审详情 人工转案提交
 */

export function naturalPersonGuarantee(params) {
  return post('/approve/api/approve-guarantee-transition-case/approval-transfer-of-natural-person-guarantee', params)
}

/**
 * 审批案件管理 - 法人担保审批详情 人工转案提交
 */
export function legalPersonGuarantee(params) {
  return post('/approve/api/approve-legal-guarantee-transition-case/legal-person-guarantee-approval-transfer', params)
}

/**
 * 审批案件管理 -授信保审批详情 人工转案提交
 */
export function creditPersonGuarantee (params) {
  return post('/approve/api/approve-credit-transition-case/approval-and-transfer', params)
}
/**
 * 查证审批案件 - 全部所属MAP
 */
export function getMapAllList(params) {
  return get('/approve/api/approve-credit/queryMAP', params)
}
/**
 * 授信审批 枚举列表
 */
export function getApproveEnumList() {
  return get('/approve/api/approve-enum/list')
}
/**
 * 授信审批详情
 */
export function getCreditApplicationDetail(params) {
  return get('/approve/api/approve-credit/creditApplication/get', params)
}
