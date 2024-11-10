<template>
  <div class="card" :class="{'hidden': !visible}">
    <form @submit.prevent="handleLogin">
      <h1>Sign in</h1>
      <div class="input" :class="{'active': isEmailFocused || email}">
        <input type="email" v-model="email" @focus="isEmailFocused = true" @blur="isEmailFocused = false" required />
        <label>Email</label>
      </div>
      <div class="input" :class="{'active': isPasswordFocused || password}">
        <input type="password" v-model="password" @focus="isPasswordFocused = true" @blur="isPasswordFocused = false" required />
        <label>Password</label>
      </div>
      <div class="checkbox remember">
        <input type="checkbox" v-model="rememberMe" id="remember" />
        <label for="remember">Remember me</label>
      </div>
      <button :disabled="!email || !password">Login</button>
    </form>
    <a href="javascript:void(0)" class="account-check" @click="$emit('toggle')">Don't have an account? <b>Sign up</b></a>
  </div>
</template>

<script>
import {tryLogin} from '@/utils/Authentication';

export default {
  data() {
    return {
      email: '',
      password: '',
      rememberMe: false,
      isEmailFocused: false,
      isPasswordFocused: false
    };
  },
  methods: {
    handleLogin() {
      tryLogin(
          this.email,
          this.password,
          () => {
            alert('Login successful');
            if (this.rememberMe) {
              localStorage.setItem('isLoggedIn', 'true');
            }
            this.$router.push('/');
          },
          () => {
            alert('Login failed. Please check your credentials.');
          },
          this.rememberMe
      );
    }
  }
};
</script>
