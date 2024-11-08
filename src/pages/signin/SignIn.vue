<template>
  <div class="signin-page">
    <form @submit.prevent="handleLogin">
      <h1>Sign In</h1>
      <div class="input">
        <input type="email" v-model="email" placeholder="Email" required />
      </div>
      <div class="input">
        <input type="password" v-model="password" placeholder="Password" required />
      </div>
      <button type="submit">Sign In</button>
      <p>Don't have an account? <button @click="$emit('switch-to-signup')">Sign Up</button></p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    handleLogin() {
      // 로그인 로직 구현 (예: API 호출 또는 로컬 스토리지 인증)
      if (this.email && this.password) {
        alert('Login successful!');
      } else {
        alert('Please enter your email and password.');
      }
    }
  }
};
</script>

<style scoped>
.signin-page {
  max-width: 400px;
  margin: auto;
}
.input {
  margin-bottom: 1rem;
}
button {
  display: block;
  width: 100%;
}
</style>
