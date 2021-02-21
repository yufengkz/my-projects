import Layout from '@/components/Layout'

const approvalRoutes = [
  // 我的审批
  {
    path: '/approval',
    name: 'approval',
    redirect: '/approval/credit',
    component: Layout,
    meta: {
      title: ''
    },
    children: [
      {
        path: '/approval/credit',
        component: () => import('@/components/EmptyTemplate'),
        meta: {
          title: '授信审批'
        },
        children: [
          {
            path: '',
            name: 'approvalCredit',
            component: () => import('@/views/approval/credit')
          },
          {
            path: '/approval/credit/detail',
            name: 'approvalCreditDetail',
            component: () => import('@/views/approval/credit/Detail'),
            meta: {
              title: '详情'
            }
          },
          // 我的审批 - 授信审批 - 法人担保详情
          {
            path: '/approval/credit/person',
            name: 'PersonEnsureDetail',
            component: () => import('@/views/approval/credit/PersonEnsureDetail'),
            meta: {
              title: '法人担保详情'
            }
          }
        ]
      },
      {
        path: '/approval/natural',
        component: () => import('@/components/EmptyTemplate'),
        meta: {
          title: '自然人担保审批'
        },
        children: [
          {
            path: '',
            name: 'approvalNatural',
            component: () => import('@/views/approval/natural')
          },
          {
            path: '/approval/natural/detail',
            name: 'approvalNaturalDetail',
            component: () => import('@/views/approval/natural/Detail'),
            meta: {
              title: '详情'
            }
          }
        ]
      },
      {
        path: '/approval/legal',
        component: () => import('@/components/EmptyTemplate'),
        meta: {
          title: '法人担保审批'
        },
        children: [
          {
            path: '',
            name: 'approvalLegal',
            component: () => import('@/views/approval/legal')
          },
          {
            path: '/approval/legal/detail',
            name: 'approvalLegalDetail',
            component: () => import('@/views/approval/legal/Detail'),
            meta: {
              title: '详情'
            }
          }
        ]
      }
    ]
  },
  // 审批案件管理
  {
    path: '/case-ctrl',
    name: 'caseCtrl',
    redirect: '/case-ctrl/credit',
    component: Layout,
    meta: {
      title: '审批案件管理'
    },
    children: [
      {
        path: '/case-ctrl/credit',
        component: () => import('@/components/EmptyTemplate'),
        children: [
          {
            path: '/case-ctrl/credit',
            name: 'caseCtrlCredit',
            component: () => import('@/views/case-ctrl/credit'),
            meta: {
              title: '授信审批案件'
            }
          },
          {
            path: '/case-ctrl/credit/detail',
            name: 'caseCtrlCreditDetail',
            component: () => import('@/views/case-ctrl/credit/Detail'),
            meta: {
              title: '管理详情'
            }
          }
        ]
      },
      {
        path: '/case-ctrl/natural',
        component: () => import('@/components/EmptyTemplate'),
        meta: {
          title: '自然人担保审批案件'
        },
        children: [
          {
            path: '',
            name: 'caseCtrlNatural',
            component: () => import('@/views/case-ctrl/natural')
          },
          {
            path: '/case-ctrl/natural/detail',
            name: 'caseCtrlNaturalDetail',
            component: () => import('@/views/case-ctrl/natural/Detail'),
            meta: {
              title: '管理详情'
            }
          }
        ]
      },
      {
        path: '/case-ctrl/legal',
        component: () => import('@/components/EmptyTemplate'),
        meta: {
          title: '法人担保审批案件'
        },
        children: [
          {
            path: '',
            name: 'caseCtrlLegal',
            component: () => import('@/views/case-ctrl/legal')
          },
          {
            path: '/case-ctrl/legal/detail',
            name: 'caseCtrlLegalDetail',
            component: () => import('@/views/case-ctrl/legal/Detail'),
            meta: {
              title: '管理详情'
            }
          }
        ]
      }
    ]
  },
  // 审批业务设置
  {
    path: '/business-setting',
    name: 'businessSetting',
    // redirect: '/service-fee/search',
    component: Layout,
    meta: {
      title: '审批业务设置'
    },
    children: [
      {
        path: '',
        name: 'businessSettingMain',
        component: () => import('@/views/business-setting')
      }
    ]
  },
  // 审批角色设置
  {
    path: '/role-setting',
    name: 'roleSetting',
    // redirect: '/service-fee/search',
    component: Layout,
    meta: {
      title: '审批角色设置'
    },
    children: [
      {
        path: '',
        name: 'roleSettingMain',
        component: () => import('@/views/role-setting')
      }
    ]
  },
  // 审批人员设置
  {
    path: '/user-setting',
    name: 'userSetting',
    // redirect: '/service-fee/search',
    component: Layout,
    meta: {
      title: '审批人员设置'
    },
    children: [
      {
        path: '',
        name: 'userSettingMain',
        component: () => import('@/views/user-setting')
      }
    ]
  }
]
export default approvalRoutes
