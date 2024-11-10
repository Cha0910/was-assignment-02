<template>
  <div>
    <div class="bg-image"></div>
    <div class="container">
      <div id="phone">
        <div id="content-wrapper">
          <transition name="fade">
            <signin v-if="isLoginVisible" @toggle="toggleCard" />
            <signup v-else @toggle="toggleCard" />
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
    signup
  },
  data() {
    return {
      isLoginVisible: true
    };
  },
  methods: {
    toggleCard() {
      this.isLoginVisible = !this.isLoginVisible;
    }
  }
};
</script>
