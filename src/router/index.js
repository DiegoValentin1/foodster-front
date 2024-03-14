import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/public/Login.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../components/admin/components/SidebarNavbar.vue'),
      children: [
        {
          path: '/',
          name: 'dashboard',
          component: () => import('../components/admin/Dashboard.vue')
        },
        // {
        //   path: 'profile',
        //   name: 'profile',
        //   component: () => import('../components/admin/Profile.vue')
        // },
        // Puedes agregar más rutas secundarias según tus necesidades
      ]
    }
  ]
})

export default router
