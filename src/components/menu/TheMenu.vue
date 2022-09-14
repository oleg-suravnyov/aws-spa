<script>
export default {
  emits: ["goTo"],
  methods: {
    newCard() {
      this.$emit("goTo", "/card/new");
    },
    allCards() {
      this.$emit("goTo", "/card/all");
    },
  },
};
</script>

<template>
  <n-space justify="center">
    <n-button class="menu" @click="newCard" quaternary type="primary">
      New Card
    </n-button>
    <n-button class="menu" @click="allCards" quaternary type="primary">
      All Cards
    </n-button>
  </n-space>
</template>

<style scoped>
.menu {
  margin: 0 2rem;
}
</style>