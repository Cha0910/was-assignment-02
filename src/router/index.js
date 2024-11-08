import { createRouter, createWebHistory } from 'vue-router';
import SignInPage from '../pages/signin/SignInPage.vue';
//import HomePage from '../pages/HomePage.vue';
//import PopularPage from '../pages/PopularPage.vue';
//import SearchPage from '../pages/SearchPage.vue';
//import WishlistPage from '../pages/WishlistPage.vue';

const routes = [
    { path: '/signin', component: SignInPage },
    //{ path: '/', component: HomePage },
    //{ path: '/popular', component: PopularPage },
    //{ path: '/search', component: SearchPage },
    //{ path: '/wishlist', component: WishlistPage }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
