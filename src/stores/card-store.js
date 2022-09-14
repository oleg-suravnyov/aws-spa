import { defineStore } from "pinia";
import axios from "axios";

export const useCardStore = defineStore("cardStore", {
  state: () => ({
    store: { user: undefined },
    baseUrl: "<to be replaced API URL>",
    api: {
      create: "/card/new",
      readAll: "/card/all",
    },
    cards: [],
    ready: false,
  }),
  actions: {
    init(userStore) {
      this.$reset();
      this._init(userStore);
    },
    async create(newCard) {
      console.log("[CardStore.create]", newCard);

      try {
        const response = await axios.post(
          this.baseUrl + this.api.create,
          newCard,
          {
            headers: { Authorization: this.store.user.idToken },
          }
        );
        console.log("[CardStore.create]", response);
        return response.status == 200;
      } catch (e) {
        console.log("[CardStore.create]", e);
      }
      return false;
    },
    async readAll(reload = true) {
      console.log("[CardStore.readAll]", "reload", reload);

      if (!reload) {
        return this.cards;
      }

      try {
        const response = await axios.get(this.baseUrl + this.api.readAll, {
          headers: { Authorization: this.store.user.idToken },
        });
        console.log("[CardStore.readAll]", response);
        this.cards = response.data;
        return this.cards;
      } catch (e) {
        console.log("[CardStore.readAll]", e);
      }
    },
    _init(userStore) {
      this.store.user = userStore;
      const patch = {};
      patch.ready = true;
      this.$patch(patch);
    },
  },
});
