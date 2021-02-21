import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading
Vue.use(Router)

/**
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in breadcrumb (recommend set)
  }
**/
export const constantRoutes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/404',
    component: () => import('@/views/404')
  },
  /* 登录模块 */
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/forget',
    name: 'forget',
    component: () => import('@/views/login/ForgetPwd')
  },
  /* 贷款申请 */
  {
    path: '/loan-apply',
    name: 'loanApply',
    component: Layout,
    meta: {
      title: '借款申请'
    },
    children: [
      {
        path: '',
        name: 'loanApplyIndex',
        component: () => import('@/views/loan-apply'),
        meta: {
          title: ''
        }
      },
      {
        path: '/loan-apply/add',
        name: 'loanApplyAdd',
        component: () => import('@/views/loan-apply/Add'),
        meta: {
          title: '新增'
        }
      },
      {
        path: '/loan-apply/detail',
        name: 'loanApplyDetail',
        component: () => import('@/views/loan-apply/Detail'),
        meta: {
          title: '详情'
        }
      }
    ]
  },
  /* 担保人管理 */
  {
    path: '/cosigner-manage',
    name: 'cosignerManage',
    redirect: '/cosigner-manage/natural',
    component: Layout,
    meta: {
      title: ''
    },
    children: [
      {
        path: '/cosigner-manage/natural',
        component: () => import('@/components/EmptyTemplate'),
        meta: {
          title: '自然人担保管理'
        },
        children: [
          {
            path: '/cosigner-manage/natural',
            name: 'cosignerManageNatural',
            component: () => import('@/views/cosigner-manage/natural')
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
            name: 'cosignerManageNaturalDetail',
            component: () => import('@/views/cosigner-manage/natural/Detail'),
            meta: {
              title: '自然人担保申请'
            }
          }
        ]
      },
      {
        path: '/cosigner-manage/legal',
        // name: 'cosignerManageLegal',
        component: () => import('@/components/EmptyTemplate'),
        meta: {
          title: '法人担保管理'
        },
        children: [
          {
            path: '/cosigner-manage/legal',
            name: 'cosignerManageLegal',
            component: () => import('@/views/cosigner-manage/legal')
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
      }
    ]
  }
]

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
