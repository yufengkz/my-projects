import { get, post } from '@/utils/request'

// 获取用户分页列表
export function getEnumList() {
  return get('/approve/api/approve-enum/list')
}

// 根据用户获取当前map中心
export function queryMapInfoByRole(mobile) {
  return post(`/approve/api/approve-credit/queryMapInfoByRole/${mobile}`)
}

// 不同权限对应审批状态
export function queryJurisdictionStatus(params) {
  return get('/approve/api/approve-enum/queryJurisdictionStatus', params)
}

// 不同权限对应审批状态
export function getMapList() {
  return get('/common/selProductInfo')
}
