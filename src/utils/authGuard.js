export function authGuard(to, from, next) {
    const isAuthenticated = localStorage.getItem('TMDb-Key') !== null;
    if (!isAuthenticated && to.meta.requiresAuth) {
        next('/signin'); // 인증되지 않은 사용자는 로그인 페이지로 리다이렉트
    } else {
        next(); // 인증된 사용자는 원하는 페이지로 이동
    }
}
