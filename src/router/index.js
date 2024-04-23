import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserPage from '../views/UserView.vue'

import LoginPage from "@/views/LoginPage.vue";
import WebLayout from "@/views/platform/WebLayout.vue";
import leafletView from "@/views/leafletView.vue";
import createView from "@/views/CreateView.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: WebLayout,
      redirect: '/login', // 添加一个重定向选项
      children: [
        {
          path: 'home',
          component: HomeView,
          name: 'HomeView',
        },
        {
          path: 'user',
          component: UserPage,
          name: 'UserPage',
        },
        {
          path: 'leaflet',
          component: leafletView,
          name: 'leafletView',
        },
        {
          path: 'create',
          component: createView,
          name: 'createView',
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/register',
      component: { render: () => import('../views/RegisterPage.vue') } // 动态组件
    }
  ]
/*  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/user',
      name: 'user',
      component: UserPage
    },
    {
      path: '/homework1',
      name: 'homework1',
      component: HomeWork1,
    },
    {
      path: '/homework2',
      name: 'homework2',
      component: HomeWork2,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
  ]*/
})

export default router
