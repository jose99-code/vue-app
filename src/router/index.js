import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import AboutPage from '../pages/AboutPage.vue'
import UserPage from '../pages/UserPage.vue'
import UserDetailPage from '../pages/UserDetailPage.vue'

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/about', name: 'about', component: AboutPage },
  { path: '/users', name: 'users', component: UserPage },
  { path: '/users/:id', name: 'user-detail', component: UserDetailPage },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
