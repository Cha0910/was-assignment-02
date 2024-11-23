import { createRouter, createWebHistory } from 'vue-router';
import SignInPage from '../pages/signin/SignInPage.vue';
import HomePage from '../pages/home/HomePage.vue';
import PopularPage from '../pages/popular/PopularPage.vue';
//import SearchPage from '../pages/SearchPage.vue';
import WishlistPage from '../pages/wishlist/WishListPage.vue';
import { authGuard } from '@/utils/authGuard';

const routes = [
    { path: '/signin', component: SignInPage },
    {
        path: '/',
        component: HomePage,
        meta: { requiresAuth: true } // 인증이 필요한 경로 설정
    },
    { path: '/views', component: PopularPage },
    //{ path: '/search', component: SearchPage },
    { path: '/wishlist', component: WishlistPage }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach(authGuard);

export default router;
