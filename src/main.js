import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from '@/request/index.js'

// import element-ui
import './ui.js'

import '@/assets/scss/style.scss'

Vue.config.productionTip = false
Vue.prototype.$axios = axios

// net status
let condition = 'onLine';
function updateOnlineStatus() {
  condition = navigator.onLine ? 'online' : 'offline';
  if (condition === 'offline') {
    // Toast('网络错误')
  }
}
window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
