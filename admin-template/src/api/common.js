import { get, post } from '@/utils/request'
// 获取枚举
export function getEnum() {
    return get('/api/enum/enum')
}

// 文件上传
export function uploadFile() {
    return process.env.VUE_APP_BASE_API + '/api/fileCommon/uploadFile'
}

/**
 * 根据obsKey获取文件OBS路径
 * @param {string} obsKey 文件obs主键
 */
export function getFilePath(params) {
    return get('/api/fileCommon/downloadFileByObsKey', params)
}

/**
 * 根据云签合同相关信息获取文件OBS路径
 * @param {string} cloudTemplateId 云签平台合同编号
 * @param {string} cloudTemplateName 云签平台合同名称
 */
export function getFilePathFromCloud(params) {
    return get('/api/fileCommon/downloadFileByCloudContractId', params)
}

// Excel导入
export function excelImport(formData) {
    return post('/api/excel/excelImport', formData, {
        timeout: 1000 * 60 * 2
    })
}

// excel导入模板下载
export function getExcelTemplateUrl(params) {
    return get('/api/excel/template', params)
}

// 导入记录查询
// 入参必传项：导入来源source 1:核心企业组织架构 2:核心企业业务员 3:核心企业业务员的融资客户 4:服务费缴费信息
export function getImportLog(params) {
    return get('/api/excel/importLogs', params)
}

// 导入记录下载 入参为id
export function downloadImportLog(params) {
    return get('/api/excel/downloadLogs', params)
}

// BU列表，下拉框用
export function getBUList() {
    return get('/api/central/list')
}

// 产品列表，下拉框用
export function getProductList() {
    return get('/api/product/list')
}

// 金融机构列表，下拉框用
export function getFundingPartyList() {
    return get('/api/fundParty/getFundingPartyList')
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
    return post(`/clientplatform//alertMessage/updateStatus?ids=${params.ids}&type=${params.type}`)
}

// 获取文件base64
export function getFileBase64(params) {
    return get('/clientplatform/file/downloadImgByUrl', params)
}

// 获取下载文件信息
export function getDownloadInfo(params) {
    return get('/api/centralLog/downloadLogs', params)
}
