import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Router from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import routes from './routes/routes'
import Mock from 'mockjs'
import './mock/index.js'//模拟数据
import './mock/index1.js'
import './mock/index2.js'
import './mock/index3.js'
import axios from 'axios'
import VueClipboard from 'vue-clipboard2'
const routerPush = Router.prototype.push
Vue.prototype.$axios=axios

Vue.use(ElementUI)
Vue.use(Router)
Vue.use(Vuex)
Vue.use(VueClipboard)
const router = new Router({
  routes:routes
})

Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

// router.beforeEach((to, from, next) => {
//   if (to.meta.requireAuth) {
//     // 对路由进行验证     
//     if (store.state.isLogin == '1') { // 已经登陆    
//       // if (store.state.token) {   //或者token判断
//       next('/page') // 正常跳转到你设置好的页面     
//     } else {
//       // 未登录则跳转到登陆界面，query:{ Rurl: to.fullPath}表示把当前路由信息传递过去方便登录后跳转回来；
//       next({
//         path: 'views/login/Login',
//         query: {
//           Rurl: to.fullPath
//         }
//       })
//     }
//   } else {
//     next()
//   }
// });
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
