import Vue from 'vue'
import {createPinia} from 'pinia';
import App from './App.vue'
import router from './router'
import vuetify from '@/plugins/vuetify' 
import './assets/main.css'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import 'animate.css';
const pinia = createPinia();


Vue.use(VueSweetalert2)
Vue.use(pinia);

new Vue({
    router,
    vuetify,
    pinia,
    render: (h) => h(App)
}).$mount('#app')
