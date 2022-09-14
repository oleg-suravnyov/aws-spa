<script>
import { useMessage } from "naive-ui";
export default {
  props: ["userStore"],
  setup() {
    const message = useMessage();
    return { message };
  },
  data() {
    return {
      user: {
        login: undefined,
        pass: undefined,
        email: undefined,
        phone: undefined,
        verifyPass: undefined,
      },
      error: {
        login: false,
        pass: false,
        email: false,
      },
      loading: false,
    };
  },
  methods: {
    async signUp() {
      console.log("[TheRegistration.signUp]", this.user);

      if (!this.user.login) {
        this.error.login = true;
        return;
      }
      if (!this.user.pass) {
        this.error.pass = true;
        return;
      }
      if (!this.user.email) {
        this.error.email = true;
        return;
      }

      this.loading = true;

      const result = await this.userStore.signUp(this.user);
      if (result) {
        this.message.success(
          "Signed Up Successfully! Please wait for activation."
        );
      } else {
        this.message.error("Failed to Sign Up!");
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
      if (this.user.email) {
        this.error.email = false;
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
        :on-input="input"
        v-model:value="user.login"
        type="text"
        placeholder="Login Name"
      />
      <n-el>Email</n-el>
      <n-input
        clearable
        :status="error.email ? 'error' : ''"
        :on-input="input"
        v-model:value="user.email"
        type="text"
        placeholder="Email"
      />
      <n-el>Password</n-el>
      <n-input
        clearable
        :status="error.pass ? 'error' : ''"
        :on-input="input"
        v-model:value="user.pass"
        type="password"
        show-password-on="mousedown"
        placeholder="Password"
      />
      <n-el>Confirm Password</n-el>
      <n-input
        clearable
        v-model:value="user.verifyPass"
        type="password"
        :status="user.pass == user.verifyPass ? 'success' : 'error'"
        show-password-on="mousedown"
        placeholder="Confirm Password"
      />
    </n-space>
    <n-space justify="center">
      <n-button
        style="margin-top: 1rem"
        :loading="loading"
        type="primary"
        @click="signUp"
        >Sign Up</n-button
      >
    </n-space>
  </n-el>
</template>