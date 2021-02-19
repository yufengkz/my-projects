export const routeInfo = [
  // 白名单管理
  {
    path: '/white-list',
    meta: {
      icon: 'sidebar-white-list',
      title: '白名单管理'
    },
    children: [
      {
        path: '/white-list/enterprise',
        meta: {
          title: '白名单企业查询'
        },
        children: [
          {
            path: '/white-list/enterprise/record',
            meta: {
              title: '白名单联系人导入记录'
            },
            hidden: true
          }
        ]
      },
      {
        path: '/white-list/push-log',
        meta: {
          title: '白名单推送记录'
        },
        children: [
          {
            path: '/white-list/push-log/record',
            meta: {
              title: '白名单企业导入记录'
            },
            hidden: true
          }
        ]
      }
    ]
  },
  // 节点处理
  {
    path: '/node-processing',
    meta: {
      icon: 'sidebar-bill',
      title: '节点处理'
    },
    children: [
      {
        path: '/node-processing/credit-application',
        meta: {
          title: '授信申请材料'
        },
        children: [
          {
            path: '/node-processing/credit-application/detail',
            meta: {
              title: '授信申请材料详情'
            },
            hidden: true
          }
        ]
      },
      {
        path: '/node-processing/credit-rating',
        meta: {
          title: '授信评级录入'
        },
        children: [
          {
            path: '/node-processing/credit-rating/detail',
            meta: {
              title: '授信评级录入详情'
            },
            hidden: true
          }
        ]
      },
      {
        path: '/node-processing/guarantee-contract',
        meta: {
          title: '额度及保证合同'
        },
        children: [
          {
            path: '/node-processing/guarantee-contract/detail',
            meta: {
              title: '额度及保证合同详情'
            },
            hidden: true
          },
          {
            path: '/node-processing/guarantee-contract/editor',
            meta: {
              title: '额度及保证合同录入'
            },
            hidden: true
          }
        ]
      },
      {
        path: '/node-processing/disburse-application',
        meta: {
          title: '支用申请材料'
        },
        children: [
          {
            path: '/node-processing/disburse-application/detail',
            meta: {
              title: '支用申请材料详情'
            },
            hidden: true
          }
        ]
      },
      {
        path: '/node-processing/disburse-reply',
        meta: {
          title: '支用批复录入'
        },
        children: [
          {
            path: '/node-processing/disburse-reply/detail',
            meta: {
              title: '支用批复录入详情'
            },
            hidden: true
          }
        ]
      },
      {
        path: '/node-processing/iou-contract',
        meta: {
          title: '借款借据录入'
        },
        children: [
          {
            path: '/node-processing/iou-contract/detail',
            meta: {
              title: '借款借据录入详情'
            },
            hidden: true
          }
        ]
      },
      {
        path: '/node-processing/loan-repayment',
        meta: {
          title: '放款信息录入'
        },
        children: [
          {
            path: '/node-processing/loan-repayment/loanDetail',
            meta: {
              title: '放款录入详情'
            },
            hidden: true
          },
          {
            path: '/node-processing/loan-repayment/repayDetail',
            meta: {
              title: '还款计划录入详情'
            },
            hidden: true
          }
        ]
      }
    ]
  },
  // 注册用户
  {
    path: '/registered',
    meta: {
      icon: 'sidebar-registered',
      title: '注册用户'
    },
    children: [
      {
        path: '/registered/enterprise-user',
        meta: {
          title: '融资企业注册用户'
        },
        children: [
          {
            path: '/registered/enterprise-user/detail',
            meta: {
              title: '融资企业注册用户详情'
            },
            hidden: true
          }
        ]
      },
      {
        path: '/registered/certification-result',
        meta: {
          title: '认证结果查询'
        }
      }
    ]
  },
  // 服务费
  {
    path: '/service-fee',
    meta: {
      icon: 'sidebar-money',
      title: '服务费'
    },
    children: [
      {
        path: '/service-fee/search',
        meta: {
          title: '服务费查询'
        },
        children: [
          {
            path: '/service-fee/detail',
            meta: {
              title: '缴纳详情'
            },
            hidden: true
          }
        ]
      },
      {
        path: '/service-fee/manage',
        meta: {
          title: '服务费率管理'
        }
      }
    ]
  },

  // 业务查询
  {
    path: '/business',
    meta: {
      icon: 'sidebar-business',
      title: '业务查询'
    },
    children: [
      {
        path: '/business/enterprise',
        meta: {
          title: '融资企业查询'
        },
        children: [
          {
            path: '/business/enterprise/detail',
            meta: {
              title: '融资企业详情'
            },
            hidden: true
          }
        ]
      },
      {
        path: '/business/desire',
        meta: {
          title: '融资意愿查询'
        },
        children: [
          {
            path: '/business/desire/detail',
            meta: {
              title: '融资意愿详情'
            },
            hidden: true
          }
        ]
      },
      {
        path: '/business/credit',
        meta: {
          title: '授信查询'
        },
        children: [
          {
            path: '/business/credit/detail',
            meta: {
              title: '授信详情'
            },
            hidden: true
          }
        ]
      },
      {
        path: '/business/contract',
        meta: {
          title: '合同查询'
        }
      },
      {
        path: '/business/order',
        meta: {
          title: '订单管理'
        },
        children: [
          {
            path: '/business/order/detail',
            meta: {
              title: '订单详情'
            },
            hidden: true
          },
          {
            path: '/business/order/record',
            meta: {
              title: '订单导入记录'
            },
            hidden: true
          }
        ]
      },
      {
        path: '/business/disburse',
        meta: {
          title: '支用查询'
        },
        children: [
          {
            path: '/business/disburse/detail',
            meta: {
              title: '详情'
            },
            hidden: true
          }
        ]
      },
      {
        path: '/business/loan-receipt',
        meta: {
          title: '借据查询'
        },
        children: [
          {
            path: '/business/loan-receipt/detail',
            meta: {
              title: '借据详情'
            },
            hidden: true
          },
          {
            path: '/business/loan-receipt/repay-detail',
            meta: {
              title: '还款计划详情'
            },
            hidden: true
          }
        ]
      },
      {
        path: '/business/invite-code',
        meta: {
          title: '邀请码查询'
        }
      }
    ]
  },
  // 风险预警信息
  {
    path: '/risk-warn',
    meta: {
      icon: 'sidebar-warning',
      title: '风险预警信息'
    },
    children: [
      {
        path: '/risk-warn/warning/handle',
        meta: {
          title: '贷后预警处理'
        },
        children: [
          {
            path: '/risk-warn/warning/handle/detail',
            meta: {
              title: '贷后预警处理详情'
            },
            hidden: true
          },
          {
            path: '/risk-warn/warning/handle/view',
            meta: {
              title: '贷后预警查看详情'
            },
            hidden: true
          }
        ]
      },
      {
        path: '/risk-warn/warning/approval',
        meta: {
          title: '贷后预警审批'
        },
        children: [
          {
            path: '/risk-warn/warning/approval/detail',
            meta: {
              title: '贷后预警审批详情'
            },
            hidden: true
          },
          {
            path: '/risk-warn/warning/approval/view',
            meta: {
              title: '贷后预警查看详情'
            },
            hidden: true
          }
        ]
      },
      {
        path: '/risk-warn/warning/search',
        meta: {
          title: '贷后预警查看'
        },
        children: [
          {
            path: '/risk-warn/warning/detail',
            meta: {
              title: '贷后预警查看详情'
            },
            hidden: true
          }
        ]
      },
      {
        path: '/risk-warn/risk/handle',
        meta: {
          title: '融资权限处理'
        },
        children: [
          {
            path: '/risk-warn/risk/handle/detail',
            meta: {
              title: '融资权限处理详情'
            },
            hidden: true
          },
          {
            path: '/risk-warn/risk/handle/view',
            meta: {
              title: '融资权限查看详情'
            },
            hidden: true
          }
        ]
      },
      {
        path: '/risk-warn/risk/approval',
        meta: {
          title: '融资权限审批'
        },
        children: [
          {
            path: '/risk-warn/risk/approval/detail',
            meta: {
              title: '融资权限审批详情'
            },
            hidden: true
          },
          {
            path: '/risk-warn/risk/approval/view',
            meta: {
              title: '融资权限查看详情'
            },
            hidden: true
          }
        ]
      },
      {
        path: '/risk-warn/risk/search',
        meta: {
          title: '融资权限查看'
        },
        children: [
          {
            path: '/risk-warn/risk/detail',
            meta: {
              title: '融资权限查看详情'
            },
            hidden: true
          }
        ]
      }
    ]
  },

  // 核心企业管理
  {
    path: '/core-enterprise',
    meta: {
      icon: 'sidebar-check',
      title: '核心企业管理'
    },
    children: [
      {
        path: '/core-enterprise/structure',
        meta: {
          title: '组织架构管理'
        },
        children: [
          {
            path: '/core-enterprise/structure/detail',
            meta: {
              title: '组织架构详情'
            },
            hidden: true
          },
          {
            path: '/core-enterprise/structure/record',
            meta: {
              title: '导入记录查询'
            },
            hidden: true
          }
        ]
      },
      {
        path: '/core-enterprise/salesman',
        meta: {
          title: '业务员管理'
        },
        children: [
          {
            path: '/core-enterprise/salesman/detail',
            meta: {
              title: '业务员详情'
            },
            hidden: true
          },
          {
            path: '/core-enterprise/salesman/record',
            meta: {
              title: '导入记录查询'
            },
            hidden: true
          }
        ]
      },
      {
        path: '/core-enterprise/customer',
        meta: {
          title: '融资客户管理'
        },
        children: [
          {
            path: '/core-enterprise/customer/detail',
            meta: {
              title: '融资客户详情'
            },
            hidden: true
          },
          {
            path: '/core-enterprise/customer/record',
            meta: {
              title: '导入记录查询'
            },
            hidden: true
          }
        ]
      }
    ]
  },

  // 用户权限配置
  {
    path: '/user-manage',
    meta: {
      icon: 'sidebar-customer',
      title: '用户权限配置'
    },
    children: [
      {
        path: '/user-manage/user',
        meta: {
          title: '用户配置'
        }
      },
      {
        path: '/user-manage/role',
        meta: {
          title: '权限配置'
        }
      }
    ]
  }]
