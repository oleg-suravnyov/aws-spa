<template>
  <n-grid cols="12" item-responsive responsive="screen">
    <n-grid-item span="3 m:3 l:3"> </n-grid-item>
    <n-grid-item span="6 m:6 l:6">
      <slot name="form"></slot>
    </n-grid-item>
    <n-grid-item span="3 m:3 l:3"> </n-grid-item>
  </n-grid>
</template>