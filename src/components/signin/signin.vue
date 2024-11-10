<template>
  <div class="card" id="login">
    <form @submit.prevent="$emit('login')">
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
        <label for="remember" class="read-text">Remember me</label>
      </span>
      <span class="checkbox forgot">
        <a href="#">Forgot Password?</a>
      </span>
      <button :disabled="!isLoginFormValid">Login</button>
    </form>
    <a href="javascript:void(0)" class="account-check" @click="$emit('toggle')">Don't have an account? <b>Sign up</b></a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      rememberMe: false,
      isEmailFocused: false,
      isPasswordFocused: false,
    };
  },
  computed: {
    isLoginFormValid() {
      return this.email && this.password;
    },
  },
};
</script>

<style scoped>
.card {
  border-radius: 10px;
  background-color: #fff;
  padding: 27px 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  margin: auto;
  transition: all 0.3s ease;
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
</style>
