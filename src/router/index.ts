import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const Index = () => import('@/views/Index.vue')
const userIndex = () => import('@/views/user/Index.vue')
const documentIndex = () => import('@/views/document/Index.vue')
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/userIndex',
    name: 'userIndex',
    component: userIndex
  },
  {
    path: '/documentIndex',
    name: 'documentIndex',
    component: documentIndex
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
