import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import 'vant/lib/index.css'
import router from './router'
import Vant from 'vant'
import axios from 'axios'
import VueAxios from 'vue-axios'
import globalVariable from './api/global_variable'

Vue.use(Vant)
Vue.use(VueAxios, axios)

Vue.prototype.GLOBAL = globalVariable

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
