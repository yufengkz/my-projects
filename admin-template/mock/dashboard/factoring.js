module.exports = [
  // 保理-承兑人用信和累计放款饼状图接口
  {
    url: '/clientplatform/factoringIndex/getPieChart',
    type: 'get',
    response: _config => {
      return {
        isOk: true,
        status: 200,
        message: '成功',
        data: {
          'acceptorDatas': [{
            'entName': '百世债务人(天津)有限公司',
            'amount': '252000096.00'
          }, {
            'entName': '欣欣双响',
            'amount': '236000096.00'
          }, {
            'entName': '罗系统测试',
            'amount': '65000003.00'
          }, {
            'entName': '百世债务人',
            'amount': '60600003.00'
          }, {
            'entName': '罗冒烟测试二1',
            'amount': '40000003.00'
          }, {
            'entName': '其他公司',
            'amount': '146400030.00'
          }],
          'loanDatas': [{
            'entName': '新融资人四',
            'amount': '658242247.66'
          }, {
            'entName': '罗融资人注册二',
            'amount': '517389813.89'
          }, {
            'entName': '融资人印章更新二',
            'amount': '451044693.87'
          }, {
            'entName': '验收融资人',
            'amount': '401044693.34'
          }, {
            'entName': '验收双角色',
            'amount': '351044693.56'
          }, {
            'entName': '其他公司',
            'amount': '301044693.50'
          }]
        }
      }
    }
  },
  // 融资人&保理端-融资申请和累计放款图表接口
  {
    url: '/clientplatform/financierIndex/getBarChartData',
    type: 'get',
    response: _config => {
      const res = {
        isOk: true,
        status: 200,
        message: '成功',
        data: {
          'applyFinanceTotalCount': 114,
          'applyFinanceTotalAmount': '390640426.00',
          'applyFinanceSumCount': 114,
          'applyFinanceSumAmount': '390640426.00',
          'loanTotalCount': 69,
          'loanTotalAmount': '276536671.60',
          'loanSumCount': 69,
          'loanSumAmount': '276536671.60',
          'dayList': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
          'monthList': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          'applyFinanceDatas': [{
            'count': 629,
            'amount': '5312.00'
          }, {
            'count': 532,
            'amount': '6689.00'
          }, {
            'count': 200,
            'amount': '7440.00'
          }, {
            'count': 164,
            'amount': '5440.00'
          }, {
            'count': 390,
            'amount': '6650.00'
          }, {
            'count': 230,
            'amount': '8340.00'
          }, {
            'count': 379,
            'amount': '6560.00'
          }, {
            'count': 352,
            'amount': '7560.00'
          }, {
            'count': 66,
            'amount': '6780.00'
          }, {
            'count': 180,
            'amount': '8500.00'
          }, {
            'count': 290,
            'amount': '4660.00'
          }, {
            'count': 230,
            'amount': '5770.00'
          }, {
            'count': 220,
            'amount': '5770.00'
          }, {
            'count': 111,
            'amount': '7070.00'
          }, {
            'count': 222,
            'amount': '6670.00'
          }, {
            'count': 92,
            'amount': '8560.00'
          }, {
            'count': 203,
            'amount': '8560.00'
          }, {
            'count': 22,
            'amount': '7230.00'
          }, {
            'count': 282,
            'amount': '6340.00'
          }, {
            'count': 163,
            'amount': '5670.00'
          }, {
            'count': 79,
            'amount': '7560.00'
          }, {
            'count': 52,
            'amount': '6850.00'
          }, {
            'count': 200,
            'amount': '8640.00'
          }, {
            'count': 334,
            'amount': '6780.00'
          }, {
            'count': 390,
            'amount': '9640.00'
          }, {
            'count': 330,
            'amount': '5460.00'
          }, {
            'count': 79,
            'amount': '5460.00'
          }, {
            'count': 52,
            'amount': '8340.00'
          }, {
            'count': 66,
            'amount': '7340.00'
          }, {
            'count': 180,
            'amount': '8680.00'
          }, {
            'count': 1001,
            'amount': '9990.00'
          }],
          'loanDatas': [{
            'count': 53,
            'amount': '8440.00'
          }, {
            'count': 34,
            'amount': '6450.00'
          }, {
            'count': 56,
            'amount': '8450.00'
          }, {
            'count': 10,
            'amount': '8350.00'
          }, {
            'count': 40,
            'amount': '5520.00'
          }, {
            'count': 100,
            'amount': '3480.00'
          }, {
            'count': 130,
            'amount': '7850.00'
          }, {
            'count': 340,
            'amount': '9990.00'
          }, {
            'count': 67,
            'amount': '6840.00'
          }, {
            'count': 45,
            'amount': '4360.00'
          }, {
            'count': 45,
            'amount': '4660.00'
          }, {
            'count': 40,
            'amount': '3570.00'
          }, {
            'count': 54,
            'amount': '7850.00'
          }, {
            'count': 78,
            'amount': '8750.00'
          }, {
            'count': 95,
            'amount': '9357.00'
          }, {
            'count': 60,
            'amount': '5660.00'
          }, {
            'count': 167,
            'amount': '6860.00'
          }, {
            'count': 50,
            'amount': '5049.00'
          }, {
            'count': 30,
            'amount': '3450.00'
          }, {
            'count': 56,
            'amount': '3960.00'
          }, {
            'count': 34,
            'amount': '3960.00'
          }, {
            'count': 95,
            'amount': '5654.00'
          }, {
            'count': 78,
            'amount': '3450.00'
          }, {
            'count': 140,
            'amount': '7459.00'
          }, {
            'count': 34,
            'amount': '7459.00'
          }, {
            'count': 56,
            'amount': '3649.00'
          }, {
            'count': 65,
            'amount': '3460.00'
          }, {
            'count': 49,
            'amount': '4532.00'
          }, {
            'count': 36,
            'amount': '8470.00'
          }, {
            'count': 78,
            'amount': '6560.00'
          }, {
            'count': 88,
            'amount': '4634.00'
          }]
        }
      }
      // const arr1 = []
      // const arr2 = []
      // for (let i = 0; i < 31; i++) {
      //   const count1 = Math.floor(Math.random() * 10 + 50)
      //   arr1.push({
      //     count: count1,
      //     amount: count1 * Math.floor((Math.random() * 10 + 100))
      //   })
      //   const count2 = Math.floor(Math.random() * 10 + 50)
      //   arr2.push({
      //     count: count2,
      //     amount: count2 * Math.floor((Math.random() * 10 + 100))
      //   })
      // }
      // res.data.applyFinanceDatas = arr1
      // res.data.loanDatas = arr2
      return res
    }
  },
  // 获取消息列表：通知、待办
  {
    url: '/clientplatform/backlog/backList',
    type: 'post',
    response: _config => {
      return {
        isOk: true,
        status: 200,
        message: '成功',
        data: {
          'total': 12,
          'rows': [{
            'messageId': 'a419cb29-1891-4cb8-abea-5a3ac9e869f7',
            'messageContent': '用户权限待配置',
            'linkUrl': '/user-manage/role',
            'lastUpdTime': '2020-04-23 10:25:12',
            'businessNo': 'BLPJ000343',
            'messageStatus': '0'
          }, {
            'messageId': '0f08b8fc-932f-4bba-9f21-ff184c75b743',
            'messageContent': '业务编号BLPJ000313，待保理合同签署',
            'linkUrl': '/factoring-contract-sign/detail?id=279',
            'lastUpdTime': '2020-03-31 18:17:00',
            'businessNo': 'BLPJ000313',
            'messageStatus': '0'
          }, {
            'messageId': 'e03272cb-3f7d-4453-af65-716de274137a',
            'messageContent': '业务编号BLPJ000309，待保理合同签署',
            'linkUrl': '/factoring-contract-sign/detail?id=276',
            'lastUpdTime': '2020-03-31 18:15:51',
            'businessNo': 'BLPJ000309',
            'messageStatus': '0'
          }, {
            'messageId': 'a00a0022-3621-42cd-a00c-1bc68d708c03',
            'messageContent': '业务编号BLPJ000304，待合同维护上传',
            'linkUrl': '/factoring-business-receivable/contract-upload-detail?id=272',
            'lastUpdTime': '2020-03-31 17:56:23',
            'businessNo': 'BLPJ000304',
            'messageStatus': '0'
          }, {
            'messageId': '2d97429e-e512-46b9-8242-f1d5b426aef8',
            'messageContent': '业务编号BLPJ000295，待保理合同签署',
            'linkUrl': '/factoring-contract-sign/detail?id=264',
            'lastUpdTime': '2020-03-31 16:44:25',
            'businessNo': 'BLPJ000295',
            'messageStatus': '0'
          }]
        },
        'total': 12
      }
    }
  }
]
