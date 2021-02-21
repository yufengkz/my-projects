export const routeInfo = [
  {
    roleId: '',
    name: 'MapCenter',
    path: '/map',
    hidden: false,
    meta: {
      icon: 'sidebar-map',
      title: 'MAP中心管理'
    },
    children: [
      {
        roleId: '',
        name: 'MAPList',
        path: '/map/edit',
        hidden: true,
        meta: {
          title: '新增',
          icon: ''
        },
        children: null
      }
    ]
  },
  {
    roleId: '',
    name: 'CosignerManage',
    path: '/cosigner-manage',
    hidden: false,
    meta: {
      icon: 'sidebar-customer',
      title: '担保管理'
    },
    children: [
      {
        roleId: '',
        name: 'CosignerManageNatural',
        path: '/cosigner-manage/natural',
        hidden: false,
        meta: {
          title: '自然人担保'
        },
        children: [
          {
            roleId: '',
            name: 'CosignerManageNaturalAdd',
            path: '/cosigner-manage/natural/add',
            hidden: true,
            meta: {
              title: '新增'
            },
            children: null
          },
          {
            roleId: '',
            path: '/cosigner-manage/natural/detail',
            name: 'CosignerManageNaturalDetail',
            hidden: true,
            meta: {
              title: '详情'
            },
            children: null
          }
        ]
      },
      {
        roleId: '',
        name: 'CosignerManageLegal',
        path: '/cosigner-manage/legal',
        hidden: false,
        meta: {
          title: '法人担保',
          icon: ''
        },
        children: [
          {
            roleId: '',
            name: 'CosignerManageLegalAdd',
            path: '/cosigner-manage/legal/add',
            hidden: true,
            meta: {
              title: '新增'
            },
            children: null
          },
          {
            roleId: '',
            name: 'CosignerManageLegalDetail',
            path: '/cosigner-manage/legal/detail',
            hidden: true,
            meta: {
              title: '详情'
            },
            children: null
          }
        ]
      },
      {
        roleId: '',
        name: 'CosignerManageInstitution',
        path: '/cosigner-manage/institution',
        hidden: true,
        meta: {
          title: '合作机构担保'
        },
        children: [
          {
            roleId: '',
            name: 'CosignerManageInstitutionAdd',
            path: '/cosigner-manage/institution/add',
            hidden: true,
            meta: {
              title: '新增'
            },
            children: null
          },
          {
            roleId: '',
            name: 'CosignerManageInstitutionDetail',
            path: '/cosigner-manage/institution/detail',
            hidden: true,
            meta: {
              title: '详情'
            },
            children: null
          }
        ]
      }
    ]
  },
  {
    roleId: '',
    name: 'Roster',
    path: '/roster',
    hidden: false,
    meta: {
      icon: 'sidebar-roster',
      title: '名单管理'
    },
    children: null
  },
  {
    roleId: '',
    name: 'LoanApply',
    path: '/loan-apply',
    hidden: false,
    meta: {
      icon: 'sidebar-loan',
      title: '借款产品管理'
    },
    children: [
      {
        roleId: '',
        name: 'LoanApplyIndex',
        path: '/loan-apply/add',
        hidden: true,
        meta: {
          title: '借款产品管理',
          icon: 'sidebar-loan'
        },
        children: null
      },
      {
        roleId: '',
        name: 'LoanApplyEdit',
        path: '/loan-apply/edit',
        hidden: true,
        meta: {
          title: '编辑'
        },
        children: null
      },
      {
        roleId: '',
        name: 'LoanApplyDetail',
        path: '/loan-apply/detail',
        hidden: true,
        meta: {
          title: '详情'
        },
        children: null
      }
    ]
  },
  {
    roleId: '',
    name: 'Orders',
    path: '/orders',
    hidden: false,
    meta: {
      icon: 'sidebar-orders',
      title: '订单流转审批'
    },
    children: [
      {
        roleId: '',
        name: 'OrdersEdit',
        path: '/orders/edit',
        hidden: true,
        meta: {
          title: '编辑'
        },
        children: null
      }
    ]
  },
  {
    roleId: '',
    name: 'Business',
    path: '/business',
    hidden: false,
    meta: {
      icon: 'sidebar-business',
      title: '业务中心'
    },
    children: [
      {
        roleId: '',
        name: 'BusinessDetail',
        path: '/business/detail',
        hidden: true,
        meta: {
          title: '业务详情'
        },
        children: null
      }
    ]
  },
  {
    roleId: '',
    name: 'Customer',
    path: '/customer',
    hidden: false,
    meta: {
      icon: 'sidebar-customer',
      title: '客户管理'
    },
    children: null
  },
  {
    roleId: '',
    name: 'UserManage',
    path: '/user-manage',
    hidden: false,
    meta: { title: '用户权限配置', icon: 'sidebar-user' },
    children: [
      {
        roleId: '',
        name: 'UserManageUser',
        path: '/user-manage/user',
        hidden: false,
        meta: { title: '运营人员设置', icon: '' },
        children: null
      },
      {
        roleId: '',
        name: 'UserManageRole',
        path: '/user-manage/role',
        hidden: false,
        meta: { title: '运营角色设置', icon: '' },
        children: null
      }
    ]
  }
]
