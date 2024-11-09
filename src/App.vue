<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import HeaderComponent from './components/header/HeaderComponent.vue';   // 헤더 컴포넌트
</script>

<template>
  <div id="app">
    <HeaderComponent /> <!-- 헤더 컴포넌트-->
    <router-view />  <!-- 라우터 뷰 컴포넌트 -->
  </div>
</template>

<style scoped>
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
