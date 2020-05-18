import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from '@/request/index.js'

Vue.config.productionTip = false

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

Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
