<template>
  <div class="card" :class="{'hidden': !visible}">
    <form @submit.prevent="handleRegister">
      <h1>Sign up</h1>
      <div class="input" :class="{'active': isRegisterEmailFocused || registerEmail}">
        <input type="email" v-model="registerEmail" @focus="isRegisterEmailFocused = true" @blur="isRegisterEmailFocused = false" required />
        <label>Email</label>
      </div>
      <div class="input" :class="{'active': isRegisterPasswordFocused || registerPassword}">
        <input type="password" v-model="registerPassword" @focus="isRegisterPasswordFocused = true" @blur="isRegisterPasswordFocused = false" required />
        <label>Password</label>
      </div>
      <div class="input" :class="{'active': isConfirmPasswordFocused || confirmPassword}">
        <input type="password" v-model="confirmPassword" @focus="isConfirmPasswordFocused = true" @blur="isConfirmPasswordFocused = false" required />
        <label>Confirm Password</label>
      </div>
      <div class="checkbox remember">
        <input type="checkbox" v-model="acceptTerms" id="terms" />
        <label for="terms">I have read <b>Terms and Conditions</b></label>
      </div>
      <button :disabled="!isRegisterFormValid">Register</button>
    </form>
    <a href="javascript:void(0)" class="account-check" @click="$emit('toggle')">Already have an account? <b>Sign in</b></a>
  </div>
</template>

<script>
import { tryRegister } from '@/utils/Authentication';

export default {
  data() {
    return {
      registerEmail: '',
      registerPassword: '',
      confirmPassword: '',
      acceptTerms: false,
      isRegisterEmailFocused: false,
      isRegisterPasswordFocused: false,
      isConfirmPasswordFocused: false
    };
  },
  computed: {
    isRegisterFormValid() {
      return this.registerEmail && this.registerPassword && this.confirmPassword && this.registerPassword === this.confirmPassword && this.acceptTerms;
    }
  },
  methods: {
    handleRegister() {
      tryRegister(
          this.registerEmail,
          this.registerPassword,
          () => {
            alert('Registration successful');
            this.$emit('toggle'); // 회원가입 후 로그인 페이지로 전환
          },
          (err) => {
            alert(`Registration failed: ${err.message}`);
          }
      );
    }
  }
};
</script>
