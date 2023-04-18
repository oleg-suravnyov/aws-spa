<script>
import BaseFormPageGrid from "./layout/BaseFormPageGrid.vue";
import TheRegistration from "../user/TheRegistration.vue";

export default {
  props: ["userStore"],
  components: {
    BaseFormPageGrid,
    TheRegistration,
  },
};
</script>

<template>
  <base-form-page-grid>
    <template #form>
      <n-space justify="center">
        <n-message-provider>
          <the-registration :userStore="userStore"></the-registration>
        </n-message-provider>
      </n-space>
    </template>
  </base-form-page-grid>
</template>