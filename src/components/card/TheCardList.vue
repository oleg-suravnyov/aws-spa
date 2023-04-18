<script>
import { h } from "vue";
import TheCard from "./TheCard.vue";

export default {
  props: ["cardStore", "userStore"],
  components: {
    TheCard,
  },
  data() {
    return {
      loading: false,
      cards: [],
      filtered: [],
      modal: { show: false, card: undefined },
    };
  },
  beforeMount() {
    if (this.userStore.idToken) {
      this.init();
    } else {
      this.userStore.$subscribe((mutation) => {
        if (mutation.payload && mutation.payload.idToken) {
          this.init();
        }
      });
    }
  },
  methods: {
    async init(reload = false) {
      this.cards = [];
      this.loading = true;

      console.log("[TheCardList.init]", this.cardStore.cards.length);
      if (!reload && !this.cardStore.cards.length) {
        reload = true;
      }

      const cards = await this.cardStore.readAll(reload);

      for (const cardObj of cards) {
        this.cards.push({
          title: cardObj.title,
          created: new Date(cardObj.created * 1000).toLocaleString(),
          content: cardObj.content,
        });
      }

      console.log("[TheCardList.init]", this.cards);

      this.filtered = this.cards;

      this.loading = false;
    },
    reload() {
      this.init(true);
    },
    search(key) {
      console.log("[TheCardList.search]", key);
      if (!key) {
        this.filtered = this.cards;
      }
      key = key.toLowerCase();
      this.filtered = this.cards.filter((cardObj) => {
        for (const value of Object.values(cardObj)) {
          if (String(value).toLowerCase().includes(key)) {
            return true;
          }
        }
        return false;
      });
    },
    title(cardObj) {
      return h(
        "div",
        {
          onClick: () => this.showCard(cardObj),
        },
        [cardObj.title]
      );
    },
    showCard(cardObj) {
      console.log("[TheCardList.showCard]", cardObj);
      this.modal.show = true;
      this.modal.card = cardObj;
    },
  },
};
</script>

<template>
  <n-space>
    <n-button
      :loading="loading"
      style="margin-bottom: 1rem"
      secondary
      @click="reload"
      >Refresh</n-button
    >
    <n-input clearable :on-input="search" placeholder="Search" />
  </n-space>
  <n-space justify="center">
    <n-progress
      v-show="loading"
      style="margin: 2rem 0"
      type="circle"
      :percentage="loading.run"
    >
      <span style="text-align: center">Loading...</span></n-progress
    >
  </n-space>
  <n-data-table
    v-show="!loading"
    :pagination="{ pageSize: 10 }"
    :data="filtered"
    :columns="[
      {
        title: 'Title',
        key: 'title',
        render(row) {
          return title(row);
        },
      },
      { title: 'Created', key: 'created' },
    ]"
  >
  </n-data-table>
  <n-modal v-model:show="modal.show">
    <n-el style="width: 420px; background-color: white">
      <the-card :cardObj="modal.card" />
    </n-el>
  </n-modal>
</template>