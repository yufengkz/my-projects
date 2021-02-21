import { get, post } from '@/utils/request'
// 根据类型查询字典 获取枚举
export function getStatusEnum(params) {
  return post('/common/sysDict/queryByType', params)
}

// 获取图片实际地址
export function getFilePath(params) {
  return get('/common/download', params)
}
/**
 * 自己写的  ↑↑↑↑↑↑↑↑↑↑↑↑
 */

// Excel导入
export function excelImport(formData) {
  return post('/operate/api/black-list/batch', formData, {
    timeout: 1000 * 60 * 2
  })
}

/**
 * 运管新加
 * 自己模拟下载接口
 * @param {*} filename
 */
// excel导入模板下载
export const getExcelTemplateUrl = filename => {
  return new Promise((resolve, reject) => {
    resolve({
      isOk: true,
      status: 200,
      code: '',
      message: '成功',
      data: {
        filename,
        url: '/download/'
      }
    })
  })
}
/**
 * 自己写的
 */
// 获取地区所有数据
export function getRegions(params = { areaId: 0 }) {
  return post('/common/area/queryThreeLvByAreaId', params)
}

// 新增
//  根据区域id查询当前区域信息及下一级 省-市-区
export function getProvince(params = { areaId: 0 }) {
  return post('/common/area/queryByPid', params)
}
// 市
export function getCity(params) {
  return post('/common/area/queryByAreaId', params)
}
// 县、区
export function getCounty(params) {
  return post('/common/area/queryByAreaId', params)
}

//
//
// 字典：借款人
export function getCommonEnum() {
  return get('/common/sysDict/appQueryAll')
}
// 字典：担保人
export function getGuanranteeEnum() {
  return get('/operate/api/guarantee-enum/list')
}
