import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入字体图标css样式
import './assets/fonts/iconfont.css'
// 引入Vant样式组件
import Vant from 'vant'
import 'vant/lib/index.css'
// 引入移动端适配文件amfe-flexible
import 'amfe-flexible/index.min.js'

Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
