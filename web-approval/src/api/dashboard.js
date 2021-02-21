// 数据看板相关接口
import { get } from '@/utils/request'

// 债务人-融资申请和累计放款图表接口
/**
 *
 * @param {string} entNo 企业编号 用户登录后获取企业编号
 * @param {string} month 选择全年传 00 其他月份 例如 ：2月份传 02
 * @param {string} year 年份
 */
export function getDebtorChartData(params) {
  return get('/clientplatform/debtorIndex/getBarChartData', params)
}

/**
 * 保理-承兑人用信和累计放款饼状图接口
 * 返回值的data结构为
 * acceptorDatas
 *  amount
 *  entName
 * loanDatas
 *  amount
 *  entName
 */
export function getPieChartData() {
  return get('/clientplatform/factoringIndex/getPieChart')
}

/**
 * 融资人&保理端-融资申请和累计放款图表接口
 * @param {string} entNo 企业编号，融资人登陆需要传 保理端登陆不需要传
 * @param {string} month 查询月份，选择全年传 00 如果是其他月份 ,例如 ：选择2月就传 02
 * @param {string} type 查询类型，0：查询融资申请和累计放款两个图表 数据 1:只查询融资申请图表 2:只查询累计放款图表
 * @param {string} year 查询年份，传选择的年份 例如：2019
 */
export function getFinancierChartData(params) {
  return get('/clientplatform/financierIndex/getBarChartData', params)
}
