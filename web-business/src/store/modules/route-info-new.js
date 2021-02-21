export const routeInfo = [
  // 贷款申请
  {
    path: '/loan-apply',
    meta: {
      icon: 'sidebar-loan-apply',
      title: '借款申请'
    },
    children: [
      {
        path: '/loan-apply/add',
        hidden: true
      },
      {
        path: '/loan-apply/detail',
        hidden: true
      }
    ]
  },
  // 担保人管理
  {
    path: '/cosigner-manage',
    meta: {
      icon: 'sidebar-cosigner-manage',
      title: '担保人管理'
    },
    children: [
      {
        path: '/cosigner-manage/natural',
        meta: {
          title: '自然人担保管理'
        },
        children: [
          {
            path: '/cosigner-manage/natural/add',
            hidden: true
          },
          {
            path: '/cosigner-manage/natural/detail',
            hidden: true
          }
        ]
      },
      {
        path: '/cosigner-manage/legal',
        meta: {
          title: '法人担保管理'
        },
        children: [
          {
            path: '/cosigner-manage/legal/add',
            hidden: true
          },
          {
            path: '/cosigner-manage/legal/detail',
            hidden: true
          }
        ]
      }
    ]
  }

  // 审批系统菜单结构
  // 我的审批
  // {
  //   path: '/approval/credit',
  //   meta: {
  //     icon: 'sidebar-approval',
  //     title: '我的审批'
  //   },
  //   children: [
  //     {
  //       path: '/approval/credit',
  //       meta: {
  //         title: '授信审批'
  //       },
  //       children: [
  //         {
  //           path: '/approval/credit/detail',
  //           hidden: true
  //         },
  //         // 我的审批 - 授信审批 - 法人担保详情
  //         {
  //           path: '/approval/credit/person',
  //           hidden: true
  //         }
  //       ]
  //     },
  //     {
  //       path: '/approval/natural',
  //       meta: {
  //         title: '自然人担保审批'
  //       },
  //       children: [
  //         {
  //           path: '/approval/natural/detail',
  //           hidden: true
  //         }
  //       ]
  //     },
  //     {
  //       path: '/approval/legal',
  //       meta: {
  //         title: '法人担保审批'
  //       },
  //       children: [
  //         {
  //           path: '/approval/legal/detail',
  //           hidden: true
  //         }
  //       ]
  //     },
  //     {
  //       path: '/approval/inquiry',
  //       meta: {
  //         title: '查证审批'
  //       },
  //       children: [
  //         {
  //           path: '/approval/inquiry/detail',
  //           hidden: true
  //         }
  //       ]
  //     }
  //   ]
  // },
  // // 审批案件管理
  // {
  //   path: '/case-ctrl/credit',
  //   meta: {
  //     icon: 'sidebar-case-ctrl',
  //     title: '审批案件管理'
  //   },
  //   children: [
  //     {
  //       path: '/case-ctrl/credit',
  //       meta: {
  //         title: '授信审批案件'
  //       },
  //       children: [
  //         {
  //           path: '/case-ctrl/credit/detail',
  //           hidden: true
  //         }
  //       ]
  //     },
  //     {
  //       path: '/case-ctrl/natural',
  //       meta: {
  //         title: '自然人担保审批案件'
  //       },
  //       children: [
  //         {
  //           path: '/case-ctrl/natural/detail',
  //           hidden: true
  //         }
  //       ]
  //     },
  //     {
  //       path: '/case-ctrl/legal',
  //       meta: {
  //         title: '法人担保审批案件'
  //       },
  //       children: [
  //         {
  //           path: '/case-ctrl/legal/detail',
  //           hidden: true
  //         }
  //       ]
  //     },
  //     {
  //       path: '/case-ctrl/inquiry',
  //       meta: {
  //         title: '查证审批案件'
  //       },
  //       children: [
  //         {
  //           path: '/case-ctrl/inquiry/detail',
  //           hidden: true
  //         }
  //       ]
  //     }
  //   ]
  // },
  // // 审批业务设置
  // {
  //   path: '/business-setting',
  //   meta: {
  //     icon: 'sidebar-business-setting',
  //     title: '审批业务设置'
  //   }
  // },
  // // 审批角色设置
  // {
  //   path: '/role-setting',
  //   meta: {
  //     icon: 'sidebar-role-setting',
  //     title: '审批角色设置'
  //   }
  // },
  // // 审批人员设置
  // {
  //   path: '/user-setting',
  //   meta: {
  //     icon: 'sidebar-user-setting',
  //     title: '审批人员设置'
  //   }
  // }
]
