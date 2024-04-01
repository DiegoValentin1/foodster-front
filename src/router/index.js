import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/public/Login.vue'
import {useAuthStore} from "@/stores";
Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history', base: import.meta.env.BASE_URL, routes: [{
        path: '/', name: 'login', component: Login, // que el login solamente se muestre si no hay un usuario logueado

    }, {
        path: '/admin',
        // meta: {roles: ['ADMIN']},
        name: 'admin',
        component: () => import('../components/admin/components/SidebarNavbar.vue'),
        children: [{
            path: '/', name: 'dashboard', component: () => import('../components/admin/Dashboard.vue')
        }, {
            path: '/admin/users', name: 'users', component: () => import('../components/admin/users/TableUsers.vue')
        }, {
            path: '/admin/personal',
            name: 'personal',
            component: () => import('../components/admin/personal/TablePersonal.vue')
        }, {
            path: '/admin/banquetes',
            name: 'banquetes',
            component: () => import('../components/admin/banquetes/TableBanquetes.vue')
        }, {
            path: '/admin/descuentos',
            name: 'descuentos',
            component: () => import('../components/admin/banquetes/descuentos/TableDescuentos.vue')
        }, {
            path: '/admin/eventos',
            name: 'eventos',
            component: () => import('../components/admin/eventos/TableEventos.vue')
        }, {
            path: '/admin/roles', name: 'roles', component: () => import('../components/admin/roles/TableRoles.vue')
        },{
             path:'/admin/servicios',
             name:'servicios',
             component:()=>import('../components/admin/services/TableServices.vue')
        },
        {
            path:'/admin/categorias',
            name:'categorias',
            component:()=>import('../components/admin/categories/TableCategories.vue')
        },
        {
            path:'/admin/paquete',
            name:'package',
            component:()=>import('../components/admin/paquete/TablePackages.vue')
        }
    
    ]
    }, {
        path: '/home',
        // meta: {roles: ['CLIENTE']},
        name: 'home',
        component: () => import('../components/cliente/components/Home.vue'),
        children: [{
            path: '/home/paquetes/',
            name: 'paquetes',
            component: () => import('../components/cliente/components/Inicio.vue')
        }, {
            path: '/home/servicios/',
            name: 'servicios',
            component: () => import('../components/cliente/components/Inicio.vue')
        }, {
            path: '/home/inicio/',
            name: 'inicio',
            component: () => import('../components/public/Landing-pages/LandingPage.vue')
        }, {
            path: '/home/perfil/',
            component: () => import('../components/cliente/components/Profile.vue')
        },{
            path:'/home/carrito/',
            name:'carrito',
            component:()=>import('../components/cliente/components/ShoppingCart.vue')
        },
        {
            path: '/home/pedido', name: 'pedido', component: () => import('../components/cliente/Pedido.vue')
        }]
    },
    {
        path: '/404', name: '404', component: () => import('../components/public/error/ErrorPage.vue')
    }, {
        path: '*', redirect: '/404'
    }
]
})

router.beforeEach(async (to, from, next) => {
    const auth = useAuthStore();
    let userRoles = [];
    if (auth.user && auth.user.usuarios) {
        userRoles = auth.user.usuarios.roles.map(role => role.nombre);
    }
    if (to.matched.some(record => record.meta && record.meta.roles)) {
        if (!auth.user) {
            auth.returnUrl = to.fullPath;
            return next({name: 'login'});
        }

    }
    next();
});
export default router
