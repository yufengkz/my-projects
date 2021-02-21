export const routeInfo = [
  // 业务开始
  // MAP中心管理
  {
    path: '/map',
    meta: {
      icon: 'sidebar-map',
      title: 'MAP中心管理'
    },
    children: [
      {
        path: '/map/edit',
        hidden: true,
        meta: {
          title: '新增'
        }
      }
    ]
  },
  // 担保管理
  {
    path: '/cosigner-manage',
    meta: {
      icon: 'sidebar-customer',
      title: '担保管理'
    },
    children: [
      {
        path: '/cosigner-manage/natural',
        meta: {
          title: '自然人担保'
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
          title: '法人担保'
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
      },
      {
        path: '/cosigner-manage/institution',
        meta: {
          title: '合作机构担保'
        },
        children: [
          {
            path: '/cosigner-manage/institution/add',
            hidden: true
          },
          {
            path: '/cosigner-manage/institution/detail',
            hidden: true
          }
        ]
      }
    ]
  },
  // 名单管理
  {
    path: '/roster',
    meta: {
      icon: 'sidebar-roster',
      title: '名单管理'
    }
  },
  // 借款产品管理
  {
    path: '/loan-apply',
    meta: {
      icon: 'sidebar-loan',
      title: '借款产品管理'
    },
    children: [
      {
        path: '/loan-apply/add',
        hidden: true
      },
      {
        path: '/loan-apply/edit',
        hidden: true
      },
      {
        path: '/loan-apply/detail',
        hidden: true
      }
    ]
  },
  // 订单流转审批
  {
    path: '/orders',
    meta: {
      icon: 'sidebar-orders',
      title: '订单流转审批'
    },
    children: [
      {
        path: '/orders/edit',
        hidden: true
      }
    ]
  },
  // 业务中心
  {
    path: '/business',
    meta: {
      icon: 'sidebar-business',
      title: '业务中心'
    },
    children: [
      {
        path: '/business/detail',
        meta: {
          title: '业务详情'
        },
        hidden: true
      }
    ]
  },
  // 客户管理
  {
    path: '/customer',
    meta: {
      icon: 'sidebar-customer',
      title: '客户管理'
    }
  },
  // 运营人员设置
  {
    path: '/user-manage/user',
    meta: {
      icon: 'sidebar-user-setting',
      title: '运营人员设置'
    }
  },
  // 运营角色设置
  {
    path: '/user-manage/role',
    meta: {
      icon: 'sidebar-role-setting',
      title: '运营角色设置'
    }
  }
]
// {
//   path: '/user-manage',
//   meta: {
//     icon: 'sidebar-user',
//     title: '用户权限配置'
//   },
//   children: [
//     {
//       path: '/user-manage/user',
//       meta: {
//         title: '运营人员设置'
//       }
//     },
//     {
//       path: '/user-manage/role',
//       meta: {
//         title: '运营角色设置'
//       }
//     }
//   ]
// }

// [{path:'/map',meta:{icon:'sidebar-customer',title:'MAP中心管理'},children:[{path:'/map/edit',hidden:true,meta:{title:'新增'}}]},{path:'/cosigner-manage',meta:{icon:'sidebar-customer',title:'担保管理'},children:[{path:'/cosigner-manage/natural',meta:{title:'自然人担保'},children:[{path:'/cosigner-manage/natural/add',hidden:true},{path:'/cosigner-manage/natural/detail',hidden:true}]},{path:'/cosigner-manage/legal',meta:{title:'法人担保'},children:[{path:'/cosigner-manage/legal/add',hidden:true},{path:'/cosigner-manage/legal/detail',hidden:true}]},{path:'/cosigner-manage/institution',meta:{title:'合作机构担保'}}]},{path:'/roster',meta:{icon:'sidebar-customer',title:'名单管理'}},{path:'/loan-apply',meta:{icon:'sidebar-white-list',title:'借款产品管理'},children:[{path:'/loan-apply/add',hidden:true},{path:'/loan-apply/edit',hidden:true},{path:'/loan-apply/detail',hidden:true}]},{path:'/orders',meta:{icon:'sidebar-customer',title:'订单流转审批'},children:[{path:'/orders/edit',hidden:true}]},{path:'/business',meta:{icon:'sidebar-customer',title:'业务中心'},children:[{path:'/business/detail',meta:{title:'业务详情'},hidden:true}]},{path:'/customer',meta:{icon:'sidebar-customer',title:'客户管理'}},{path:'/user-manage',meta:{icon:'sidebar-customer',title:'用户权限配置'},children:[{path:'/user-manage/user',meta:{title:'用户配置'}},{path:'/user-manage/role',meta:{title:'权限配置'}}]},]
