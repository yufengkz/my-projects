import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
import App from './App.vue'
import router from './router'
import store from './store'
import * as filters from '@/utils/filter'
import './directive'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import ElementUI from 'fic-element-ui'
// import 'fic-element-ui/lib/theme-chalk/index.css'
// import locale from 'fic-element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss'
import '@/styles/theme/index.css'

import InputTag from 'vue-input-tag'

import '@/icons'
import '@/permission' // permission control
import '@/components/BackToTop'
// 引入mock数据
import './mock'
import { Table, TableColumn } from 'fic-element-ui'

// // 开发用mock菜单
// import { routeArr } from './store/modules/mock-route'
// store.dispatch('GenerateRoutes', routeArr)

Object.keys(filters).forEach(k => Vue.filter(k, filters[k])) // 注册过滤器

Vue.use(Table)
Vue.use(TableColumn)
Vue.component('input-tag', InputTag)

Vue.config.productionTip = false // 设置为 false 以阻止 vue 在启动时生成生产提示

//
Vue.use(VueCompositionAPI)

Vue.use(ElementUI)

// mock token 待删除
// eslint-disable-next-line import/first
// import { setToken, setRoleNo } from '@/utils/auth' // 验权
// // eslint-disable-next-line import/first
// import { getMockToken } from '@/api/common'
// const param = {
//   systemType: '1',
//   password: 'MTIzMTIz',
//   username: 'xmgsjb0217',
//   imgCode: '9999',
//   key: '999'
// }
// getMockToken(param).then(res => {
//   setToken(res.token)
//   setRoleNo('YEWU')
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
