import { get, post } from '@/utils/request'

// 贷款产品查询
export function getMapProductInfoList() {
  return get('/operate/api/operate-map/queryMapProductInfoList')
}

// 贷款/借款产品列表查询
export function getLoanList(params) {
  return post('/operate/api/operate-productinfo/queryProductInfoPage', params)
}

// 修改贷款产品启用状态
export function editLoanStatu(params) {
  return post('/operate/api/operate-productinfo/updateBringIntoUse', params)
}

// 根据主键id,查询贷款产品详细信息
export function getLoanProductInfo(params) {
  return post('/operate/api/operate-productinfo/queryProductInfoByPrimaryKey', params)
}

// // 新增 || 修改 贷款产品信息
export function addOrUpdProductInfo(params) {
  return post('/operate/api/operate-productinfo/addOrUpdProductInfo', params)
}

// 贷款产品 合作企业查询
export function getCooperativeEnterprise(params) {
  return post('/operate/api/operate-productinfo/queryCooperativeEnterprise', params)
}
