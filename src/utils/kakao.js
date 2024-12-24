// kakao.js
const KAKAO_API_KEY = import.meta.env.VITE_KAKAO_API_KEY;
const REDIRECT_URI = process.env.NODE_ENV === 'production'
    ? `https://${import.meta.env.VITE_IP_ADDRESS}`  // GitHub Pages URL (배포 환경)
    : `http://${import.meta.env.VITE_IP_ADDRESS}:${import.meta.env.VITE_PORT}/`;  // 로컬 개발 환경
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// 카카오 SDK 초기화
export const initializeKakao = () => {
    if (!window.Kakao.isInitialized()) {
        window.Kakao.init(KAKAO_API_KEY); // 카카오 API 키 설정
    }
};

// 카카오 로그인 인증 처리
export const authorizeKakaoLogin = () => {
    // 카카오 로그인 권한 요청
    window.Kakao.Auth.authorize({
        redirectUri: REDIRECT_URI,
    });
};

// 카카오 로그인 후 access_token을 받아오는 함수
export const getKakaoToken = (code) => {
    return fetch('https://kauth.kakao.com/oauth/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'authorization_code',
            client_id: KAKAO_API_KEY,
            redirect_uri: REDIRECT_URI,
            code: code,
        }),
    })
        .then(response => response.json())
        .then(data => {
            return data.access_token; // access_token 반환
        })
        .catch(error => {
            console.error('Error fetching access token:', error);
        });
};

// access_token을 사용하여 카카오 사용자 정보 요청
export const fetchKakaoUserInfo = (accessToken) => {
    return fetch('https://kapi.kakao.com/v2/user/me', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
        .then(response => response.json())
        .then(data => {
            return data; // 사용자 정보 반환
        })
        .catch(error => {
            console.error('Error fetching user info:', error);
        });
};

// 카카오 로그아웃 처리
export const kakaoLogout = () => {
    window.Kakao.Auth.logout(() => {
        // 로그아웃 성공 시 처리
        console.log('카카오 로그아웃 성공');
        localStorage.removeItem('kakao_token');  // localStorage에서 카카오 토큰 삭제

        window.location.replace('/signin');  // 로그인 페이지로 리디렉션
    });
};

export const removeCodeFromURL = () => {
    const currentUrl = window.location.href;
    const newUrl = currentUrl.split('?')[0];  // 기존 URL에서 쿼리 매개변수 제거
    window.history.replaceState(null, null, newUrl);  // `code`가 제거된 URL로 수정
};

export const handleRedirect = () => {
    const code = new URLSearchParams(window.location.search).get('code');
    if (code) {
        // 먼저 `code`를 제거
        removeCodeFromURL();

        // `code`가 있으면 카카오 토큰을 받아와서 처리
        getKakaoToken(code)
            .then(accessToken => {
                localStorage.setItem('kakao_token', accessToken);  // access_token 저장
                return accessToken;
            })
            .then(accessToken => {
                return fetchKakaoUserInfo(accessToken);  // access_token을 사용하여 사용자 정보 요청
            })
            .then(userInfo => {
                localStorage.setItem('User-ID', userInfo.properties.nickname);
                localStorage.setItem('TMDb-Key', TMDB_API_KEY);
                console.log(`카카오 로그인 성공: ${userInfo.properties.nickname}`);
                window.location.replace('/');  // 홈 페이지로 리디렉션
            })
            .catch(error => {
                // 로그인 실패 시 알림을 방지
                alert('카카오 로그인 실패');
            });
    }
};