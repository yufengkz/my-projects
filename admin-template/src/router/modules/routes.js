import Layout from '@/components/Layout'

const routes = [
  // 数据看板
  {
    path: '/home',
    name: 'Home',
    redirect: '/home',
    component: Layout,
    meta: { title: '首页' },
    children: [
      {
        path: '/home',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '' }
      }
    ]
  },
  // 用户权限配置
  {
    path: '/user-manage',
    name: 'userManage',
    redirect: '/user-manage/user',
    component: Layout,
    meta: { title: '用户权限配置' },
    children: [
      {
        path: '/user-manage/user',
        name: 'userManageUser',
        component: () => import('@/views/user-manage/User'),
        meta: { title: '用户配置' }
      },
      {
        path: '/user-manage/role',
        name: 'userManageRole',
        component: () => import('@/views/user-manage/Role'),
        meta: { title: '权限配置' }
      }
    ]
  },
  // 开放平台管理
  {
    path: '/platform-management',
    name: 'PlatformManagement',
    redirect: '/platform-management',
    component: Layout,
    meta: { title: '开放平台管理' },
    children: [
      {
        path: '/platform-management/user-lis',
        name: 'PlatformManagementUser',
        component: () => import('@/components/EmptyTemplate'),
        meta: { title: '平台用户管理列表' },
        children: [
          {
            path: '/platform-management/user-list',
            name: 'PlatformManagementUserList',
            component: () => import('@/views/platform-management/user-manage/'),
            meta: { title: '' }
          }
          // 如果用户信息不复杂 可用弹窗
          // {
          //   path: '/platform-management/user-edit',
          //   name: 'PlatformManagementUserEdit',
          //   component: () => import('@/views/user-manage/Role'),
          //   meta: { title: '平台用户编辑' }
          // }
        ]
      },
      {
        path: '/platform-management/api-list',
        name: 'PlatformManagementAPI',
        component: () => import('@/components/EmptyTemplate'),
        meta: { title: '开放API管理' },
        children: [
          {
            path: '/platform-management/api-list',
            name: 'PlatformManagementAPIList',
            component: () => import('@/views/platform-management/api-manage/'),
            meta: { title: '' }
          },
          {
            path: '/platform-management/api-edit',
            name: 'PlatformManagementUserEdit',
            component: () => import('@/views/platform-management/api-manage/Edit'),
            meta: { title: '开放API编辑' }
          }
        ]
      },
      {
        path: '/platform-management/user-api-list',
        name: 'PlatformManagementUserAPI',
        component: () => import('@/components/EmptyTemplate'),
        meta: { title: '用户API权限管理' },
        children: [
          {
            path: '/platform-management/user-api-list',
            name: 'PlatformManagementUserAPIList',
            component: () => import('@/views/platform-management/user-api-manage/'),
            meta: { title: '' }
          }
          // 如果不复杂 可用弹窗
          // {
          //   path: '/platform-management/user-api-edit',
          //   name: 'PlatformManagementUserAPIEdit',
          //   component: () => import('@/views/user-manage/Role'),
          //   meta: { title: '平台用户编辑' }
          // }
        ]
      }
    ]
  }
]
export default routes
