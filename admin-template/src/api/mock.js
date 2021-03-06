import { get } from '@/utils/request'

// 穿梭框
export function getTranferList(params) {
    return get('/api/mock/Transfer', params)
}
// 可编辑表格
export function getEditTabelList(params) {
    return get('/api/editTable/list', params)
}

// 角色列表
export function getRoleOptions(params) {
    return get('/api/mock/roleList', params)
}

// getMD
export function getMD(params) {
    return get('/api/mock/markdown')
}
