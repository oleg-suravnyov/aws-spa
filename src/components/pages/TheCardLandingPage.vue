<script>
import TheCardList from "../card/TheCardList.vue";
import BaseLandingPageGrid from "./layout/BaseLandingPageGrid.vue";

export default {
  props: ["userStore", "cardStore"],
  components: {
    BaseLandingPageGrid,
    TheCardList,
  },
};
</script>

<template>
  <base-landing-page-grid>
    <template #body>
      <the-card-list
        :userStore="userStore"
        :cardStore="cardStore"
      ></the-card-list>
    </template>
  </base-landing-page-grid>
</template>