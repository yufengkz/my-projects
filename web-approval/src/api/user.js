import { get, post, put, Delete } from '@/utils/request'

// 获取用户分页列表
export function getUserList(params) {
  return get('/approve/api/approve-user/list', params)
}

// 添加用户
export function addUser(params) {
  return post('/approve/api/approve-user/add', params)
}

// 更新用户
export function updateUser(params) {
  return post('/approve/api/approve-user/update', params)
}

// 删除用户
export function deleteUser(id) {
  return Delete(`/approve/api/approve-role/${id}`)
}

// 禁用用户
export function stopUser(id) {
  return put(`/approve/api/approve-user/userDisable/${id}`)
}

// 启用用户
export function startUser(id) {
  return put(`/approve/api/approve-user/userEnable/${id}`)
}

// 角色字典
export function getRoleOptions() {
  return get('/approve/api/approve-role/getRoleList')
}

// 获取角色分页列表
export function getRoleList(params) {
  return get('/approve/api/approve-role/list', params)
}

// 获取所有菜单資源
export function getMenuTree() {
  return get('/approve/api/approve-resources/editRoleResources')
}

// 获取角色对应資源
export function getRoleInfoById(id) {
  return get(`/approve/api/approve-resources/editRoleResources/${id}`)
  // return get(`/approve/api/approve-role/${id}`) // 之前的接口
}

// 添加角色
export function addRole(params) {
  return post('/approve/api/approve-role/add', params)
}

// 更新角色
export function updateRole(params) {
  return put('/approve/api/approve-role', params)
}

// 删除角色
export function deleteRole(id) {
  return Delete(`/approve/api/approve-role/${id}`)
}

// 切换用户角色
export function changeRole(params) {
  return get('/approve/api/approve-user/changeRole', params)
}
// 获取用户角色组、获取代办事项
export function getNextRoleInfo() {
  return get('/approve/api/approve-user/getNextRoleInfo')
}
