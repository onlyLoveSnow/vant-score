import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import 'vant/lib/index.css'
import router from './router'
import Vant from 'vant'
import axios from 'axios'
import VueAxios from 'vue-axios'
// eslint-disable-next-line camelcase
import global_variable from './api/global_variable'

Vue.use(Vant)
Vue.use(VueAxios, axios)

// eslint-disable-next-line camelcase
Vue.prototype.GLOBAL = global_variable

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
