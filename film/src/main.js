// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './stores'
import cookies from 'vue-cookies'
import axios from 'axios'
import Scroller from '@/components/Scroller'
import Loading from '@/components/Loading'
import md5 from 'js-md5';
Vue.prototype.$md5 = md5;
Vue.prototype.axios = axios;
//配置字体图标
import "@/common/css/style.css";
Vue.config.productionTip = false;

Vue.use(cookies);

Vue.filter('setWH', (url, arg) => {
  return url.replace(/w\.h/, arg);
});

Vue.component('Scroller', Scroller);
Vue.component('Loading', Loading);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
});
