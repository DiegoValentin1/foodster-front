import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/public/Login.vue'
import TableUsers from '../components/admin/users/TableUsers.vue';
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
        {
          path: '/admin/users',
          name: 'users',
          component: () => import('../components/admin/users/TableUsers.vue')
        },
        {
          path: '/admin/personal',
          name: 'personal',
          component: () => import('../components/admin/personal/TablePersonal.vue')
        },
        {
          path: '/admin/banquetes',
          name: 'banquetes',
          component: () => import('../components/admin/banquetes/TableBanquetes.vue')
        },
        {
          path: '/admin/descuentos',
          name: 'descuentos',
          component: () => import('../components/admin/banquetes/descuentos/TableDescuentos.vue')
        },
        {
          path: '/admin/eventos',
          name: 'eventos',
          component: ()=> import('../components/admin/eventos/TableEventos.vue')
        }
      ]
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../components/admin/components/Home.vue'),
      children: [
        {
          path: '/home/entradas',
          name: 'entradas',
          component: () => import('../components/admin/components/Inicio.vue')
        },
        {
          path: '/home/utencilios',
          name: 'utencilios',
          component: () => import('../components/public/error/ErrorPage.vue')
        }
      ]
    }
  ]
})

export default router
