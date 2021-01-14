import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import moment from 'moment'
import echarts from 'echarts'
import axios from './untils/axiosConfig'
import theme from '../node_modules/echarts/theme/myTheme';

Vue.config.productionTip = false
Vue.prototype.$moment = moment
Vue.prototype.$axios = axios
echarts.registerTheme('theme', theme);
Vue.prototype.$echarts = echarts


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
