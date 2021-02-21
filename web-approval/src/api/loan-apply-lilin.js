
import {
  get,
  post
} from '@/utils/request'

// 新增、修改 种植作物、地块信息
export function addOrUpdPlant(params) {
  return post('/order/v1/api/credit-apply-plant-info/addOrUpdPlant', params)
}

// 根据订单号及客户id,查询 种植信息列表 详情 App
export function plantInfo(params) {
  return post('/order/v1/api/credit-apply-plant-info/plantInfoApp', params)
}

// 根据订单号及客户id,删除种植信息
export function deletePlant(params) {
  return post('/order/v1/api/credit-apply-plant-info/deletePlant', params)
}

// 新增 || 修改 近三年 种植物信息 App
export function addOrUpdPlantCorpsApp(params) {
  return post('/order/v1/api/credit-apply-plant-info/addOrUpdPlantCorpsApp', params)
}

// PC订单详情
export function creditApplyInfoPc(params) {
  return get('/order/v1/api/credit-apply-info/info/pc', params)
}
