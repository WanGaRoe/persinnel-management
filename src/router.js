import Vue from 'vue'
import Router from 'vue-router'

const VueRouterPush = Router.prototype.push
Router.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}
Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login')
    },
    {
      path: '/',
      redirect: '/home',
      component: () => import('@/views/index.vue'),
      children: [
        // 统计
        {
          path: '/home',
          name: 'home',
          component: () => import('@/views/Home')
        },
        // 员工管理
        {
          path: '/management',
          name: 'management',
          component: () => import('@/views/Management')
        },
        // 考勤
        {
          path: '/attendance',
          name: 'attendance',
          component: () => import('@/views/Info')
        },
        // 薪资
        {
          path: '/salary',
          name: 'salary',
          component: () => import('@/views/Info')
        },
        // 帐号
        {
          path: '/account',
          name: 'account',
          component: () => import('@/views/Account')
        },
        // 角色
        {
          path: '/role',
          name: 'role',
          component: () => import('@/views/Role')
        }
      ]
    }
  ]
})
