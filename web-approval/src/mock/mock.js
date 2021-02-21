import Mock from 'mockjs'
// mock数据   name: {
//         first: '@FIRST',
//         middle: '@FIRST',
//         last: '@LAST',
//         full: '@first @middle @last'
//     }
var result = Mock.mock({
  code: 200,
  msg: '操作成功',
  data: {
    current_page: 1,
    total: 8,
    'list|8': [
      {
        // 'name|+1': number
        'id|+1': 1, // 模拟id
        'status|1': [0, 1], // 模拟状态,0,1,2,
        // eslint-disable-next-line no-undef
        id: '@id', // 模拟id
        title: '@cname', // 模拟中文姓名
        address: '@county(true)' // 模拟省市县
      }
    ]
  }
})
export default result
