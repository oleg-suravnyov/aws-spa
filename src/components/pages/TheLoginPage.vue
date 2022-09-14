<script>
import BaseFormPageGrid from "./layout/BaseFormPageGrid.vue";
import TheLogin from "../user/TheLogin.vue";

export default {
  props: ["userStore"],
  components: {
    BaseFormPageGrid,
    TheLogin,
  },
};
</script>

<template>
  <base-form-page-grid>
    <template #form>
      <n-space justify="center">
        <n-message-provider>
          <the-login :userStore="userStore"></the-login>
        </n-message-provider>
      </n-space>
    </template>
  </base-form-page-grid>
</template>