<template>
  <div class="card" id="register">
    <form @submit.prevent="handleRegister">
      <h1>Sign up</h1>
      <div class="input" :class="{'active': isRegisterEmailFocused || registerEmail}">
        <input
            id="register-email"
            type="email"
            v-model="registerEmail"
            @focus="isRegisterEmailFocused = true"
            @blur="isRegisterEmailFocused = false"
            required
        />
        <label for="register-email">Email</label>
      </div>
      <div class="input" :class="{'active': isRegisterPasswordFocused || registerPassword}">
        <input
            id="register-password"
            type="password"
            v-model="registerPassword"
            @focus="isRegisterPasswordFocused = true"
            @blur="isRegisterPasswordFocused = false"
            required
        />
        <label for="register-password">Password</label>
      </div>
      <div class="input" :class="{'active': isConfirmPasswordFocused || confirmPassword}">
        <input
            id="confirm-password"
            type="password"
            v-model="confirmPassword"
            @focus="isConfirmPasswordFocused = true"
            @blur="isConfirmPasswordFocused = false"
            required
        />
        <label for="confirm-password">Confirm Password</label>
      </div>
      <span class="checkbox remember">
        <input type="checkbox" id="terms" v-model="acceptTerms" />
        <label for="terms" class="read-text">I have read <b>Terms and Conditions</b></label>
      </span>
      <button :disabled="!isRegisterFormValid">Register</button>
    </form>
    <a href="javascript:void(0)" class="account-check" @click="$emit('toggle')">Already have an account? <b>Sign in</b></a>
  </div>
</template>

<script>
import { tryRegister } from '@/utils/Authentication.js';

export default {
  data() {
    return {
      registerEmail: '',
      registerPassword: '',
      confirmPassword: '',
    };
  },
  computed: {
    isRegisterFormValid() {
      return (
          this.registerEmail &&
          this.registerPassword &&
          this.confirmPassword &&
          this.registerPassword === this.confirmPassword
      );
    },
  },
  methods: {
    handleRegister() {
      if (this.registerPassword !== this.confirmPassword) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }

      tryRegister(
          this.registerEmail,
          this.registerPassword,
          () => {
            alert('회원가입 성공');
            this.$router.push('/signin'); // 회원가입 후 로그인 페이지로 이동
          },
          (err) => {
            alert(err.message || '회원가입 실패');
          }
      );
    },
  },
};
</script>


<style scoped>
.card {
  width: 100%;
  height: 100%;
  background-color: #fff;
  color: black;
  padding: 27px 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  backface-visibility: hidden;
  transition: transform 0.4s ease, height 0.4s ease;
}

.input {
  position: relative;
  margin-top: 1.5rem;
}

.input input {
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #9e9e9e;
  outline: none;
  width: 100%;
  height: 2.5rem;
  font-size: 1rem;
}

.input label {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  font-size: 1rem;
  transform-origin: 0% 100%;
  transform: translateY(12px);
  transition: transform 0.2s ease-out, opacity 0.2s ease-out;
}

.input.active label {
  transform: translateY(-14px) scale(0.8);
}

button {
  width: 100%;
  background-color: #2069ff;
  color: #fff;
  padding: 10px;
  border-radius: 50px;
  margin-top: 20px;
  transition: all 0.3s ease;
}

button:hover {
  box-shadow: 0px 5px 15px rgba(32, 105, 255, 0.5);
}

button:disabled {
  background-color: #d3d3d3; /* 회색 */
  color: #ffffff; /* 텍스트 색상 */
  cursor: not-allowed; /* 비활성화된 상태임을 나타내는 커서 */
  box-shadow: none; /* 그림자 제거 */
}
</style>
