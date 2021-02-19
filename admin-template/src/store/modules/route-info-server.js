export const routeInfo = [
  {
    name: 'Home',
    path: '/home',
    hidden: false,
    meta: { title: '首页', icon: 'sidebar-dashboard' },
    children: [{ name: 'Home', path: '/home', hidden: true, meta: { title: '首页', icon: '' }, children: null }]
  },
  {
    name: 'UserManage',
    path: '/user-manage',
    hidden: false,
    meta: { title: '系统管理', icon: 'sidebar-customer' },
    children: [
      { name: 'UserManageUser', path: '/user-manage/user', hidden: false, meta: { title: '用户管理', icon: '' }, children: null },
      { name: 'UserManageRole', path: '/user-manage/role', hidden: false, meta: { title: '权限管理', icon: '' }, children: null }
    ]
  },
  // 开放平台管理
  {
    name: 'PlatformManagement',
    path: '/platform-management',
    hidden: false,
    meta: { title: '开放平台管理', icon: 'sidebar-customer' },
    children: [
      {
        name: 'PlatformManagementUser',
        path: '/platform-management/user-list',
        hidden: false,
        meta: { title: '平台用户管理', icon: '' },
        children: [
          {
            name: 'PlatformManagementUserList',
            path: '/platform-management/user-list',
            hidden: false,
            meta: { title: '平台用户管理', icon: '' }
          },
          {
            name: 'PlatformManagementUserEdit',
            path: '/platform-management/user-edit',
            hidden: true,
            meta: { title: '平台用户编辑', icon: '' }
          }
        ]
      },
      {
        name: 'PlatformManagementAPI',
        path: '/platform-management/api-list',
        hidden: false,
        meta: { title: '开放API管理', icon: '' },
        children: [
          {
            name: 'PlatformManagementAPIList',
            path: '/platform-management/api-list',
            hidden: false,
            meta: { title: '开放API管理', icon: '' }
          },
          {
            name: 'InterfaceEdit',
            path: '/platform-management/api-edit',
            hidden: true,
            meta: { title: '开放API编辑', icon: '' }
          }
        ]
      },
      {
        name: 'PlatformManagementUserAPI',
        path: '/platform-management/user-api-list',
        hidden: false,
        meta: { title: '用户API权限管理', icon: '' },
        children: {
          name: 'PlatformManagementUserAPIList',
          path: '/platform-management/user-api-list',
          hidden: true,
          meta: { title: '用户API权限管理', icon: '' }
        }
      }
    ]
  }
]
