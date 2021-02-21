export const routeInfo = [
  {
    name: 'LoanApply',
    path: '/loan-apply',
    hidden: false,
    meta: {
      icon: 'sidebar-loan-apply',
      title: '贷款申请'
    },
    children: [
      {
        name: 'LoanApplyAdd',
        path: '/loan-apply/add',
        meta: { title: '新增贷款申请', icon: '' },
        hidden: true
      },
      {
        name: 'LoanApplyDetail',
        path: '/loan-apply/detail',
        meta: { title: '贷款申请详情', icon: '' },
        hidden: true
      }
    ]
  },
  {
    name: 'CosignerManage',
    path: '/cosigner-manage',
    hidden: false,
    meta: {
      icon: 'sidebar-cosigner-manage',
      title: '担保人管理'
    },
    children: [
      {
        name: 'CosignerManageNatural',
        path: '/cosigner-manage/natural',
        hidden: false,
        meta: {
          title: '自然人担保管理',
          icon: ''
        },
        children: [
          {
            name: 'CosignerManageNaturalAdd',
            path: '/cosigner-manage/natural/add',
            meta: { title: '自然人担保管理新增', icon: '' },
            hidden: true
          },
          {
            name: 'CosignerManageNaturalDetail',
            path: '/cosigner-manage/natural/detail',
            meta: { title: '自然人担保管理详情', icon: '' },
            hidden: true
          }
        ]
      },
      {
        name: 'CosignerManageLegal',
        path: '/cosigner-manage/legal',
        hidden: false,
        meta: {
          title: '法人担保管理',
          icon: ''
        },
        children: [
          {
            name: 'CosignerManageLegalAdd',
            path: '/cosigner-manage/legal/add',
            meta: { title: '法人担保管理新增', icon: '' },
            hidden: true
          },
          {
            name: 'CosignerManageLegalDetail',
            path: '/cosigner-manage/legal/detail',
            meta: { title: '法人担保管理详情', icon: '' },
            hidden: true
          }
        ]
      }
    ]
  }
]
