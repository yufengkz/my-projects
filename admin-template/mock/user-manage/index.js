// const { menu } = require('./menu.js')

// POST入参：const { xxx } = config.body
// GET入参：const { xxx } = config.querys
module.exports = [
  // tree 菜单
  {
    url: '/ifpc/v1/api/operate-resources/list',
    type: 'get',
    response: _config => {
      return { "isOk": true, "code": 200, "message": "成功", "data": [{ "id": 1, "title": "白名单管理", "path": "/white-list", "icon": "sidebar-white-list", "hidden": true, "children": [{ "id": 2, "title": "白名单企业查询", "path": "/white-list/enterprise", "icon": "", "hidden": true, "children": [{ "id": 3, "title": "白名单联系人导入记录", "path": "/white-list/enterprise/record", "icon": "", "hidden": false, "children": null }] }, { "id": 4, "title": "白名单推送记录", "path": "/white-list/push-log", "icon": "", "hidden": true, "children": [{ "id": 5, "title": "白名单企业导入记录", "path": "/white-list/push-log/record", "icon": "", "hidden": false, "children": null }] }] }, { "id": 6, "title": "节点处理", "path": "/node-processing", "icon": "sidebar-bill", "hidden": true, "children": [{ "id": 7, "title": "授信申请材料", "path": "/node-processing/credit-application", "icon": null, "hidden": true, "children": [{ "id": 8, "title": "授信申请材料详情", "path": "/node-processing/credit-application/detail", "icon": null, "hidden": false, "children": null }] }, { "id": 9, "title": "授信评级录入", "path": "/node-processing/credit-rating", "icon": null, "hidden": true, "children": [{ "id": 10, "title": "授信评级录入详情", "path": "/node-processing/credit-rating/detail", "icon": null, "hidden": false, "children": null }] }, { "id": 11, "title": "额度及保证合同", "path": "/node-processing/guarantee-contract", "icon": null, "hidden": true, "children": [{ "id": 12, "title": "额度及保证合同详情", "path": "/node-processing/guarantee-contract/detail", "icon": null, "hidden": false, "children": null }, { "id": 13, "title": "额度及保证合同录入", "path": "/node-processing/guarantee-contract/editor", "icon": null, "hidden": false, "children": null }] }, { "id": 14, "title": "支用申请材料", "path": "/node-processing/disburse-application", "icon": null, "hidden": true, "children": [{ "id": 15, "title": "支用申请材料详情", "path": "/node-processing/disburse-application/detail", "icon": null, "hidden": false, "children": null }] }, { "id": 16, "title": "支用批复录入", "path": "/node-processing/disburse-reply", "icon": null, "hidden": true, "children": [{ "id": 17, "title": "支用批复录入详情", "path": "/node-processing/disburse-reply/detail", "icon": null, "hidden": false, "children": null }] }, { "id": 18, "title": "借款借据录入", "path": "/node-processing/iou-contract", "icon": null, "hidden": true, "children": [{ "id": 19, "title": "借款借据录入详情", "path": "/node-processing/iou-contract/detail", "icon": null, "hidden": false, "children": null }] }, { "id": 20, "title": "放款信息录入", "path": "/node-processing/loan-repayment", "icon": null, "hidden": true, "children": [{ "id": 21, "title": "放款录入详情", "path": "/node-processing/loan-repayment/loanDetail", "icon": null, "hidden": false, "children": null }, { "id": 22, "title": "还款计划录入详情", "path": "/node-processing/loan-repayment/repayDetail", "icon": null, "hidden": false, "children": null }] }] }, { "id": 23, "title": "注册用户", "path": "/registered", "icon": "sidebar-registered", "hidden": true, "children": [{ "id": 24, "title": "融资企业注册用户", "path": "/registered/enterprise-user", "icon": "", "hidden": true, "children": [{ "id": 25, "title": "融资企业注册用户详情", "path": "/registered/enterprise-user/detail", "icon": "", "hidden": false, "children": null }] }, { "id": 26, "title": "认证结果查询", "path": "/registered/certification-result", "icon": "", "hidden": true, "children": null }] }, { "id": 27, "title": "服务费", "path": "/service-fee", "icon": "sidebar-money", "hidden": true, "children": [{ "id": 28, "title": "服务费查询", "path": "/service-fee/search", "icon": "", "hidden": true, "children": [{ "id": 29, "title": "缴纳详情", "path": "/service-fee/detail", "icon": "", "hidden": false, "children": null }] }, { "id": 30, "title": "服务费率管理", "path": "/service-fee/manage", "icon": "", "hidden": true, "children": null }] }, { "id": 31, "title": "业务查询", "path": "/business", "icon": "sidebar-business", "hidden": true, "children": [{ "id": 32, "title": "融资企业查询", "path": "/business/enterprise", "icon": "", "hidden": true, "children": [{ "id": 33, "title": "融资企业详情", "path": "/business/enterprise/detail", "icon": "", "hidden": false, "children": null }] }, { "id": 34, "title": "融资意愿查询", "path": "/business/desire", "icon": "", "hidden": true, "children": [{ "id": 35, "title": "融资意愿详情", "path": "/business/desire/detail", "icon": "", "hidden": false, "children": null }] }, { "id": 36, "title": "授信查询", "path": "/business/credit", "icon": "", "hidden": true, "children": [{ "id": 37, "title": "授信详情", "path": "/business/credit/detail", "icon": "", "hidden": false, "children": null }, { "id": 78, "title": "额度及保证合同详情", "path": "/business/credit/guaranteeContract/detail", "icon": null, "hidden": false, "children": null }] }, { "id": 38, "title": "合同查询", "path": "/business/contract", "icon": "", "hidden": true, "children": null }, { "id": 39, "title": "订单管理", "path": "/business/order", "icon": "", "hidden": true, "children": [{ "id": 40, "title": "订单详情", "path": "/business/order/detail", "icon": "", "hidden": false, "children": null }, { "id": 41, "title": "订单导入记录", "path": "/business/order/record", "icon": "", "hidden": false, "children": null }] }, { "id": 42, "title": "支用查询", "path": "/business/disburse", "icon": "", "hidden": true, "children": [{ "id": 43, "title": "支用详情", "path": "/business/disburse/detail", "icon": "", "hidden": false, "children": null }] }, { "id": 44, "title": "借据查询", "path": "/business/loan-receipt", "icon": "", "hidden": true, "children": [{ "id": 45, "title": "借据详情", "path": "/business/loan-receipt/detail", "icon": "", "hidden": false, "children": null }, { "id": 46, "title": "还款计划详情", "path": "/business/loan-receipt/repay-detail", "icon": "", "hidden": false, "children": null }] }, { "id": 47, "title": "邀请码查询", "path": "/business/invite-code", "icon": "", "hidden": true, "children": null }] }, { "id": 48, "title": "风险预警信息", "path": "/risk-warn", "icon": "sidebar-warning", "hidden": true, "children": [{ "id": 49, "title": "贷后预警处理", "path": "/risk-warn/warning/handle", "icon": "", "hidden": true, "children": [{ "id": 50, "title": "贷后预警处理详情", "path": "/risk-warn/warning/handle/detail", "icon": "", "hidden": false, "children": null }, { "id": 51, "title": "贷后预警查看详情", "path": "/risk-warn/warning/handle/view", "icon": "", "hidden": false, "children": null }] }, { "id": 52, "title": "贷后预警审批", "path": "/risk-warn/warning/approval", "icon": "", "hidden": true, "children": [{ "id": 53, "title": "贷后预警审批详情", "path": "/risk-warn/warning/approval/detail", "icon": "", "hidden": false, "children": null }, { "id": 54, "title": "贷后预警查看详情", "path": "/risk-warn/warning/approval/view", "icon": "", "hidden": false, "children": null }] }, { "id": 55, "title": "贷后预警查看", "path": "/risk-warn/warning/search", "icon": null, "hidden": true, "children": [{ "id": 56, "title": "贷后预警查看详情", "path": "/risk-warn/warning/detail", "icon": "", "hidden": false, "children": null }] }, { "id": 57, "title": "融资权限处理", "path": "/risk-warn/risk/handle", "icon": null, "hidden": true, "children": [{ "id": 58, "title": "融资权限处理详情", "path": "/risk-warn/risk/handle/detail", "icon": "", "hidden": false, "children": null }, { "id": 59, "title": "融资权限查看详情", "path": "/risk-warn/risk/handle/view", "icon": "", "hidden": false, "children": null }] }, { "id": 60, "title": "融资权限审批", "path": "/risk-warn/risk/approval", "icon": null, "hidden": true, "children": [{ "id": 61, "title": "融资权限审批详情", "path": "/risk-warn/risk/approval/detail", "icon": "", "hidden": false, "children": null }, { "id": 62, "title": "融资权限查看详情", "path": "/risk-warn/risk/approval/view", "icon": "", "hidden": false, "children": null }] }, { "id": 63, "title": "融资权限查看", "path": "/risk-warn/risk/search", "icon": null, "hidden": true, "children": [{ "id": 64, "title": "融资权限查看详情", "path": "/risk-warn/risk/detail", "icon": "", "hidden": false, "children": null }] }] }, { "id": 65, "title": "核心企业管理", "path": "/core-enterprise", "icon": "sidebar-check", "hidden": true, "children": [{ "id": 66, "title": "组织架构管理", "path": "/core-enterprise/structure", "icon": "", "hidden": true, "children": [{ "id": 67, "title": "导入记录查询", "path": "/core-enterprise/structure/record", "icon": "", "hidden": false, "children": null }, { "id": 68, "title": "组织架构详情", "path": "/core-enterprise/structure/detail", "icon": "", "hidden": false, "children": null }] }, { "id": 69, "title": "业务员管理", "path": "/core-enterprise/salesman", "icon": "", "hidden": true, "children": [{ "id": 70, "title": "导入记录查询", "path": "/core-enterprise/salesman/record", "icon": "", "hidden": false, "children": null }, { "id": 71, "title": "业务员详情", "path": "/core-enterprise/salesman/detail", "icon": "", "hidden": false, "children": null }] }, { "id": 72, "title": "融资客户管理", "path": "/core-enterprise/customer", "icon": "", "hidden": true, "children": [{ "id": 73, "title": "导入记录查询", "path": "/core-enterprise/customer/record", "icon": "导入记录查询", "hidden": false, "children": null }, { "id": 74, "title": "融资客户详情", "path": "/core-enterprise/customer/detail", "icon": "", "hidden": false, "children": null }] }] }, { "id": 75, "title": "用户权限配置", "path": "/user-manage", "icon": "sidebar-customer", "hidden": true, "children": [{ "id": 76, "title": "用户配置", "path": "/user-manage/user", "icon": "", "hidden": true, "children": null }, { "id": 77, "title": "权限配置", "path": "/user-manage/role", "icon": "", "hidden": true, "children": null }] }] }
    }
  },
  // 编辑
  {
    url: '/ifpc/v1/api/operate-role',
    type: 'get',
    response: _config => {
      return { "isOk": true, "code": 200, "message": "成功", "data": { "status": "0", "createTime": null, "lastUpdTime": null, "loginTime": "2020-12-18T14:20:38.103+0800", "resourcesListTreeList": [{ "roleId": 23, "name": "Registered", "path": "/registered", "hidden": false, "meta": { "title": "注册用户", "icon": "sidebar-registered" }, "children": [{ "roleId": 24, "name": "RegisteredEnterpriseUser", "path": "/registered/enterprise-user", "hidden": false, "meta": { "title": "融资企业注册用户", "icon": "" }, "children": [{ "roleId": 25, "name": "RegisteredEnterpriseUserDetail", "path": "/registered/enterprise-user/detail", "hidden": true, "meta": { "title": "融资企业注册用户详情", "icon": "" }, "children": null }] }, { "roleId": 26, "name": "RegisteredCertificationResult", "path": "/registered/certification-result", "hidden": false, "meta": { "title": "认证结果查询", "icon": "" }, "children": null }] }], "currentUserDTO": null, "roleId": 14 } }
    }
  },
  // 用户列表里的角色
  {
    url: '/ifpc/v1/api/mock/roleList',
    type: 'get',
    response: _config => {
      return { "isOk": true, "code": 200, "message": "成功", "data": [{ "id": 1, "roleName": "角色配置", "status": "0", "createTime": "2020-07-03 19:00:44", "lastUpdTime": "2020-07-03 19:00:44" }, { "id": 8, "roleName": "所有权限", "status": "0", "createTime": "2020-09-02 09:35:32", "lastUpdTime": "2020-09-02 09:35:32" }, { "id": 9, "roleName": "风控", "status": "0", "createTime": "2020-09-18 10:22:03", "lastUpdTime": "2020-09-18 10:22:03" }, { "id": 10, "roleName": "审核", "status": "0", "createTime": "2020-09-18 10:22:24", "lastUpdTime": "2020-09-18 10:22:24" }, { "id": 12, "roleName": "查看-", "status": "0", "createTime": "2020-09-18 10:23:46", "lastUpdTime": "2020-09-18 10:23:46" }, { "id": 13, "roleName": "白名单管理权限", "status": "0", "createTime": "2020-11-27 14:33:01", "lastUpdTime": "2020-11-27 14:33:01" }, { "id": 14, "roleName": "1", "status": "0", "createTime": "2020-12-18 14:04:36", "lastUpdTime": "2020-12-18 14:04:36" }] }
    }
  },
  // 权限-- 角色列表
  {
    url: '/ifpc/v1/api/operate-user/list',
    type: 'get',
    response: _config => {
      return {
        "isOk": true,
        "code": 200,
        "message": "成功",
        "data": {
          "records": [
            {
              "records": [
              ],
              "total": 0,
              "size": 10,
              "current": 1,
              "orders": [
              ],
              "hitCount": false,
              "id": 37,
              "userName": "仇白名单",
              "mobileNo": "15910536516",
              "status": "0",
              "organization": null,
              "roleId": "13",
              "roleName": "白名单管理权限",
              "createTime": "2020-11-27 14:33:26",
              "lastUpdTime": null,
              "searchCount": true,
              "pages": 0
            },
            {
              "records": [
              ],
              "total": 0,
              "size": 10,
              "current": 1,
              "orders": [
              ],
              "hitCount": false,
              "id": 35,
              "userName": "test1",
              "mobileNo": "15210100002",
              "status": "0",
              "organization": null,
              "roleId": "10",
              "roleName": "审核",
              "createTime": "2020-09-25 09:28:40",
              "lastUpdTime": null,
              "searchCount": true,
              "pages": 0
            },
            {
              "records": [
              ],
              "total": 0,
              "size": 10,
              "current": 1,
              "orders": [
              ],
              "hitCount": false,
              "id": 34,
              "userName": "test",
              "mobileNo": "15210100001",
              "status": "0",
              "organization": null,
              "roleId": "9",
              "roleName": "风控",
              "createTime": "2020-09-25 09:28:23",
              "lastUpdTime": null,
              "searchCount": true,
              "pages": 0
            },
            {
              "records": [
              ],
              "total": 0,
              "size": 10,
              "current": 1,
              "orders": [
              ],
              "hitCount": false,
              "id": 33,
              "userName": "忻查看",
              "mobileNo": "15241000003",
              "status": "0",
              "organization": null,
              "roleId": "12",
              "roleName": "查看-",
              "createTime": "2020-09-18 11:25:58",
              "lastUpdTime": null,
              "searchCount": true,
              "pages": 0
            },
            {
              "records": [
              ],
              "total": 0,
              "size": 10,
              "current": 1,
              "orders": [
              ],
              "hitCount": false,
              "id": 32,
              "userName": "忻审核",
              "mobileNo": "15241000002",
              "status": "0",
              "organization": null,
              "roleId": "10",
              "roleName": "审核",
              "createTime": "2020-09-18 11:04:29",
              "lastUpdTime": null,
              "searchCount": true,
              "pages": 0
            },
            {
              "records": [
              ],
              "total": 0,
              "size": 10,
              "current": 1,
              "orders": [
              ],
              "hitCount": false,
              "id": 31,
              "userName": "忻风控",
              "mobileNo": "15241000001",
              "status": "0",
              "organization": null,
              "roleId": "9",
              "roleName": "风控",
              "createTime": "2020-09-18 11:03:57",
              "lastUpdTime": null,
              "searchCount": true,
              "pages": 0
            },
            {
              "records": [
              ],
              "total": 0,
              "size": 10,
              "current": 1,
              "orders": [
              ],
              "hitCount": false,
              "id": 30,
              "userName": "测试心一",
              "mobileNo": "13661200010",
              "status": "0",
              "organization": null,
              "roleId": "8",
              "roleName": "所有权限",
              "createTime": "2020-09-07 14:32:11",
              "lastUpdTime": null,
              "searchCount": true,
              "pages": 0
            },
            {
              "records": [
              ],
              "total": 0,
              "size": 10,
              "current": 1,
              "orders": [
              ],
              "hitCount": false,
              "id": 29,
              "userName": "新增二",
              "mobileNo": "18600793022",
              "status": "0",
              "organization": null,
              "roleId": "1",
              "roleName": "角色配置",
              "createTime": "2020-09-02 13:47:46",
              "lastUpdTime": null,
              "searchCount": true,
              "pages": 0
            },
            {
              "records": [
              ],
              "total": 0,
              "size": 10,
              "current": 1,
              "orders": [
              ],
              "hitCount": false,
              "id": 28,
              "userName": "新增用户",
              "mobileNo": "18600793023",
              "status": "0",
              "organization": null,
              "roleId": "8",
              "roleName": "所有权限",
              "createTime": "2020-09-02 13:45:22",
              "lastUpdTime": null,
              "searchCount": true,
              "pages": 0
            },
            {
              "records": [
              ],
              "total": 0,
              "size": 10,
              "current": 1,
              "orders": [
              ],
              "hitCount": false,
              "id": 27,
              "userName": "罗锁定",
              "mobileNo": "18600793024",
              "status": "0",
              "organization": null,
              "roleId": "8",
              "roleName": "所有权限",
              "createTime": "2020-09-02 13:31:35",
              "lastUpdTime": null,
              "searchCount": true,
              "pages": 0
            }
          ],
          "total": 12,
          "size": 10,
          "current": 1,
          "orders": [
          ],
          "hitCount": false,
          "userName": "",
          "mobileNo": "",
          "roleId": null,
          "searchCount": true,
          "pages": 2
        }
      }
    }
  },
]
