<script>
export default {
  props: ["cardObj"],
};
</script>

<template>
  <n-el style="margin: 1rem">
    <n-space vertical>
      <n-el>Title</n-el>
      <n-input v-model:value="cardObj.title" type="text" disabled />
      <n-el>Created</n-el>
      <n-input v-model:value="cardObj.created" type="text" disabled />
      <n-el>Content</n-el>
      <n-input v-model:value="cardObj.content" type="textarea" disabled />
    </n-space>
  </n-el>
</template>