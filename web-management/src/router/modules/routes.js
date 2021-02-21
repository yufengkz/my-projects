import Layout from '@/components/Layout'

// json示例在下方 👇👇
const routes = [
  // MAP中心管理
  {
    path: '/map',
    name: 'MapCenter',
    redirect: '/map',
    component: Layout,
    meta: {
      title: 'MAP中心管理'
    },
    children: [
      {
        path: '',
        name: 'MAPList',
        component: () => import('@/views/map'),
        meta: {
          title: ''
        }
      },
      {
        path: '/map/edit',
        name: 'MAPAdd',
        component: () => import('@/views/map/Edit'),
        meta: {
          title: ''
        }
      }
    ]
  },
  // 担保管理
  {
    path: '/cosigner-manage',
    name: 'cosignerManage',
    redirect: '/cosigner-manage/natural',
    component: Layout,
    meta: {
      title: '担保管理'
    },
    children: [
      {
        path: '/cosigner-manage/natural',
        component: () => import('@/components/EmptyTemplate'),
        children: [
          {
            path: '/cosigner-manage/natural',
            name: 'cosignerManageNatural',
            component: () => import('@/views/cosigner-manage/natural'),
            meta: {
              title: '自然人担保管理'
            }
          },
          {
            path: '/cosigner-manage/natural/add',
            name: 'cosignerManageNaturalAdd',
            component: () => import('@/views/cosigner-manage/natural/Add'),
            meta: {
              title: '新增'
            }
          },
          {
            path: '/cosigner-manage/natural/detail',
            component: () => import('@/views/cosigner-manage/natural/Detail'),
            meta: {
              title: '详情'
            }
          }
        ]
      },
      {
        path: '/cosigner-manage/legal',
        component: () => import('@/components/EmptyTemplate'),
        children: [
          {
            path: '/cosigner-manage/legal',
            name: 'cosignerManageLegal',
            component: () => import('@/views/cosigner-manage/legal'),
            meta: {
              title: '法人担保管理'
            }
          },
          {
            path: '/cosigner-manage/legal/add',
            name: 'cosignerManageLegalAdd',
            component: () => import('@/views/cosigner-manage/legal/Add'),
            meta: {
              title: '新增'
            }
          },
          {
            path: '/cosigner-manage/legal/detail',
            name: 'cosignerManageLegalDetail',
            component: () => import('@/views/cosigner-manage/legal/Detail'),
            meta: {
              title: '详情'
            }
          }
        ]
      },
      {
        path: '/cosigner-manage/institution',
        component: () => import('@/components/EmptyTemplate'),
        children: [
          {
            path: '/cosigner-manage/institution',
            name: 'cosignerManageInstitution',
            component: () => import('@/views/cosigner-manage/institution'),
            meta: {
              title: '合作机构担保'
            }
          },
          {
            path: '/cosigner-manage/institution/add',
            name: 'cosignerManageInstitutionAdd',
            component: () => import('@/views/cosigner-manage/institution/Add'),
            meta: {
              title: '新增'
            }
          },
          {
            path: '/cosigner-manage/institution/detail',
            name: 'cosignerManageInstitutionDetail',
            component: () => import('@/views/cosigner-manage/institution/Detail'),
            meta: {
              title: '详情'
            }
          }
        ]
      }
    ]
  },
  // 名单管理
  {
    path: '/roster',
    name: 'roster',
    redirect: '/roster',
    component: Layout,
    meta: {
      title: '名单管理'
    },
    children: [
      // 融资企业查询
      {
        path: '',
        component: () => import('@/views/roster')
      }
    ]
  },
  // 借款产品管理
  {
    path: '/loan-apply',
    // redirect: '/loan-apply',
    component: Layout,
    meta: {
      title: '借款产品管理'
    },
    children: [
      {
        path: '',
        name: 'loanApply',
        component: () => import('@/views/loan-apply'),
        meta: {
          title: ''
        }
      },
      {
        path: '/loan-apply/edit',
        name: 'loanApplyEdit',
        component: () => import('@/views/loan-apply/Edit'),
        meta: {
          title: ''
        }
      },
      {
        path: '/loan-apply/detail',
        name: 'loanApplyDetail',
        component: () => import('@/views/loan-apply/Detail'),
        meta: {
          title: ''
        }
      }
    ]
  },
  // 订单流转审批
  {
    path: '/orders',
    name: 'orders',
    redirect: '/orders',
    component: Layout,
    meta: {
      title: '订单流转审批'
    },
    children: [
      {
        path: '',
        component: () => import('@/views/orders')
      },
      {
        path: '/orders/edit',
        name: 'ordersEdit',
        meta: {
          title: '审批详情'
        },
        component: () => import('@/views/orders/Edit')
      }
    ]
  },
  // 业务中心
  {
    path: '/business',
    name: 'business',
    redirect: '/business',
    component: Layout,
    meta: {
      title: '业务中心'
    },
    children: [
      {
        path: '',
        component: () => import('@/views/business'),
        meta: {
          title: ''
        }
      },
      {
        path: '/business/detail',
        name: 'BusinessDetail',
        component: () => import('@/views/business/Detail'),
        meta: {
          title: '业务详情'
        }
      }
    ]
  },
  // 客户管理
  {
    path: '/customer',
    name: 'customer',
    redirect: '/customer',
    component: Layout,
    meta: {
      title: '客户管理'
    },
    children: [
      {
        path: '',
        component: () => import('@/views/customer')
      }
    ]
  },
  // 运营人员设置
  {
    path: '/user-manage/user',
    name: 'UserManageUser',
    redirect: '/user-manage/user',
    component: Layout,
    meta: {
      title: '运营人员设置'
    },
    children: [
      {
        path: '',
        component: () => import('@/views/user-manage/User')
      }
    ]
  },
  // 运营角色设置
  {
    path: '/user-manage/role',
    name: 'UserManageRole',
    redirect: '/user-manage/user',
    component: Layout,
    meta: {
      title: '运营角色设置'
    },
    children: [
      {
        path: '',
        component: () => import('@/views/user-manage/Role')
      }
    ]
  }
  // {
  //   path: '/user-manage',
  //   name: 'userManage',
  //   redirect: '/user-manage/user',
  //   component: Layout,
  //   meta: {
  //     title: '用户权限配置'
  //   },
  //   children: [
  //     {
  //       path: '/user-manage/user',
  //       component: () => import('@/views/user-manage/User'),
  //       meta: {
  //         title: '运营人员设置'
  //       }
  //     },
  //     {
  //       path: '/user-manage/role',
  //       name: 'userManageRole',
  //       component: () => import('@/views/user-manage/Role'),
  //       meta: {
  //         title: '运营角色设置'
  //       }
  //     }
  //   ]
  // }
]
export default routes

// 业务查询  demo
// {
//   path: '/business',
//   name: 'business',
//   redirect: '/business/enterprise',
//   component: Layout,
//   meta: {
//     title: '业务查询'
//   },
//   children: [
//     // 融资企业查询
//     {
//       path: '/business/enterprise',
//       component: () => import('@/components/EmptyTemplate'),
//       meta: {
//         title: '融资企业查询'
//       },
//       children: [
//         {
//           path: '/business/enterprise',
//           name: 'businessEnterprise',
//           component: () => import('@/views/business/enterprise')
//         },
//         {
//           path: '/business/enterprise/detail', // 融资企业详情
//           name: 'businessEnterpriseDetail',
//           component: () => import('@/views/business/enterprise/Detail'),
//           meta: {
//             title: '融资企业详情'
//           }
//         }
//       ]
//     },
//     // 融资意愿查询
//     {
//       path: '/business/desire',
//       component: () => import('@/components/EmptyTemplate'),
//       meta: {
//         title: '融资意愿查询'
//       },
//       children: [
//         {
//           path: '/business/desire',
//           name: 'businessDesire',
//           component: () => import('@/views/business/desire')
//         },
//         {
//           path: '/business/desire/detail', // 融资意愿详情
//           name: 'businessDesireDetail',
//           component: () => import('@/views/business/desire/Detail'),
//           meta: {
//             title: '融资意愿详情'
//           }
//         }
//       ]
//     },
//     // 授信查询
//     {
//       path: '/business/credit',
//       component: () => import('@/components/EmptyTemplate'),
//       meta: {
//         title: '授信查询'
//       },
//       children: [
//         {
//           path: '/business/credit',
//           name: 'businessCredit',
//           component: () => import('@/views/business/credit')
//         },
//         {
//           path: '/business/credit/detail', // 授信详情
//           name: 'businessCreditDetail',
//           component: () => import('@/views/business/credit/Detail'),
//           meta: {
//             title: '授信详情'
//           }
//         }
//       ]
//     },
//     // 合同查询
//     {
//       path: '/business/contract',
//       component: () => import('@/components/EmptyTemplate'),
//       meta: {
//         title: '合同查询'
//       },
//       children: [
//         {
//           path: '/business/contract',
//           name: 'businessContract',
//           component: () => import('@/views/business/contract')
//         }
//       ]
//     },
//     // 订单查询
//     {
//       path: '/business/order',
//       component: () => import('@/components/EmptyTemplate'),
//       meta: {
//         title: '订单查询'
//       },
//       children: [
//         {
//           path: '/business/order',
//           name: 'businessOrder',
//           component: () => import('@/views/business/order')
//         },
//         {
//           path: '/business/order/detail', // 订单详情
//           name: 'businessOrderDetail',
//           component: () => import('@/views/business/order/Detail'),
//           meta: {
//             title: '订单详情'
//           }
//         }
//       ]
//     },
//     // 支用查询
//     {
//       path: '/business/disburse',
//       component: () => import('@/components/EmptyTemplate'),
//       meta: {
//         title: '支用查询'
//       },
//       children: [
//         {
//           path: '/business/disburse',
//           name: 'businessDisburse',
//           component: () => import('@/views/business/disburse')
//         },
//         {
//           path: '/business/disburse/detail', // 支用详情
//           name: 'businessDisburseDetail',
//           component: () => import('@/views/business/disburse/Detail'),
//           meta: {
//             title: '支用详情'
//           }
//         }
//       ]
//     },
//     // 借据查询
//     {
//       path: '/business/loan-receipt',
//       component: () => import('@/components/EmptyTemplate'),
//       meta: {
//         title: '借据查询'
//       },
//       children: [
//         {
//           path: '/business/loan-receipt',
//           name: 'businessLoanReceipt',
//           component: () => import('@/views/business/loan-receipt')
//         }
//       ]
//     },
//     // 邀请码查询
//     {
//       path: '/business/invite-code',
//       component: () => import('@/components/EmptyTemplate'),
//       meta: {
//         title: '邀请码查询'
//       },
//       children: [
//         {
//           path: '/business/invite-code',
//           name: 'businessInviteCode',
//           component: () => import('@/views/business/invite-code')
//         }
//       ]
//     }
//   ]
// },
