<template>
  <div class="signin-page">
    <div class="bg-image"></div>
    <div class="container">
      <div id="phone">
        <div id="content-wrapper">
          <signin v-if="isLoginVisible" @login="handleLogin" @toggle="toggleCard" />
          <signup v-else @register="handleRegister" @toggle="toggleCard" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import signin from '@/components/signin/signin.vue';
import signup from '@/components/signin/signup.vue';

export default {
  components: {
    signin,
    signup,
  },
  data() {
    return {
      isLoginVisible: true,
    };
  },
  methods: {
    toggleCard() {
      this.isLoginVisible = !this.isLoginVisible;
    },
    handleLogin() {
      alert('Login logic handled');
    },
    handleRegister() {
      alert('Register logic handled');
    },
  },
};
</script>

<style scoped>
.signin-page {
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.bg-image {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #000;
  z-index: -1;
}

.container {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

#phone {
  width: 50vw;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
