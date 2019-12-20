import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//响应样式
import '@/assets/js/rem.js'

//使用vant框架
import 'vant/lib/index.css';
import { Button,Toast  } from 'vant';


Vue.config.productionTip = false

Vue.use(Button).use(Toast);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
