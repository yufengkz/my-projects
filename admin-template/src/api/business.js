
import {
  get,
  post
} from '@/utils/request'

import {
  combineUrlParam,
  downloadFileByUrl
} from '@/utils/tool'

// 融资企业列表查询
export function getFinanceCompanyList(params) {
  return get('/ifpc/v1/api/financeCompany/getFinanceCompanyList', params)
}

// 融资企业查询结果导出
export function exportFinanceCompnayList(params) {
  const url = combineUrlParam(process.env.VUE_APP_BASE_API + '/ifpc/v1/api/financeCompany/exportFinanceCompnayList', params)
  downloadFileByUrl(url)
}

// 查看融资企业详情
export function getFinanceCompanyDetail(params) {
  return get(`/ifpc/v1/api/financeCompany/getFinanceCompanyDetail/${params.companyId}/${params.creditCode}`)
}

// 企业名称变更
export function changeCompanyName(params) {
  return post('/ifpc/v1/api/financeCompany/changeCompanyName', params)
}

// 企业名称变更-添加详情
export function modifyChangeCompanyInfo(params) {
  return post('/ifpc/v1/api/financeCompany/modifyChangeCompanyInfo', params)
}

// 上传营业执照
export function fileUpload() {
  return process.env.VUE_APP_BASE_API + '/ifpc/v1/api/financeCompany/upload'
}

// 融资企业详情-联系信息
export function getCompanyContactInfo(params) {
  return get(`/ifpc/v1/api/financeCompany/getCompanyContactInfo/${params.companyId}`)
}

// 查看融资企业详情-白名单及订单
export function getCompanyWhiteListInfo(params) {
  return get('/ifpc/v1/api/financeCompany/getCompanyWhiteListInfo', params)
}

// 查看融资企业详情-融资及申请
export function getCompanyFinanceInfo(params) {
  return get(`/ifpc/v1/api/financeCompany/getCompanyFinanceInfo/${params.companyId}`)
}

// 查看企业信息-弹窗用 id为融资意愿id（financeWillingnessId）
export function getFinanceCompanyBaseInfo(params) {
  return get(`/ifpc/v1/api/financeCompany/getFinanceCompanyBaseInfo/${params.id}`)
}

// 查看融资企业详情-支用
export function getCompanyWhitdrawalInfo(params) {
  return get('/ifpc/v1/api/financeCompany/getCompanyWhitdrawalInfo', params)
}

// 查看融资企业详情-还款及贷后
export function getCompanyRepayInfo(params) {
  return get(`/ifpc/v1/api/financeCompany/getCompanyRepayInfo/${params.companyId}`)
}

// 融资意愿列表查询
export function getFinancingWillingnessList(params) {
  return get('/ifpc/v1/api/financingWillingness/getFinancingWillingnessList', params)
}

// 融资意愿查询结果-导出
export function exportFinanceWillingnessList(params) {
  const url = combineUrlParam(process.env.VUE_APP_BASE_API + '/ifpc/v1/api/financingWillingness/exportFinanceWillingnessList', params)
  downloadFileByUrl(url)
}

// 查看融资意愿详情
export function getFinanceWillingnessDetail(params) {
  return get('/ifpc/v1/api/financingWillingness/getFinanceWillingnessDetail', params)
}

// 查看融资意愿下的 金融产品详情
export function getFinanceProductDetail(params) {
  return get(`/ifpc/v1/api/financingWillingness/getFinanceProcductDetail/${params.id}`)
}

// 融资意愿详情-获取实控人授权书相关信息。id为融资意愿ID(financeWillingnessId)
export function getAuthData(params) {
  return get(`/ifpc/v1/api/financingWillingness/getAuthObsPath/${params.id}`)
}

// 获取授信申请合同 id为授信申请编号
export function getCreditApplyContractList(params) {
  return get(`/ifpc/v1/api/creditApply/sign/${params.id}`)
}

// 获取授信合同打包下载地址 id为授信申请编号
export function getContractPackageUrl(params) {
  return get(`/ifpc/v1/api/creditApply/downloads/${params.id}`)
}

// 获取授信合同单证下载地址, id为云签合同编号 cloudContractId, name为合同名称 contractName
export function getCreditContractUrl(params) {
  return get(`/ifpc/v1/api/creditApply/download/${params.id}/${params.name}`)
}

// 获取授信申请列表
export function getCreditApplyList(params) {
  return get('/ifpc/v1/api/creditApply/list', params)
}

// 授信申请查询结果导出
export function exportCreditApplyList(params) {
  const url = combineUrlParam(process.env.VUE_APP_BASE_API + '/ifpc/v1/api/creditApply/export', params)
  downloadFileByUrl(url)
}

// 获取授信申请详情 id为授信申请编号
export function getCreditApplyDetail(params) {
  return get(`/ifpc/v1/api/creditApply/${params.id}`)
}

// 获取合同列表
export function getContractList(params) {
  return get('/ifpc/v1/api/contract/getContractList', params)
}

// 合同列表查询，获取打包下载url
export function getContractZipUrl(params) {
  return get('/ifpc/v1/api/contract/downloadZip', params)
}

// 获取合同完整路径 id为合同编号
export function getContractUrl(params) {
  return get(`/ifpc/v1/api/contract/downloadFile/${params.id}`)
}

// 获取订单列表
export function getOrderList(params) {
  return get('/ifpc/v1/api/order/getOrderList', params)
}

// 订单查询结果导出
export function exportOrderList(params) {
  const url = combineUrlParam(process.env.VUE_APP_BASE_API + '/ifpc/v1/api/order/exportOrderList', params)
  downloadFileByUrl(url)
}

// 获取订单详情 id为订单id
export function getOrderDetail(params) {
  return get(`/ifpc/v1/api/order/getOrderDetail/${params.id}`)
}

// 获取支用申请列表
export function getWithdrawalList(params) {
  return get('/ifpc/v1/api/withdrawal/list', params)
}

// 支用申请查询结果导出
export function exportWithdrawalList(params) {
  const url = combineUrlParam(process.env.VUE_APP_BASE_API + '/ifpc/v1/api/withdrawal/export', params)
  downloadFileByUrl(url)
}

// 获取支用申请详情 id为支用申请id
export function getWithdrawalDetail(params) {
  return get(`/ifpc/v1/api/withdrawal/${params.id}`)
}

// 获取支用关联订单分页列表
export function getWithdrawalOrderList(params) {
  return get('/ifpc/v1/api/withdrawal/withdrawalOrder', params)
}

// 获取借据列表
export function getLoanReceiptList(params) {
  return get('/ifpc/v1/api/contract/getLoanReceiptList', params)
}

// 借据查询结果导出
export function exportLoanReceiptList(params) {
  const url = combineUrlParam(process.env.VUE_APP_BASE_API + '/ifpc/v1/api/contract/exportLoanReceiptList', params)
  downloadFileByUrl(url)
}
// 借据详情查询
export function getLoanReceiptRepayDetail(params) {
  return get(`/business/loan-receipt/repay-detail/${params.id}`)
}

// 获取邀请码列表
export function getInvitationList(params) {
  return get('/ifpc/v1/api/userRoleInvitation/list', params)
}

// 邀请码查询结果导出
export function exportnvitationList(params) {
  const url = combineUrlParam(process.env.VUE_APP_BASE_API + '/ifpc/v1/api/userRoleInvitation/export', params)
  downloadFileByUrl(url)
}

// 获取邀请码详情 id为邀请码id
export function getnvitationDetail(params) {
  return get(`/ifpc/v1/api/userRoleInvitation/${params.id}`)
}
