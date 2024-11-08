<template>
  <div class="signup-page">
    <form @submit.prevent="handleSignUp">
      <h1>Sign Up</h1>
      <div class="input">
        <input type="email" v-model="email" placeholder="Email" required />
      </div>
      <div class="input">
        <input type="password" v-model="password" placeholder="Password" required />
      </div>
      <div class="input">
        <input type="password" v-model="confirmPassword" placeholder="Confirm Password" required />
      </div>
      <button type="submit">Sign Up</button>
      <p>Already have an account? <button @click="$emit('switch-to-login')">Sign In</button></p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: ''
    };
  },
  methods: {
    handleSignUp() {
      if (this.password !== this.confirmPassword) {
        alert('Passwords do not match.');
        return;
      }
      // 회원가입 로직 구현 (예: 사용자 데이터 로컬 스토리지에 저장)
      alert('Sign up successful!');
      this.$emit('switch-to-login');
    }
  }
};
</script>

<style scoped>
.signup-page {
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
