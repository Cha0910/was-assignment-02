import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router';
import SignInPage from '../pages/signin/SignInPage.vue';
import HomePage from '../pages/home/HomePage.vue';
import PopularPage from '../pages/popular/PopularPage.vue';
import SearchPage from '../pages/search/SearchPage.vue';
import WishlistPage from '../pages/wishlist/WishListPage.vue';
import { authGuard } from '@/utils/authGuard';

const routes = [
    { path: '/signin', component: SignInPage },
    { path: '/', component: HomePage, meta: { requiresAuth: true } },
    { path: '/popular', component: PopularPage, meta: { requiresAuth: true }},
    { path: '/search', component: SearchPage, meta: { requiresAuth: true } },
    { path: '/wishlist', component: WishlistPage, meta: { requiresAuth: true } }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach(authGuard);

export default router;
