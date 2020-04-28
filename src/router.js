import Vue from 'vue'
import Router from 'vue-router'

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: () => import('@/views/index.vue'),
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('@/views/Home')
        },
        {
          path: '/management',
          name: 'management',
          component: () => import('@/views/Management')
        },
        {
          path: '/info',
          name: 'info',
          component: () => import('@/views/Info')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login')
    }
  ]
})