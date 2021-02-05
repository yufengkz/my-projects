import { createApp } from 'vue'
import App from './App.vue'
// import router from './router'
import store from './store'
import VueCountTo from './components/VueCountTo/vue-countTo'

createApp(App)
    // .use(router)
    .use(store)
    .component('CountTo', VueCountTo)
    .mount('#app')
