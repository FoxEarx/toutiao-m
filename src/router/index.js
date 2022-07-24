import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    component: () => import('@/views/Layout'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/Home')
      },
      {
        path: 'profile',
        component: () => import('@/views/My')
      },
      {
        path: 'qa',
        component: () => import('@/views/QA')
      },
      {
        path: 'video',
        component: () => import('@/views/Video')
      }
    ]
  },
  {
    path: '/search',
    component: () => import('@/views/Search')
  },
  {
    path: '/deta',
    component: () => import('@/views/Details')
  },
  {
    path: '/userinfo',
    component: () => import('@/views/Userinfo')
  }
]

const router = new VueRouter({
  routes
})

export default router
