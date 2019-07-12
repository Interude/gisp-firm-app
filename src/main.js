import Vue from 'vue'

import router from './router/router'
import store from './store/store'
import './permission'
import '../static/css/font-awesome.min.css'
import App from './App.vue'
import 'vant/lib/icon/local.css';
import './style/iconfont.css';
import './style/baseStyle.less'
import { Dialog } from 'vant';
import finalResource  from './util/finalResource'
Vue.use(Dialog)
Vue.prototype.$FINAL = finalResource
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
