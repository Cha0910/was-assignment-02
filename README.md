
# WAS Assignment 02, 04

## 프로젝트 설명
Vue.js를 사용하여 Single Page Application으로 제작된 Front-End Demo site입니다.

04 카카오 로그인 기능을 추가하였습니다.
## 기술 스택
- **프론트엔드**: Vue.js (^3.5.12), Vue Router (^4.4.5)
- **스타일링**: FontAwesome Free (^6.6.0)
- **HTTP 클라이언트**: Axios (^1.7.7)
- **API**: TMDB API
- **배포**: GitHub Pages
[배포된 사이트 보기](https://Cha0910.github.io/was-assignment-02/)

## 설치 및 실행 가이드
### 1. 설치
프로젝트를 클론합니다.

```bash
git clone https://github.com/Cha0910/was-assignment-02.git
```

패키지를 설치합니다.

```bash
npm install
```

### 2. 실행
개발 서버를 실행하려면 다음 명령어를 사용하세요:

```bash
npm run dev
```

배포용 빌드를 생성하려면 다음 명령어를 사용하세요:

```bash
npm run build
```



## 프로젝트 구조
```
📦was-assignment-02
 ┣ 📂dist                               # 빌드 결과물
 ┣ 📂src                                # 소스 디렉토리
 ┃ ┣ 📂assets
 ┃ ┣ 📂components                       # Vue 컴포넌트
 ┃ ┃ ┣ 📂header                         # 헤더 컴포넌트
 ┃ ┃ ┃ ┗ 📜HeaderComponent.vue
 ┃ ┃ ┣ 📂home                           # 홈 관련 컴포넌트
 ┃ ┃ ┃ ┣ 📜BannerComponent.vue          # 배너 컴포넌트
 ┃ ┃ ┃ ┗ 📜MovieRowComponent.vue        # 슬라이더 컴포넌트
 ┃ ┃ ┣ 📂search                         # 검색 기능 컴포넌트
 ┃ ┃ ┃ ┗ 📜search.vue
 ┃ ┃ ┣ 📂signin                         # 로그인 및 회원가입 관련 컴포넌트
 ┃ ┃ ┃ ┣ 📜signin.vue                   # 로그인 컴포넌트
 ┃ ┃ ┃ ┗ 📜signup.vue                   # 회원가입 컴포넌트
 ┃ ┃ ┗ 📂views                          # 뷰 관련 컴포넌트
 ┃ ┃ ┃ ┣ 📜InfiniteScrollView.vue       # 무한 스크롤 뷰 컴포넌트
 ┃ ┃ ┃ ┗ 📜TableView.vue                # 테이블 뷰 컴포넌트
 ┃ ┣ 📂pages                            # 각 페이지 별 Vue 파일
 ┃ ┃ ┣ 📂home                           # 홈 페이지
 ┃ ┃ ┃ ┗ 📜HomePage.vue
 ┃ ┃ ┣ 📂popular                        # 추천 페이지
 ┃ ┃ ┃ ┗ 📜PopularPage.vue
 ┃ ┃ ┣ 📂search                         # 검색 페이지
 ┃ ┃ ┃ ┗ 📜SearchPage.vue
 ┃ ┃ ┣ 📂signin                         # 로그인 및 회원가입 페이지
 ┃ ┃ ┃ ┗ 📜SignInPage.vue
 ┃ ┃ ┗ 📂wishlist                       # 위시리스트 페이지
 ┃ ┃ ┃ ┗ 📜WishListPage.vue
 ┃ ┣ 📂router                           # Vue 라우터 설정
 ┃ ┃ ┗ 📜index.js
 ┃ ┣ 📂utils                            # 기능 관련 JS
 ┃ ┃ ┣ 📜Authentication.js
 ┃ ┃ ┣ 📜authGuard.js
 ┃ ┃ ┣ 📜kakao.js
 ┃ ┃ ┣ 📜URL.js
 ┃ ┃ ┗ 📜useWishlist.js
 ┃ ┣ 📜App.vue
 ┃ ┗ 📜main.js
 ┗ 📜README.md                          # 프로젝트 설명