import { get, post } from '@/utils/request'

// 查询订单流转审批列表
export function getList(params) {
  return post('/operate/api/order-flow/list', params)
}

// 订单流转审批详情
export function getDetail(params) {
  return post('/operate/api/order-flow/detail', params)
}

// 获取担保人金额、授信金额
export function getMount(params) {
  return get('/operate/api/credit-amount/get', params)
}

// 订单流转审批通过
export function approved(params) {
  return post('/operate/api/order-flow/approved', params)
}

// 订单流转审批拒绝
export function approvalRefuse(params) {
  return post('/operate/api/order-flow/approvalRefuse', params)
}
