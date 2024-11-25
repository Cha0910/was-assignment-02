<script setup>
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import HeaderComponent from './components/header/HeaderComponent.vue';   // 헤더 컴포넌트
</script>

<template>
  <div id="app">
    <HeaderComponent /> <!-- 헤더 컴포넌트-->
    <router-view />  <!-- 라우터 뷰 컴포넌트 -->
  </div>
</template>

<style scoped>
#app {
  background-color: #141414; /* 검은색 배경 */
  min-height: 100vh; /* 전체 페이지 높이 설정 */
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
