/*
 * @Date: 2022-06-13 08:56:40
 * @LastEditors: shen-xu
 * @LastEditTime: 2022-09-19 19:01:39
 * @Description: 
 */
import Vue from 'vue'
import VCharts from 'v-charts'
import App from './App.vue'
import router from './router'
import http from './utils/request.js'
// 导入 Element UI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import qs from 'qs'
import '@/styles/index.less'
import '@/assets/icon/iconfont.css'
import Plugin from 'v-fit-columns';
import JSZip from 'jszip';
import FileSaver from "file-saver";

// 一般基于vue的插件, 都是需要 use 一下, 例如: vue-router ElementUI vuex ...
Vue.use(ElementUI)
Vue.use(VCharts)
Vue.use(NProgress)
Vue.use(Plugin);
Vue.use(JSZip);





// 仅仅是控制控制台的一条提示(可选)
Vue.config.productionTip = false

// 将http请求模块, 挂载到原型
// 将来请求, this.$http.get(url).then(...)

Vue.prototype.$http = http
Vue.prototype.$qs = qs

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
