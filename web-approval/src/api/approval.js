/** 审批端 业务公共接口  授信审批、担保审批、征信审批 */

import { post, get } from '@/utils/request'

/**
 * 授信审批详情
 */
export function getCreditApplicationDetail(params) {
  return get('/approve/api/approve-credit/creditApplication/get', params)
}

/**
 *  授信审批 - 待审批授信申请列表查询
 *  productType  产品类型
 *  current  当前页数
 *  size  每页条数
 *  statusType  状态类型
 *  commitTimeStart  提交开始时间
 *  commitTimeEnd  提交结束时间
 *  updateTimeStart  更新开始时间
 *  updateTimeEnd  更新结束时间
 *  applyCommiter  申请提交人
 *  applyNo  申请编号
 *  checkName  审批人名称
 *  customerMobile  客户手机号
 *  customerName  客户姓名
 *  guaranteeAmountMax  额度最大值
 *  guaranteeAmountMin  额度最小值
 *  mapStationCode  所属MAP
 *  productType  产品类型
 */
export function creditPendingApprovalListSearch(params) {
  return post('/approve/api/approve-credit/queryApproveCreditPage', params)
}

/**
 * 授信审批 - 已审批授信申请列表查询
 */
export function creditAlreadyApprovalListSearch(params) {
  return post('/approve/api/approve-credit/queryBeenApprovePages', params)
}

/**
 * 授信审批 - 已完成授信申请列表查询
 */
export function creditFinishedApprovalListSearch(params) {
  return post('/approve/api/approve-credit/queryHaveFinishedPages', params)
}

/**
 * 授信审批 - 全部授信申请列表查询
 */
export function creditAllApprovalListSearch(params) {
  return post('/approve/api/approve-credit/selectAllApprovePages', params)
}

/**
 * 自然人担保 详情页面
 */
export function getNaturalDetail(params) {
  return get('/approve/api/approve-guarantee/guaranteeApplication/get', params)
}

/**
 *  自然人担保 - 待审批列表
 *  current: 1, // 当前页数
 *  size: 10, // 每页条数
 *  statusType: 11, // 状态类型
 */
export function naturalPendingApprovalListSearch(params) {
  return post(
    '/approve/api/approve-guarantee/queryApproveGuaranteePage',
    params
  )
}

/**
 *  自然人担保 - 已审批列表
 *  current: 1, // 当前页数
 *  size: 10, // 每页条数
 *  statusType: 11, // 状态类型
 */
export function naturalAlreadyApprovalListSearch(params) {
  return post('/approve/api/approve-guarantee/queryBeenApprovePages', params)
}

/**
 *  自然人担保 - 已完成列表
 *  current: 1, // 当前页数
 *  size: 10, // 每页条数
 *  statusType: 11, // 状态类型
 */
export function naturalFinishedApprovalListSearch(params) {
  return post('/approve/api/approve-guarantee/queryHaveFinishedPages', params)
}

/**
 *  自然人担保 - 全部列表
 *  current: 1, // 当前页数
 *  size: 10, // 每页条数
 *  statusType: 11, // 状态类型
 */
export function naturalAllApprovalListSearch(params) {
  return post('/approve/api/approve-guarantee/selectAllApprovePages', params)
}

/**
 * 法人担保 详情页面
 */
export function getLegalDetail(params) {
  return get(
    '/approve/api/approve-legal-guarantee/legalGuaranteeApplication/get',
    params
  )
}

/**
 * 法人担保 - 待审批列表
 *  current: 1, // 当前页数
 *  size: 10, // 每页条数
 *  statusType: 11, // 状态类型
 */
export function legalPendingApprovalListSearch(params) {
  return post(
    '/approve/api/approve-legal-guarantee/queryApproveGuaranteePage',
    params
  )
}

/**
 * 法人担保 - 已审批列表
 *   current: 1, // 当前页数
 *   size: 10, // 每页条数
 *   statusType: 11, // 状态类型
 */
export function legalAlreadyApprovalListSearch(params) {
  return post(
    '/approve/api/approve-legal-guarantee/queryBeenApprovePages',
    params
  )
}

/**
 * 法人担保 - 已完成列表
 *   current: 1, // 当前页数
 *   size: 10, // 每页条数
 *   statusType: 11, // 状态类型
 */
export function legalFinishedApprovalListSearch(params) {
  return post(
    '/approve/api/approve-legal-guarantee/queryHaveFinishedPages',
    params
  )
}

/**
 * 法人担保 - 全部列表
 *   current: 1, // 当前页数
 *   size: 10, // 每页条数
 *   statusType: 11, // 状态类型
 */
export function legalAllApprovalListSearch(params) {
  return post(
    '/approve/api/approve-legal-guarantee/selectAllApprovePages',
    params
  )
}

/**
 * 查证审批 - 待审批授信申请列表查询
 */

export function inquiryPendingApproveCreditPage(params) {
  return post(
    '/approve/api/approve-query-credit/queryApproveCreditPage',
    params
  )
}

/**
 * 查证审批 - 已完成授信申请列表查询
 */

export function inquiryAlreadyQueryApproveCreditPage(params) {
  return post(
    '/approve/api/approve-query-credit/queryApproveCreditPage',
    params
  )
}

/**
 * 查证审批 - 全部授信申请列表查询
 */
export function inquiryAllQueryApproveCreditPage(params) {
  return post(
    '/approve/api/approve-query-credit/selectAllApprovePages',
    params
  )
}

/**
 * 查证审批 - 自然人历史授信审批记录查询
 */
export function historyCreditSelect(params) {
  return post('/approve/api/approve-credit/queryHistoryCreditPage', params)
}

/**
 * 查证审批 - 自然人历史担保审批记录查询
 */
export function historyEnsureSelect(params) {
  return post(
    '/approve/api/approve-guarantee/queryHistoryGuaranteePage',
    params
  )
}

/**
 * 查证审批 - 法人历史担保审批记录查询
 */
export function historyPersonSelect(params) {
  return post(
    '/approve/api/approve-legal-guarantee/queryLegalHistoryGuaranteePage',
    params
  )
}

/**
 * 授信审批 - 查询产品
 */
export function getQueryProduct() {
  return get('/approve/api/approve-credit/queryProduct')
}

/**
 * 授信审批 - 查询所属MAP
 */
export function getQueryMAP() {
  return get('/approve/api/approve-credit/queryMAP')
}

/**
 * 授信审批 - 查询审批结果
 */
export function getQueryApproveResult() {
  return get('/approve/api/approve-credit/queryApproveResult')
}

/**
 * 法人审批 - 提交审批
 */
export function legalSubmitForApproval(params) {
  return post('/approve/api/approve-legal-guarantee/submitForApproval', params)
}

/**
 * 自然人审批 - 查询审批设置是否展开贷审会名单
 * @param {grantAmount} 金额
 * @param {flowNo} 业务类型
 */
export function naturalQuerySettingConfig(params) {
  return get('/approve/api/approve-bus-setting/querySettingConfig', params)
}

/**
 *  自然人审批 - 提交审批暂存
 *  @param {string} flowNo 业务类型
 *  @param {string} applyNo 订单号
 *  @param {number} commitUserId 当前提交人id
 *  @param {string} commitUserName 当前提交人
 *  @param {string} examineResultNo 审批结果编号
 *  @param {number} grantAmount 金额
 *  @param {string} examineResultDesc 利率
 *  @param {string} examineOpinion 意见
 *  @param {string} returnApprovalLevel 退回目标
 * ......
 */
export function naturalSubmitTraceStaging (params) {
  return post('/approve/api/approve-flow-trace-staging/submitTraceStaging', params)
}

/**
 * 自然人审批 - 查询贷审会用户列表
 * @return {boolean} data 是否展示弹框
 */

export function naturalSecretaryApproveList(params) {
  return get('/approve/api/approve-user/secretaryApproveList', params)
}

/**
 * 自然人审批 - 提交审批
 */
export function approveSubmitForApproval(params) {
  return post('/approve/api/approve-guarantee/submitForApproval', params)
}

/**
 * 查询审批轨迹日志
 */
export function getTraceLog(params) {
  return get('/approve/api/approve-flow-trace/getTraceLog', params)
}

/**
 * 授信审批 枚举列表
 */
export function getApproveEnumList() {
  return get('/approve/api/approve-enum/list')
}

/**
 * 授信审批 风险审批
 */
export function creditSubmitForApproval(params) {
  return post('/approve/api/approve-credit/submitForApproval', params)
}

/**
 * 保存审批业务设置
 */
export function approveBusSettingSave(params) {
  return post('/approve/api/approve-bus-setting/save', params)
}

/**
 * 查询审批业务设置
 */
export function approveBusSettingQuery() {
  return get('/approve/api/approve-bus-setting/query')
}

/**
 * 保存-更新价值认定信息
 */
export function saveValueRisk(params) {
  return post('/approve/api/approve-value-risk/saveValueRisk', params)
}

/**
 * 审批 - 风险审批 退回下拉框数据
 */
export function getQueryReturnApprovalLevelStatus(params) {
  return get(
    '/approve/api/approve-enum/queryReturnApprovalLevelStatus',
    params
  )
}

/**
 * 审批 - 获取风险审批审批结果下拉框接口
 */
export function getApproveTypeSelect(params) {
  return get(`/approve/api/approve-credit/getApproveType/${params}`)
}

/**
 * 审批 - 下载授信申请意见接口
 */
export function getcreditApplyAdvice(params) {
  return `${process.env.VUE_APP_BASE_API}/approve/api/approveApply/creditApplyAdvice?applyNo=${params.applyNo}`
}
