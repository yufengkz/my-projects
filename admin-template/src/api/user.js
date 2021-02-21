import { get, post, put, Delete } from '@/utils/request'

// 获取用户分页列表
export function getUserList(params) {
    return get('/api/operate-user/list', params)
}

// 添加用户
export function addUser(params) {
    return post('/api/operate-user/add', params)
}

// 更新用户
export function updateUser(params) {
    return post('/api/operate-user/update', params)
}

// 删除用户
export function deleteUser(id) {
    return Delete(`/api/operate-user/${id}`)
}

// 角色字典
export function getRoleOptions() {
    return get('/api/operate-role/getRoleList')
}

// 获取角色分页列表
export function getRoleList(params) {
    return get('/api/operate-role/list', params)
}

// 获取所有菜单資源
export function getMenuTree() {
    return get('/api/operate-resources/list')
}

// 获取角色对应資源
export function getRoleInfoById(id) {
    return get(`/api/operate-role/${id}`)
}

// 添加角色
export function addRole(params) {
    return post('/api/operate-role/add', params)
}

// 更新角色
export function updateRole(params) {
    return put('/api/operate-role', params)
}

// 删除角色
export function deleteRole(id) {
    return Delete(`/api/operate-role/${id}`)
}
