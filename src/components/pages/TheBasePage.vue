<script>
import BasePageGrid from "./layout/BasePageGrid.vue";
import TheHeader from "../header/TheHeader.vue";
import TheCardLandingPage from "../pages/TheCardLandingPage.vue";
import TheNewCardPage from "../pages/TheNewCardPage.vue";
import TheLoginPage from "../pages/TheLoginPage.vue";
import TheRegistrationPage from "../pages/TheRegistrationPage.vue";
import { useUserStore } from "../../stores/user-store";
import { useCardStore } from "../../stores/card-store";

export default {
  components: {
    BasePageGrid,
    TheHeader,
    TheCardLandingPage,
    TheNewCardPage,
    TheLoginPage,
    TheRegistrationPage,
  },
  setup() {
    const userStore = useUserStore();
    userStore.init();

    const cardStore = useCardStore();
    cardStore.init(userStore);

    return { userStore, cardStore };
  },
  beforeMount() {
    this.url = location.pathname;
  },
  data() {
    return {
      url: undefined,
    };
  },
  methods: {
    goTo(url) {
      console.log("[TheBasePage.goTo]", url);
      this.url = url;
    },
    getPage() {
      if (this.url == "/register") {
        return TheRegistrationPage;
      }
      if (!this.userStore.idToken || this.url == "/login") {
        return TheLoginPage;
      }
      if (this.url == "/" || this.url == "/card/all") {
        return TheCardLandingPage;
      }
      if (this.url == "/card/new") {
        return TheNewCardPage;
      }
    },
  },
};
</script>

<template>
  <base-page-grid>
    <template #header>
      <the-header @goTo="goTo" :userStore="userStore"></the-header>
    </template>
    <template #body>
      <component
        @goTo="goTo"
        :is="getPage()"
        :userStore="userStore"
        :cardStore="cardStore"
      >
      </component>
    </template>
  </base-page-grid>
</template>