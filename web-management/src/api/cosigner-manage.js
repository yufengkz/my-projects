import { post } from '@/utils/request'

// 自然人担保列表查询
export function getNaturalPersonList(params) {
  return post('/operate/api/operate-guarantee/queryGuaranteeNaturalPersonPage', params)
}
// 根据订单号和客户号自然人担保审批日志
export function queryGuaranteeApproveLog(params) {
  return post('/order/v1/api/guarantee-legal-person/query-guaranteeApproveLog', params)
}

// 自然人担保获取详情
export function getNaturalPersoDetail(params) {
  return post('/operate/api/operate-guarantee/queryGuaranteeNaturalPerson', params)
}

// 担保人详情
// export function guarantorDetail(parmas) {
//   return get(`/order/v1/api/guarantee-person/detail/${parmas}`)
// }

// 法人担保列表查询 Legal
export function getLegalPersonList(params) {
  return post('/operate/api/operate-guarantee/queryCorporateGuaranteePage', params)
}

// 法人担保获取详情
export function getLegalPersonDetail(parmas) {
  return post('/operate/api/operate-guarantee/queryCorporateGuarantee', parmas)
}

// 担保公司列表查询
export function getCompanyList(params) {
  return post('/operate/api/operate-guarantee/queryGuaranteeCompanyPage', params)
}

// 担保公司详情查询
export function getCompanyDetail(params) {
  return post('/operate/api/operate-guarantee/queryGuaranteeCompany', params)
}

// 编辑担保公司
export function updateCompany(params) {
  return post('/operate/api/operate-guarantee/updateGuaranteeCompany', params)
}

// 新增担保公司
export function addCompany(params) {
  return post('/operate/api/operate-guarantee/addGuaranteeCompany', params)
}
