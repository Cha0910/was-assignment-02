<template>
  <div class="signin-page">
    <div class="bg-image"></div>
    <div class="container">
      <div id="phone">
        <div id="content-wrapper">
          <transition name="flip" mode="out-in">
            <signin v-if="isLoginVisible" @login="handleLogin" @toggle="toggleCard" />
            <signup v-else @register="handleRegister" @toggle="toggleCard" />
          </transition>
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
    }
  },
};
</script>

<style scoped>
.signin-page {
  position: relative;
  width: 100%;
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

.flip-enter-active,
.flip-leave-active {
  transition: transform 0.4s ease-in-out;
  transform-style: preserve-3d;
}

.flip-enter {
  transform: rotateY(-360deg);
}

.flip-leave-to {
  transform: rotateY(360deg);
}

#phone {
  width: 50vw;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
