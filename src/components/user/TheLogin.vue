<script>
import { useMessage } from "naive-ui";
export default {
  props: ["userStore"],
  emits: ["goTo"],
  setup() {
    const message = useMessage();
    return { message };
  },
  data() {
    return {
      user: { login: undefined, pass: undefined },
      loading: false,
      error: { login: false, pass: false },
    };
  },
  methods: {
    async signIn() {
      console.log("[TheLogin.signIn]", this.user);

      if (!this.user.login) {
        this.error.login = true;
        return;
      }
      if (!this.user.pass) {
        this.error.pass = true;
        return;
      }

      this.loading = true;

      const result = await this.userStore.signIn(this.user);
      if (result) {
        this.message.success("You're Signed In!");
        this.$emit("goTo", "/");
      } else {
        this.message.error("Failed to Sign In!");
      }

      this.loading = false;
    },
    input() {
      if (this.user.login) {
        this.error.login = false;
      }
      if (this.user.pass) {
        this.error.pass = false;
      }
    },
  },
};
</script>

<template>
  <n-el style="margin: 1rem">
    <n-space vertical>
      <n-el>Login</n-el>
      <n-input
        clearable
        :status="error.login ? 'error' : ''"
        v-model:value="user.login"
        type="text"
        placeholder="Login"
        :on-input="input"
      />
      <n-el>Password</n-el>
      <n-input
        clearable
        :status="error.pass ? 'error' : ''"
        v-model:value="user.pass"
        type="password"
        show-password-on="mousedown"
        placeholder="Password"
        :on-input="input"
      />
    </n-space>
    <n-space justify="center">
      <n-button
        style="margin-top: 1rem"
        :loading="loading"
        type="primary"
        @click="signIn"
        >Sign In</n-button
      >
    </n-space>
  </n-el>
</template>