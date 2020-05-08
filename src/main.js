import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.prototype.$baseURL = 'http://120.26.185.241:8888'
Vue.use(Element)
Vue.config.productionTip = false

// 路由每次跳转都会通过这个函数（如果返回到登录页面就清空用户信息，之后不能通过路由跳转到其他页面）
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    window.sessionStorage.removeItem('loginName')
  }
  let user = window.sessionStorage.getItem('loginName')
  if (!user && to.path !== '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
