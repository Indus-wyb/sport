// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import qs from 'qs'
import axios from 'axios'
import App from './App'
import router from './router'

const baseUrl = process.env.API_ROOT
Vue.prototype.$baseUrl = baseUrl
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
Vue.config.productionTip = false


Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
