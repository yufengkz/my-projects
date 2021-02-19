import router from './router'
import store from './store'

import { Message } from 'element-ui'
import { routeInfo } from '@/store/modules/route-info'
import { getToken } from '@/utils/auth' // 验权

const whiteList = ['/login', '/404', '/register'] // 设置白名单，避免死循环

function checkPermission(router) {
    if (whiteList.indexOf(router.path) !== -1) {
        return true
    }
    // 刷新浏览器时，路由的path存在后缀多加/的情况，需要做下去除
    const nextPath = router.path.endsWith('/') ? router.path.substring(0, router.path.length - 1) : router.path
    return checkParentAndChildren(store.getters.routePermission, nextPath)
}

function checkParentAndChildren(routes, nextPath) {
    return routes.some(item => {
        if (item.path === nextPath) {
            return true
        } else if (item.children && item.children.length > 0 && checkParentAndChildren(item.children, nextPath)) {
            return true
        } else {
            return false
        }
    })
}

router.beforeEach((to, from, next) => {
    if (getToken()) {
        if (to.path === '/login') {
            next()
        } else {
            if (!store.getters.currentUser.userName) {
                // 获取用户信息
                store
                    .dispatch('GetUserInfo')
                    .then(() => {
                        // mock数据-前端生产菜单
                        store.dispatch('GenerateRoutes', routeInfo).then(() => {
                            // store.dispatch('GenerateRoutes', res.data.resourcesListTreeList || routeInfo).then(() => {
                            next({
                                ...to,
                                replace: true
                            }) // hack方法 确保生成菜单后再次校验是否有权限
                        })
                    })
                    .catch(err => {
                        console.info(err)
                        store.dispatch('LogOut').then(() => {
                            Message.error(err || '获取个人信息异常，请重新登录')
                            next({
                                path: '/'
                            })
                        })
                    })
            } else if (checkPermission(to)) {
                next()
            } else {
                next({
                    path: '/404'
                })
            }
        }
    } else {
        if (to.path === '/login' || to.path === '/forget' || to.path === '/register') {
            next()
        } else {
            next('/login') // 否则全部重定向到登录页
            // next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
        }
    }
})

router.afterEach(() => {})
