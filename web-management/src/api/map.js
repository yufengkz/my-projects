import { get, post } from '@/utils/request'

// 获取map列表
export function getMapList(params) {
  return post('/operate/api/operate-map/list', params)
}

// 启用map中心用户
export function mapInfoEnable({ id }) {
  return post(`/operate/api/operate-map/mapInfoEnable/${id}`)
}
// 禁用map中心用户
export function mapInfoDisable({ id }) {
  return post(`/operate/api/operate-map/mapInfoDisable/${id}`)
}

// 获取map中心数据 查看/编辑
export function getMapInfo({ id }) {
  return get(`/operate/api/operate-map/${id}`)
}

// 新增、修改map中心基本信息
export function addOrUpdMapInfo(params) {
  return post('/operate/api/operate-map/addOrUpdMapInfo', params)
}

// MAP中心产品查询 弹框列表
export function getMapProducts() {
  return post('/operate/api/operate-map/selIProductInfo')
}

// 修改借款产品
export function editMapProducts(params) {
  return post('/operate/api/operate-map/addOrUpdMapProductInfo', params)
}
// 启用、禁用借款产品
export function editMapLoanProductsStatus(params) {
  return post('/operate/api/operate-map/updateStatus', params)
}

// 人员信息添加、编辑
export function addOrUpdMapUserInfo(params) {
  return post('/operate/api/operate-map/addOrUpdMapUserInfo', params)
}
// 人员信息删除
export function delMapUserInfo({ id }) {
  return get(`/operate/api/operate-map/delMapUserInfo/${id}`)
}
