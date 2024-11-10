export function authGuard(to, from, next) {
    const isAuthenticated = localStorage.getItem('TMDb-Key') !== null;
    if (!isAuthenticated && to.meta.requiresAuth) {
        next('/signin'); // 인증되지 않은 사용자는 로그인 페이지로 리다이렉트
    } else if(isAuthenticated && to.path === '/signin'){    // 인증된 사용자가 /signin에 접근하면 홈으로 리다이렉트
        next('/');
    } else {
        next(); // 인증된 사용자는 원하는 페이지로 이동
    }
}
