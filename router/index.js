import VueRouter from 'vue-router';

import MainPage from '../ui/pages/Dashboard';

const routes = [
    { path: '/', component: MainPage, name: 'base' },
];

export default new VueRouter({
    routes,
    mode: 'history',
    linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!store.getters.isAuthenticated) {
            next({
                path: '/login'
            });
        } else {
            if (to.matched.some(record => record.meta.role === undefined)) {
                next();
            } /*else if (to.matched.some(record => record.meta.role === store.getters.getRole)) {
                next();
            } */else {
                next({ path: '/' });
            }
        }
    } else {
        next()
    }
});
