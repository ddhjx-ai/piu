// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'babel-polyfill'

import './assets/css/common.css'
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import X2js from 'x2js' // xml数据处理插件

// 配置请求
import axios from 'axios'
axios.defaults.baseURL = ''
Vue.prototype.$http = axios
Vue.prototype.$x2js = new X2js() // 创建x2js对象，挂到vue原型上

Vue.use(element)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
