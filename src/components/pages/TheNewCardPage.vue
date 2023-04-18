<script>
import TheNewCard from "../card/TheNewCard.vue";
import BaseFormPageGrid from "./layout/BaseFormPageGrid.vue";

export default {
  props: ["userStore", "cardStore"],
  components: {
    BaseFormPageGrid,
    TheNewCard,
  },
};
</script>

<template>
  <base-form-page-grid>
    <template #form>
      <n-message-provider>
        <the-new-card
          :userStore="userStore"
          :cardStore="cardStore"
        ></the-new-card>
      </n-message-provider>
    </template>
  </base-form-page-grid>
</template>