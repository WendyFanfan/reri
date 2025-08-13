<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <div id="app">
      <router-view />
    </div>
  </n-config-provider>

</template>

<script setup lang="ts">
import { NConfigProvider, type GlobalThemeOverrides } from 'naive-ui'

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#2563eb'
  },
}

</script>

<style>
body {
  margin: 0;
  font-family: system-ui, sans-serif;
  color: #222;
}

#app {
  margin: auto;
}
</style>
