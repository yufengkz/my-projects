import {
  get,
  post,
  Delete
} from '@/utils/request'

// 业务员查询
export function getCentralUser(params) {
  return get(`/ifpc/v1/api/centralUser/centralUser?id=${params}`)
}
// 业务员新增/修改
export function modifyCentralUser(params) {
  return post('/ifpc/v1/api/centralUser/centralUser', params)
}
// 业务员删除
export function deleteCentralUser(params) {
  return Delete(`/ifpc/v1/api/centralUser/centralUser?ids=${params}`)
}
// 业务员列表查询
export function getCentralUserList(params) {
  return get('/ifpc/v1/api/centralUser/centralUsers', params)
}
// 业务员开启/关闭
export function switchUserRole(params) {
  return post(`/ifpc/v1/api/centralUser/userRole?id=${params}`)
}
// ----------------------融资客户管理
// 查询融资客户列表
export function getCompanyList(params) {
  return get('/ifpc/v1/api/company/companyList', params)
}
// 获取统一利润中心下的所有业务员
export function getSalesmanList(params) {
  return get(`ifpc/v1/api/company/user?profitId=${params}`)
}
// 调整客户所属业务员
export function adjustSalesman(params) {
  return post('/ifpc/v1/api/company/user', params)
}
// -----------------------组织架构
// 组织架构查询/三级联动
export function getcentral(params) {
  return get('/ifpc/v1/api/central/centralEnterprises', params)
}
// 企业详情查询
export function getInfo(params) {
  return get(`/ifpc/v1/api/central/centralEnterprise?id=${params}`)
}
// 融资客户管理详情
export function getDetail(params) {
  return get('/ifpc/v1/api/whiteList/sale/list', params)
}
