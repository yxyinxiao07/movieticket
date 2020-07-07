// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import cookies from 'vue-cookies'
import axios from 'axios'
import md5 from 'js-md5';
Vue.prototype.$md5 = md5;
Vue.use(cookies);
Vue.prototype.axios = axios;
//配置字体图标
import "@/common/css/style.css";
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
