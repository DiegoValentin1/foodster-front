import Vue from 'vue'
import {createPinia} from 'pinia';
import App from './App.vue'
import router from './router'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import './assets/main.css'

const pinia = createPinia();

Vue.use(pinia);

new Vue({
    router,
    vuetify,
    pinia,
    render: (h) => h(App)
}).$mount('#app')
