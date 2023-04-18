<script>
import { useMessage } from "naive-ui";
export default {
  props: ["userStore", "cardStore"],
  setup() {
    const message = useMessage();
    return { message };
  },
  data() {
    return {
      cardObj: {
        title: undefined,
        content: undefined,
        created: undefined,
      },
      error: {
        title: false,
      },
      loading: false,
    };
  },
  methods: {
    async create() {
      console.log("[TheNewCard.create]", this.cardObj);

      if (!this.cardObj.title) {
        this.error.title = true;
        return;
      }

      this.cardObj.created = Math.round(Date.now() / 1000);

      this.loading = true;

      const result = await this.cardStore.create(this.cardObj);
      if (result) {
        this.message.success("Card created successfully!");
      } else {
        this.message.error("Failed to create the card!");
      }

      this.loading = false;
    },
    input() {
      if (this.cardObj.title) {
        this.error.title = false;
      }
    },
  },
};
</script>

<template>
  <n-el style="margin: 1rem">
    <n-space vertical>
      <n-el>Title</n-el>
      <n-input
        clearable
        :status="error.title ? 'error' : ''"
        :on-input="input"
        v-model:value="cardObj.title"
        type="text"
        placeholder="Title"
      />
      <n-el>Content</n-el>
      <n-input
        clearable
        v-model:value="cardObj.content"
        type="textarea"
        placeholder="Content"
      />
    </n-space>
    <n-space justify="center">
      <n-button
        :disabled="userStore.idToken ? false : true"
        style="margin-top: 1rem"
        :loading="loading"
        type="primary"
        @click="create"
        >Create</n-button
      >
    </n-space>
  </n-el>
</template>