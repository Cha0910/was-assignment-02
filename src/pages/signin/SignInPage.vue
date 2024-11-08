<template>
  <div class="sign-in-page">
    <transition name="fade-slide" mode="out-in">
      <div v-if="isLoginVisible" key="login">
        <SignIn @switch-to-signup="isLoginVisible = false" />
      </div>
      <div v-else key="signup">
        <SignUp @switch-to-login="isLoginVisible = true" />
      </div>
    </transition>
  </div>
</template>

<script>
import SignIn from './SignIn.vue';
import SignUp from './SignUp.vue';

export default {
  components: {
    SignIn,
    SignUp
  },
  data() {
    return {
      isLoginVisible: true
    };
  }
};
</script>

<style scoped>
.sign-in-page {
  max-width: 400px;
  margin: auto;
}
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.fade-slide-enter, .fade-slide-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
