import { post } from '@/utils/request'

// 查询客户管理列表
export function getList(params) {
  return post('/operate/api/customer/getCustomerPageList', params)
}
