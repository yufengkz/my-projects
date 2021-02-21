import Mock from 'mockjs'
// 导入的模拟数据
import analogData from './mock'

/**
 * Mock.mock( rurl, rtype, template )
 * rurl:请求的接口地址
 * rtype:提交方式
 * template:返回数据
 */

Mock.mock('http://localhost:1408/test/lvsige', 'get', analogData)
