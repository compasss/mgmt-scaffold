import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/order-list',
          name: 'orderList',
          component: () => import(/* webpackChunkName: "orderList" */ '../views/order/list.vue')
        }
      ]
    },
    {
      path: '/auth/login',
      name: 'loginPage',
      component: () => import(/* webpackChunkName: "loginPage" */ '../views/auth/login.vue')
    },
    {
      path: '/error/no-permission',
      name: 'noPermission',
      component: () => import(/* webpackChunkName: "noPermission" */ '../views/error/noPermission.vue')
    },
    {
      path: "/error/404",
      name: '404',
      component: () => import(/* webpackChunkName: "404" */ '../views/error/E404.vue')
    },
    {
      path: '*', // 页面不存在的情况下会跳到404页面
      redirect: '/error/404',
      name: 'notFound'
    }
  ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
