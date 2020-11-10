import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import moment from 'moment'
import VCharts from 'v-charts'
import axios from './untils/axiosConfig'

Vue.config.productionTip = false
Vue.prototype.$moment = moment
Vue.prototype.$axios = axios
Vue.use(VCharts)


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
