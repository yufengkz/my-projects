import { get, post } from '@/utils/request'

export const getRosterList = params => post('/operate/api/black-list/list', params)

// 添加
export const addRoster = params => post('/operate/api/black-list/add', params)

// 修改
export const editRoster = params => post('/operate/api/black-list/update', params)

// 删除名单
export const delRoster = id => get(`/operate/api/black-list/delete/${id}`)
