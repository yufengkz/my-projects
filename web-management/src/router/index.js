import Vue from 'vue'
import Router from 'vue-router'
// import Layout from '@/components/Layout'
import routes from './modules/routes'

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
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home')
  },
  /* 登录模块 */
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index')
  },
  {
    path: '/mobile',
    name: 'mobile',
    component: () => import('@/views/login/Mobile')
  },
  {
    path: '/password',
    name: 'password',
    component: () => import('@/views/login/Password')
  },
  {
    path: '/404',
    component: () => import('@/views/404')
  }
]

// export const routes = constantRoutes.concat(debtorRouter, financingRouter, factoringRouter)
export const routesArr = constantRoutes.concat(routes)

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: routesArr
})
