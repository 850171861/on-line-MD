import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const Index = () =>
  import('@/views/Index.vue')
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
