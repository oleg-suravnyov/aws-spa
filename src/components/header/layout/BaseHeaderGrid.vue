<template>
  <n-grid style="margin: 2rem 0" cols="12" item-responsive responsive="screen">
    <n-grid-item span="1 m:1 l:1"></n-grid-item>
    <n-grid-item span="3 m:3 l:3">
      <slot name="logo"></slot>
    </n-grid-item>
    <n-grid-item span="4 m:4 l:4">
      <slot name="menu"></slot>
    </n-grid-item>
    <n-grid-item span="3 m:3 l:3">
      <slot name="user"></slot>
    </n-grid-item>
    <n-grid-item span="1 m:1 l:1"></n-grid-item>
  </n-grid>
</template>