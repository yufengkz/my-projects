import { get, post } from '@/utils/request'

/**
 *  担保人管理-自然人担保管理
 */

/**
 * 担保人 待办 已办分页查询
 *
 * applyNo 申请编号
 * applyTime 申请时间
 * mobile 手机号
 * queryType 待办todo 已办 done 已办结 finished 全部 all
 * name 姓名
 * */
export function guaranteeMortgageList(params) {
  return post('/order/v1/api/guarantee-person/page-task-query', params)
}
// 担保人申请创建
export function applyCreate(parmas) {
  return post('/order/v1/api/guarantee-person/create', parmas)
}
// 担保人详情
export function guarantorDetail(parmas) {
  return get(`/order/v1/api/guarantee-person/detail/${parmas}`)
}
// 提交申请准入
export function submitApplyAccess(parmas) {
  return post('/order/v1/api/guarantee-person/submit', parmas)
}
// 完善基本信息
export function perfectBasicInfo(parmas) {
  return post('/order/v1/api/guarantee-person/complete-base-info', parmas)
}
// 完善家庭资产信息
export function perfectFamilyInfo(parmas) {
  return post('/order/v1/api/guarantee-person/complete-family-asset-info', parmas)
}
// 完善信息
export function perfectInfo(parmas) {
  return post('/order/v1/api/guarantee-person/complete-info', parmas)
}
// 提交审批
export function submitApprove(parmas) {
  return post('/order/v1/api/guarantee-person/submit-approve', parmas)
}
/**
 * 担保人管理-法人担保管理列表
 */
// 担保法人创建
export function legalPersonCreate(parmas) {
  return post('/order/v1/api/guarantee-legal-person/create', parmas)
}
// 担保法人分页查询
export function legalPersonSearch(parmas) {
  return post('/order/v1/api/guarantee-legal-person/page-task-query', parmas)
}
// 担保法人详情
export function legalPersonDetail(parmas) {
  return get(`/order/v1/api/guarantee-legal-person/detail/${parmas}`)
}
// 担保法人提交审批
export function legalPersonSubmitApprove(parmas) {
  return post('/order/v1/api/guarantee-legal-person/submit-approve', parmas)
}
// 担保法人详情联系人列表
export function detailLegalPersonList(parmas) {
  return get(`/order/v1/api/guarantee-legal-person-contact/contract-list/${parmas}`)
}
// 担保法人详情股东列表
export function detailShareholderList(parmas) {
  return get(`/order/v1/api/guarantee-legal-person-shareholder/list/${parmas}`)
}
// 担保法人详情财务列表
export function detailFinanceList(parmas) {
  return get(`/order/v1/api/guarantee-legal-person-finance/finance-list/${parmas}`)
}

// 查询担保法人影像列表
export function getLegalImageList(legalPersonId) {
  return get(`/order/v1/api/guarantee-legal-person-file/file-list/${legalPersonId}`)
}
// 释放担保法人占用
export function releaseLegalPersonOccupyRemove(parmas) {
  return post(`/order/v1/api/guarantee-legal-person/release-occupy/${parmas}`)
}
// 担保法人批量上传
export function batchUpload() {
  return `${process.env.VUE_APP_BASE_API}/order/v1/api/guarantee-legal-person-file/batch-upload`
}
// 担保法人占用
export function releaseLegalPersonOccupy(parmas) {
  return post(`/order/v1/api/guarantee-legal-person/occupy/${parmas}`)
}

// 根据订单号和客户号查询担保法人审批日志
export function queryGuaranteeApproveLog(params) {
  return post('/order/v1/api/guarantee-legal-person/query-guaranteeApproveLog', params)
}
// 根据订单号和客户号自然人担保审批日志
export function ApproveLog(params) {
  return post('/order/v1/api/guarantee-approve-log/query-guaranteeApproveLog', params)
}
// 授信借款人绑定的担保人日志查询接口
export function creditApplyApproveLog(params) {
  return get(`/order/v1/api/guarantee-person/query-creditApplyApproveLog/${params}`)
}
// 担保法人获取最新审批记录
export function getNewLog(params) {
  return post('/order/v1/api/guarantee-approve-log/queryIpToDataForLog', params)
}
// 担保法人放弃展业
export function giveUp(orderNo) {
  return post(`/order/v1/api/guarantee-legal-person/give-up/${orderNo}`)
}
// 担保审批驳回
export function examineReject(parmas) {
  return post('/order/v1/api/guarantee-approve-log/refusal', parmas)
}

// 担保人影像批量保存接口
export function guaranteeFileBatchSave(parmas) {
  return post('/order/v1/api/guarantee-person-file/batch-save', parmas)
}

// 完善家庭负债
export function familyBatchSave(parmas) {
  return post('/order/v1/api/guarantee-person-family-liabilities/batch-save', parmas)
}

// 释放担保人占用
export function releaseOccupyRemove(parmas) {
  return post(`/order/v1/api/guarantee-person/release-occupy/${parmas}`)
}

// 担保人占用
export function releaseOccupyAdd(parmas) {
  return get(`/order/v1/api/guarantee-person/occupy/${parmas}`)
}

// 自然人放弃展业
export function nuturalGiveUp(params) {
  return post(`/order/v1/api/guarantee-person/give-up/${params}`)
}

// 担保法人证件类型
export function getQueryEnumMap() {
  return get('/order/v1/api/guarantee-enum/queryEnumMap')
}
