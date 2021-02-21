/** 展业端 业务公共接口 贷款申请、自然人担保、法人担保 */
import {
  post,
  get
} from '@/utils/request'

/**
 * 未占用抵押物列表
 * guaranteePersonIds 担保人客户号
 * loanPersonId 借款人客户号
 * */
export function getAvailabelMortgageList(params) {
  return get('/order/v1/api/guarantee-mortgage/available-mortgage-list', params)
}

/**
 * 未占用质押物列表
 * guaranteePersonIds 担保人客户号
 * loanPersonId 借款人客户号
 * */
export function getAvailabelPledgeList(params) {
  return post('/order/v1/api/guarantee-pledge/available-pledge-list', params)
}

/**
 * 借款关联的抵押物列表
 * orderNo 借款单
 * */
export function getGuaranteeMortgageList(params) {
  return get(`/order/v1/api/guarantee-mortgage/list/${params.orderNo}`)
}
/**
 * 借款关联的质押物列表
 * orderNo 借款单
 * */
export function getGuaranteePledgeList(params) {
  return get(`/order/v1/api/guarantee-pledge/pledge-list/${params.orderNo}`)
}

/**
 * 抵押物创建
 *  type 代表创建的类型code
 */
export function mortgageCreate(type, params) {
  if (type === 'house') {
    return post('/order/v1/api/guarantee-mortgage/house-create', params)
  } else if (type === 'build_land') { // 建设用地使用权
    return post('/order/v1/api/guarantee-mortgage/buildLand-create', params)
  } else if (type === 'countryside_land') { // 农村地产
    return post('/order/v1/api/guarantee-mortgage/countrysideLand-create', params)
  } else if (type === 'special_machine') { // 专业设备
    return post('/order/v1/api/guarantee-mortgage/machine-create', params)
  } else if (type === 'agriculture_product') { // 农副产品
    return post('/order/v1/api/guarantee-mortgage/product-create', params)
  } else if (type === 'equipment') { // 机器设备
    return post('/order/v1/api/guarantee-mortgage/equipment-create', params)
  } else if (type === 'breed') { // 生物资产
    return post('/order/v1/api/guarantee-mortgage/breed-create', params)
  } else if (type === 'land_contract') { // 农村土地承包经营权
    return post('/order/v1/api/guarantee-mortgage/landContract-create', params)
  } else if (type === 'forestry') { // 林权
    return post('/order/v1/api/guarantee-mortgage/forestry-create', params)
  }
}

/**
 * familyIncomeListDTO:家庭年收入列表
家庭年收入列表实体
家庭年收入列表实体
breedCreateDTOS养殖收入列表
array
养殖收入创建请求实体
businessCreateDTOS经商收入列表
array
经商收入创建请求实体
machineryCreateDTOS农机服务收入列表
array
农机服务创建请求实体
plantCreateDTOS种植收入列表
array
家庭年收入基础实体
salaryCreateDTOS固定工资收入列表
array
固定工资收入创建请求实体
subsidiesCreateDTOS政府补贴收入列表
array
政府补贴创建请求实体
workingCreateDTOS打工收入列表
 *
 */
export function guaranteePersonFamilyIncomeSave(params) {
  return post('/order/v1/api/guarantee-person-family-income/batch-save', params)
}

/**
 *
 * 家庭年收入支出
 * acquisitionAssetsDTOS 购置资产
 * agriculturalMachineryDTOS 农机服务
 * baseDTOS 基本支出
 * doingBusinessDTOS 经商收入与支出
 * farmingDTOS 养殖收入与支出
 * fixedSalaryDTOS 固定工资
 * governmentSubsidiesDTOS 政府补贴
 * workingDTOS 打工收入
 */
export function creditFamlilyIncomeinfoSave(params) {
  return post('/order/v1/api/credit-apply-famlily-come-info/addOrUpdate', params)
}
/** 借款人的家庭年收入与支出的保存接口 */
export function addApplyCreditApplyFamlilyComeInfo(params) {
  return post('/order/v1/api/credit-apply-person-info/addApplyCreditApplyFamlilyComeInfo', params)
}
/**
 * 质押物创建
 *  type 代表创建的类型code
 */
export function pledgeCreate(type, params) {
  if (type === 'receivable_account') {
    return post('/order/v1/api/guarantee-pledge/receivable-create', params)
  } else if (type === 'receivable_rent') {
    return post('/order/v1/api/guarantee-pledge/rent-create', params)
  } else if (type === 'legal_right') {
    return post('/order/v1/api/guarantee-pledge/right-create', params)
  }
}

//
/**
 *
 * 查询借款关联的增信用户信息
 * customerId
 * orderNo
 */
export function getCreditAppleRelciustomer(params) {
  return get('/order/v1/api/credit-apply-relcustomer-risk-info/personnel', params)
}

/**
 * 完善家庭资产信息
 */
export function saveFamilyAssetInfo(params, type) {
  console.log(type, params)
  if (type === 'basicInfo') {
    return post('/order/v1/api/credit-apply-person-info/addApplyCreditApplyLoanInfo', params)
  } else {
    return post('/order/v1/api/guarantee-person/complete-family-asset-info', params)
  }
}

/**
 *
 * 获取抵押物影像列表
 */
export function getGuaranteeMortgageFileList(params) {
  return get(`/order/v1/api/guarantee-mortgage-file/list/${params.mortgageId}`)
}
/**
 *
 * 获取质押物影像列表
 */
export function getGuaranteePledgeFileList(params) {
  return get(`/order/v1/api/guarantee-pledge-file/list//${params.pledgeId}`)
}
