<template>
  <n-grid cols="12" item-responsive responsive="screen">
    <n-grid-item span="1 m:1 l:1"> </n-grid-item>
    <n-grid-item span="10 m:10 l:10">
      <slot name="body"></slot>
    </n-grid-item>
    <n-grid-item span="1 m:1 l:1"> </n-grid-item>
  </n-grid>
</template>