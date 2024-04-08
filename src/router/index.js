import Vue from "vue";
import VueRouter from "vue-router";
import {useAuthStore} from "@/stores";
import TableDirecciones from "../components/admin/personal/direcciones/TableDirecciones.vue";

Vue.use(VueRouter);
const router = new VueRouter({
    mode: "history", base: import.meta.env.BASE_URL, routes: [{
        path: "/", redirect: "/home/inicio",
    }, {
        path: "/admin",
        meta: {roles: ['ADMIN']},
        name: "admin",
        component: () => import("../components/admin/components/SidebarNavbar.vue"),
        children: [{
            path: "/", name: "dashboard", component: () => import("../components/admin/Dashboard.vue"),
        }, {
            path: "/admin/users", name: "users", component: () => import("../components/admin/users/TableUsers.vue"),
        }, {
            path: "/admin/personal",
            name: "personal",
            component: () => import("../components/admin/personal/TablePersonal.vue"),
        }, {
            path: "/admin/banquetes",
            name: "banquetes",
            component: () => import("../components/admin/banquetes/TableBanquetes.vue"),
        }, {
            path: "/admin/descuentos", name: "descuentos", component: () => import(
                "../components/admin/banquetes/descuentos/TableDescuentos.vue"
                ),
        }, {
            path: "/admin/eventos",
            name: "eventos",
            component: () => import("../components/admin/eventos/TableEventos.vue"),
        }, {
            path: "/admin/roles", name: "roles", component: () => import("../components/admin/roles/TableRoles.vue"),
        }, {
            path: "/admin/servicios",
            name: "servicios",
            component: () => import("../components/admin/services/TableServices.vue"),
        }, {
            path: "/admin/categorias",
            name: "categorias",
            component: () => import("../components/admin/categories/TableCategories.vue"),
        }, {
            path: "/admin/paquete",
            name: "package",
            component: () => import("../components/admin/paquete/TablePackages.vue"),
        }, {
            path: "/admin/direcciones", name: "direcciones", component: TableDirecciones,
        },],
    }, {
        path: "/home", // meta: {roles: ['CLIENTE']},
        name: "home",
        component: () => import("../components/cliente/components/Home.vue"),
        redirect: "/home/inicio",
        children: [{
            path: "/home/paquetes/",
            name: "paquetes",
            component: () => import("../components/cliente/components/Paquetes.vue"),
        }, {
            path: "/home/servicios/",
            name: "serviciosCliente",
            component: () => import("../components/cliente/components/Servicios.vue"),
        }, {
            path: "/home/inicio/",
            name: "inicio",
            component: () => import("../components/public/Landing-pages/LandingPage.vue"),
        }, {

            path: "/home/perfil/",
            meta: {auth: true},
            name: "perfil",
            component: () => import("../components/cliente/components/Profile.vue")


        }, {
            path: "/home/login/", name: "login", component: () => import("../components/public/Login.vue"),
        }, {
            // que aqui solo se acceda si no esta logeado
            path: '/home/registro/', name: 'registrarse', component: () => import('../components/public/Register.vue')
        }, {

            path: "/restablecer/correo/",
            meta: {auth: false},
            name: "restablecerCorreo",
            component: () => import("../components/public/Restablecer.vue"),
        }, {
            path: "/restablecer/",
            meta: {auth: false},
            name: "restablecerConfirmar",
            component: () => import("../components/public/RestablecerConfirmar.vue"),
        }, {
            path: "/home/carrito/",
            name: "carrito",
            component: () => import("../components/cliente/components/ShoppingCart.vue"),
        }, {
            path: "/home/pedido", name: "pedido", component: () => import("../components/cliente/Pedido.vue"),
        },


        ],
    }, {
        path: "/personal",
        meta: {roles: ['PERSONAL']},
        name: "personalScreen",
        component: () => import("../components/personal/components/SidebarNavbar.vue"),
        children: [{
            path: "/", name: "eventos", component: () => import("../components/personal/components/Eventos.vue"),
        }],
    }, {
        path: "/404", name: "404", component: () => import("../components/public/error/ErrorPage.vue"),
    }, {
        path: "*", redirect: "/404",
    },],
});

router.beforeEach(async (to, from, next) => {
    const auth = useAuthStore();
    let userRoles = [];
    if (auth.user?.usuarios?.roles) {
        userRoles = auth.user.usuarios.roles.map((role) => role.nombre);
    }
    if (to.matched.some((record) => record.meta?.auth)) {
        if (!auth.user) {
            auth.returnUrl = to.fullPath;
            return next({name: "login"});
        }
    }
    if (to.matched.some((record) => record.meta?.roles)) {
        try {
            if (!to.matched.some((record) => userRoles.some(role => record.meta.roles.includes(role)))) {
                return next({name: "404"});
            }
        } catch (e) {
            return next({name: "404"});
        }
    }
    next();
});
export default router;
