import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as filters from '@/utils/filter'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/icons'
import '@/permission' // permission control
import '@/components/BackToTop'
import '@/styles/index.scss'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Object.keys(filters).forEach(k => Vue.filter(k, filters[k])) // 注册过滤器

Vue.config.productionTip = false // 设置为 false 以阻止 vue 在启动时生成生产提示

Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
