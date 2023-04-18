<script>
import TheUser from "../user/TheUser.vue";
import TheMenu from "../menu/TheMenu.vue";
import BaseHeaderGrid from "./layout/BaseHeaderGrid.vue";

export default {
  props: ["userStore"],
  emits: ["goTo"],
  components: {
    BaseHeaderGrid,
    TheUser,
    TheMenu,
  },
  methods: {
    goTo(url) {
      this.$emit("goTo", url);
    },
  },
};
</script>

<template>
  <base-header-grid>
    <template #logo> </template>
    <template #menu>
      <the-menu @goTo="goTo"></the-menu>
    </template>
    <template #user>
      <the-user @goTo="goTo" :userStore="userStore"></the-user>
    </template>
  </base-header-grid>
</template>