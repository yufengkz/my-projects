export const routeInfo = [
  {
    name: 'Approval',
    path: '/approval',
    hidden: false,
    meta: {
      icon: 'sidebar-approval',
      title: '我的审批'
    },
    children: [
      {
        name: 'ApprovalCredit',
        path: '/approval/credit',
        hidden: false,
        meta: {
          title: '授信审批'
        },
        children: [
          {
            name: 'ApprovalCreditDetail',
            path: '/approval/credit/detail',
            hidden: true,
            meta: {
              title: '授信审批详情'
            }
          },
          {
            name: 'ApprovalCreditPerson',
            path: '/approval/credit/person',
            hidden: true,
            meta: {
              title: '法人担保详情'
            }
          }
        ]
      },
      {
        name: 'ApprovalNatural',
        path: '/approval/natural',
        hidden: false,
        meta: {
          title: '自然人担保审批'
        },
        children: [
          {
            name: 'ApprovalNaturalDetail',
            path: '/approval/natural/detail',
            hidden: true,
            meta: {
              title: '自然人担保审批详情'
            }
          }
        ]
      },
      {
        name: 'ApprovalLegal',
        path: '/approval/legal',
        hidden: false,
        meta: {
          title: '法人担保审批'
        },
        children: [
          {
            name: 'ApprovalLegalDetail',
            path: '/approval/legal/detail',
            hidden: true,
            meta: {
              title: '法人担保审批详情'
            }
          }
        ]
      },
      {
        name: 'ApprovalInquiry',
        path: '/approval/inquiry',
        hidden: false,
        meta: {
          title: '查证审批'
        },
        children: [
          {
            name: 'ApprovalInquiryDetail',
            path: '/approval/inquiry/detail',
            hidden: true,
            meta: {
              title: '查证审批详情'
            }
          }
        ]
      }
    ]
  },
  {
    name: 'CaseCtrl',
    path: '/case-ctrl',
    hidden: false,
    meta: {
      icon: 'sidebar-case-ctrl',
      title: '审批案件管理'
    },
    children: [
      {
        name: 'CaseCtrlCredit',
        path: '/case-ctrl/credit',
        hidden: false,
        meta: {
          title: '授信审批案件'
        },
        children: [
          {
            name: 'CaseCtrlCreditDetail',
            path: '/case-ctrl/credit/detail',
            hidden: true,
            meta: {
              title: '授信审批案件详情'
            }
          }
        ]
      },
      {
        name: 'CaseCtrlNatural',
        path: '/case-ctrl/natural',
        meta: {
          title: '自然人担保审批案件'
        },
        children: [
          {
            name: 'CaseCtrlNaturalDetail',
            path: '/case-ctrl/natural/detail',
            hidden: true,
            meta: {
              title: '自然人担保审批案件详情'
            }
          }
        ]
      },
      {
        name: 'CaseCtrlLegal',
        path: '/case-ctrl/legal',
        meta: {
          title: '法人担保审批案件'
        },
        children: [
          {
            name: 'CaseCtrlLegalDetail',
            path: '/case-ctrl/legal/detail',
            hidden: true,
            meta: {
              title: '法人担保审批案件详情'
            }
          }
        ]
      },
      {
        name: 'CaseCtrlInquiry',
        path: '/case-ctrl/inquiry',
        meta: {
          title: '查证审批案件'
        },
        children: [
          {
            name: 'CaseCtrlInquiryDetail',
            path: '/case-ctrl/inquiry/detail',
            hidden: true,
            meta: {
              title: '查证审批案件详情'
            }
          }
        ]
      }
    ]
  },
  {
    name: 'BusinessSetting',
    path: '/business-setting',
    hidden: false,
    meta: {
      icon: 'sidebar-business-setting',
      title: '审批业务设置'
    }
  },
  {
    name: 'RoleSetting',
    path: '/role-setting',
    hidden: false,
    meta: {
      icon: 'sidebar-role-setting',
      title: '审批角色设置'
    }
  },
  {
    name: 'UserSetting',
    path: '/user-setting',
    hidden: false,
    meta: {
      icon: 'sidebar-user-setting',
      title: '审批人员设置'
    }
  }
]
