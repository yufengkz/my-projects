/** 审批端 业务公共接口 审批人员设置  */

import { get } from '@/utils/request'
/**
 * 审批人员设置 - 查询用户列表 （接口没调）
 * @param {current} params 页数起始下标
 * @param {size} params 每页条数
 */
export function getApproveUserSearchList(params) {
  return get('/approve/api/approve-user/list', params)
}
