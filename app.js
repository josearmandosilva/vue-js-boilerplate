// Import the http requests library
import axios from 'axios';

window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

import Vue from 'vue'
// Import of the router packaging to allow routing in SPA
import VueRouter from 'vue-router'
Vue.use(VueRouter);
// Import the router instance
import router from './router'

// Import of user interface material framework
import Vuetify from 'vuetify'
Vue.use(Vuetify);
// Import styles for the application
import 'vuetify/dist/vuetify.min.css'

// Import the storage of the application mainly for login information
import store from './store'
// Import of the master template file
import App from './ui/pages/App.vue'

const app = new Vue({
    vuetify : new Vuetify(),
    router,
    store,
    render: (h) => h(App),
}).$mount('#app')
