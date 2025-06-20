import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SearchList from '../views/SearchList.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/search/:model',
    name: 'SearchList',
    component: SearchList
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
