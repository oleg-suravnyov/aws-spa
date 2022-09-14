<script>
export default {
  props: ["userStore"],
  emits: ["goTo"],
  methods: {
    signIn() {
      this.$emit("goTo", "/login");
    },
    signUp() {
      this.$emit("goTo", "/register");
    },
  },
};
</script>

<template>
  <n-el v-if="userStore.idToken">
    <n-space justify="end">
      <n-h4>{{ userStore.getUser().name }}</n-h4>
    </n-space>
  </n-el>
  <n-el v-else>
    <n-space justify="end">
      <n-button type="primary" @click="signIn">Login</n-button>
      <n-button @click="signUp">Sign Up</n-button>
    </n-space>
  </n-el>
</template>