<template>
  <div class="card" id="login">
    <form @submit.prevent="handleLogin">
      <h1>Sign in</h1>
      <div class="input" :class="{'active': isEmailFocused || email}">
        <input
            id="email"
            type="email"
            v-model="email"
            @focus="isEmailFocused = true"
            @blur="isEmailFocused = false"
            required
        />
        <label for="email">Username or Email</label>
      </div>
      <div class="input" :class="{'active': isPasswordFocused || password}">
        <input
            id="password"
            type="password"
            v-model="password"
            @focus="isPasswordFocused = true"
            @blur="isPasswordFocused = false"
            required
        />
        <label for="password">Password</label>
      </div>
      <span class="checkbox remember">
        <input type="checkbox" id="remember" v-model="rememberMe" />
        <label for="remember" class="read-text"> Remember me</label>
      </span>
      <button :disabled="!isLoginFormValid">Login</button>
    </form>

    <!-- 카카오 로그인 버튼 추가 -->
    <button class="kakao-login-btn" @click="handleKakaoLogin">카카오 로그인</button>

    <div class="link-container">
      <a href="javascript:void(0)" class="account-check" @click="$emit('toggle')">Don't have an account? <b>Sign up</b></a>
      <span class="checkbox forgot">
          <a href="#">Forgot Password?</a>
      </span>
    </div>
  </div>
</template>

<script>
import { tryLogin } from '@/utils/Authentication.js';
import { initializeKakao, authorizeKakaoLogin, getKakaoToken, fetchKakaoUserInfo, handleRedirect } from '@/utils/kakao.js';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  computed: {
    isLoginFormValid() {
      return this.email && this.password;
    },
  },
  methods: {
    handleLogin() {
      tryLogin(
          this.email,
          this.password,
          () => {
            alert('로그인 성공');
            this.$router.push('/'); // 로그인 성공 시 홈 페이지로 이동
            window.location.reload();
          },
          () => {
            alert('로그인 실패. 이메일이나 비밀번호를 확인하세요.');
          }
      );
    },
    // 카카오 로그인 처리
    handleKakaoLogin() {
      initializeKakao(); // 카카오 SDK 초기화
      authorizeKakaoLogin(); // 카카오 로그인 권한 요청
    },

    // 로그인 후 리디렉션 처리
    handleRedirect() {
      handleRedirect()
    }
  },

  mounted() {
    this.handleRedirect(); // 페이지가 로드될 때 리디렉션된 경우 처리
  }
};
</script>


<style scoped>
.card {
  width: 100%;
  height: 100%;
  background-color: white;
  color: black;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  min-width: 350px;
  max-width: 350px;
  margin: auto;
  padding: 27px 30px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
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

.link-container {
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  align-items: center; /* 수평 가운데 정렬 */
  justify-content: center; /* 수직 가운데 정렬 */
}

.kakao-login-btn {
  background-color: #ffeb00;
  color: #3c1e1e;
  border: none;
  padding: 10px 20px;
  border-radius: 50px;
  margin-top: 10px;
  cursor: pointer;
}

.kakao-login-btn:hover {
  background-color: #ffcd00;
}
</style>
