import { get, post } from '@/utils/request'

// 分片上传
export function chunkUpload() {
  return `${process.env.VUE_APP_BASE_API}/order/v1/api/uploadFile`
}
// 字典：借款人
export function getCommonEnum() {
  return get('/common/sysDict/appQueryAll')
}
// 图片上传
export function uploadFile() {
  return `${process.env.VUE_APP_BASE_API}/common/uploadFile`
}
// 获取图片实际地址
export function getFilePath(params) {
  return get('/common/download', params)
}

// 省市区三级联动
export function queryCascadeByAreaId() {
  return post('/common/area/queryThreeLvByAreaId', { areaId: 0 })
}

// 获取MAP中心列表
export function getMapInfoList() {
  return get('/common/selMapInfoList')
}

// 获取审批MAP中心列表 (最原始的数据)
export function getMapInfoLists() {
  return get('/common/selMapInfoList')
}

// --------- 下列为订单贷项目接口

// 获取枚举
// export function getEnum() {
//   return get('/ifpc/v1/api/enum/enum')
// }

// 文件上传
// export function uploadFile() {
//   return `${process.env.VUE_APP_BASE_API}/common/uploadFile`
// }

// Excel导入
export function excelImport(formData) {
  return post('/ifpc/v1/api/excel/excelImport', formData, {
    timeout: 1000 * 60 * 2
  })
}

// excel导入模板下载
export function getExcelTemplateUrl(params) {
  return get('/ifpc/v1/api/excel/template', params)
}

// 导入记录查询
// 入参必传项：导入来源source 1:核心企业组织架构 2:核心企业业务员 3:核心企业业务员的融资客户 4:服务费缴费信息
export function getImportLog(params) {
  return get('/ifpc/v1/api/excel/importLogs', params)
}

// 导入记录下载 入参为id
export function downloadImportLog(params) {
  return get('/ifpc/v1/api/excel/downloadLogs', params)
}

// BU列表，下拉框用
export function getBUList() {
  return get('/ifpc/v1/api/central/list')
}

// 产品列表，下拉框用
export function getProductList() {
  return get('/ifpc/v1/api/product/list')
}

// 金融机构列表，下拉框用
export function getFundingPartyList() {
  return get('/ifpc/v1/api/fundParty/getFundingPartyList')
}

// 下面的接口未使用--liudg--2020年08月18日

// 获取token，mock用
export function getMockToken(data) {
  return post('/auth/jwt/token', data)
}

// 获取消息列表：通知、待办
export function getMessage(params) {
  return post('/clientplatform/backlog/backList', params)
}

// 更新通知状态
export function updateNoticeStatus(params) {
  return post('/clientplatform/backlog/bathRead', params)
}

// 删除通知
export function deleteNotice(params) {
  return post('/clientplatform/backlog/bathDelete', params)
}

// 获取预警数目
export function getWarningNum() {
  return get('/clientplatform/alertMessage/getAlertMsgCount')
}

// 预警分页查询
export function getAlertMessage(params) {
  return get('/clientplatform/alertMessage/list', params)
}

// 票据解除或者激活
export function updateAlertStatus(params) {
  return post(
    `/clientplatform//alertMessage/updateStatus?ids=${params.ids}&type=${params.type}`
  )
}

// 获取文件base64
export function getFileBase64(params) {
  return get('/clientplatform/file/downloadImgByUrl', params)
}

// 获取下载文件信息
export function getDownloadInfo(params) {
  return get('/ifpc/v1/api/centralLog/downloadLogs', params)
}

//
export function getResourcesByUrl(params) {
  return post('/approve/api/approve-auth/getResourcesByUrl', params)
}
