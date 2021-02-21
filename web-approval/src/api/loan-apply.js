/** 展业端 贷款申请 */
import {
  get,
  post
} from '@/utils/request'

// 贷款申请列表
export function getApplyInfo(params) {
  return post('/order/v1/api/credit-apply-info/creditPageInfo', params)
}
// 借款人基本信息
export function getBasicInfo(params) {
  return post('/order/v1/api/credit-apply-info/getCreditApplyBasrc', params)
}
// 业务准备 信息
export function getrReadyInfo(params) {
  return post('/order/v1/api/credit-apply-info/getAdmitCreditApply', params)
}
// 完善基本信息
export function getLoanInfo(params) {
  return post('/order/v1/api/credit-apply-person-info/queryCreditApplyBasicInformation', params)
}
// 保存基本信息
export function preserveBasicInfo(params) {
  return post('/order/v1/api/credit-apply-person-info/addApplyBasicInformation', params)
}
// 保存联系人信息
export function preserveContactsInfo(params) {
  return post('/order/v1/api/credit-apply-person-info/addApplyCusLinkman ', params)
}
// 保存家庭负债
export function preserveFamilyDebtInfo(params) {
  return post('/order/v1/api/credit-apply-person-info/addApplyCreditApplyFamlilyFinance', params)
}
// 保存家庭流水统计
export function preserveFamilyWaterInfo(params) {
  return post('/order/v1/api/credit-apply-person-info/addApplyCustomerInfo', params)
}
// 保存名下企业
export function preserveCompanyInfo(params) {
  return post('/order/v1/api/credit-apply-person-info/addApplyCreditApplyCusEnterpriseDetail', params)
}
// 保存家庭财产状况
export function preserveFamilyAssetsInfo(params) {
  return post('/order/v1/api/credit-apply-person-info/addApplyCreditApplyLoanInfo', params)
}
// 借款人影像信息获取
export function getImageInfo(params) {
  return get('/order/v1/api/fileInfo/real', params)
}

// 借款人影像信息上传
export function uploadFile() {
  return `${process.env.VUE_APP_BASE_API}/order/v1/api/fileInfo`
}
// 借款人影像信息删除
export function uploadFileRemove(params) {
  return post('/order/v1/api/fileInfo/de', params)
}
/**
 * 根据机构名称查询担保法人
 * organName 组织名称
 */
export function getCreditGuaranteeLegalPersonLegalPerson(params) {
  return get('/order/v1/api/guarantee-legal-person/legal-person', params)
}

/**
 *
 * 担保公司列表
 */
export function getCreditGuaranteeCompanyList() {
  return get('/order/v1/api/guarantee-company/list')
}

// /**
//  * 借款关联的担保人列表
//  * orderNo
//  */
// export function getCreditGuaranteePersonList(params) {
//   return post('/order/v1/api/guarantee-person/list', params)
// }

/**
 * 查询借款关联的增信信息
 * orderNo
 */
export function getGuaranteePersonCreditApplyInfo(orderNo) {
  return get(`/order/v1/api/guarantee-person-credit-apply/guarantee-list/${orderNo}`)
}

// 查询借款关联的全部增信信息
export function getGuaranteePersonCreditApplyAllInfo(params) {
  return post('/order/v1/api/credit-apply-enhancement/detail', params)
}

/**
 * 担保人详情
 * applyNo
 */
export function getGuaranteePersonDetailInfo(params) {
  // return get('/order/v1/api/guarantee-person/detail', params)
  return get(`/order/v1/api/guarantee-person/detail/${params.applyNo}`)
}

/**
 *
 * 保存担保人基本信息
 */
export function saveGuaranteePersonBaseInfo(params) {
  return post('/order/v1/api/guarantee-person/complete-base-info/', params)
}

/**
 *
 * 保存担保人家庭负债
 */
export function saveGuaranteePersonFamilyLiabilitites(params) {
  return post('/order/v1/api/guarantee-person-family-liabilities/batch-save/', params)
}
/**
 *
 * applyStatus //状态
applySumMax //申请额度大
applySumSmall //申请额度小
centerId //所属map
changeMapFlowNo //审批流水号
changeMapStatus //订单流转审批状态 1待审批 2审批通过
current
customerMobile //手机号
customerName //客户姓名
endTime //结束时间
newUserFlag //是否新客户
orderNo //订单号
pageSize
productCode //产品编号
productType //产品类型
queryStatus //查询类型状态 1:代办 2:已办 3:已完成 4:全部
startTime //开始时间
 */
export function creditApplyInfoList(params) {
  return post('/order/v1/api/credit-apply-info/creditPageInfo', params)
}

/**
 *
 * 按类型删除增信-借款关联
 */
export function creditApplyDelGuaranteeForm(params) {
  return post('/order/v1/api/guarantee-person-credit-apply/del-guarantee-from-credit-by-type', params)
}

/**
 *
 * 更新主征信类型
 */
export function creditApplyUpdateMajorGuarantee(params) {
  return post('/order/v1/api/guarantee-person-credit-apply/update-major-guarantee', params)
}

/**
 *
 * 借款申请 保存增信新
 */
export function creditApplySaveGuaranteeeAllInfo(params) {
  return post('/order/v1/api/guarantee-person-credit-apply/save-guarantee-to-credit', params)
}

/**
 * 自然人担保 批量保存影像信息
 */

export function creditApplyGuaranteePersonBetchSaveFileInfo(params) {
  return post('order/v1/api/guarantee-person-file/batch-save', params)
}

/**
 * 业务准备信息提交
 *  loanCustomerType: "2"         // 客户类型
    newMapFlag: "Y"               // 是否首次与MAP合作
    productId: "个人-农资贷"        // 选择申请产品
    relcustomerRiskOutVosMaps:{
      common: {…}                 // 共借人信息
      guarantee: []               // 担保人信息
      self: {…}                   // 借款人信息
    }
 */

export function saveAdmitCreditApplyInfo(params) {
  return post('/order/v1/api/credit-apply-info/admitCreditApply', params)
}
