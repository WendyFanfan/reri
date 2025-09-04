<template>
  <n-config-provider :theme-overrides="themeOverrides" :locale="locale" :date-locale="dateLocale">
    <div id="app">
      <router-view />
    </div>
  </n-config-provider>

</template>

<script setup lang="ts">
import { NConfigProvider, type GlobalThemeOverrides } from 'naive-ui'
import type { NDateLocale, NLocale } from 'naive-ui'
// import { dateZhCN, zhCN } from 'naive-ui'
import { ref } from 'vue'

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#2563eb',
    primaryColorHover: '#1e40af',
  },
  
}

const locale = ref<NLocale | null>(null)
const dateLocale = ref<NDateLocale | null>(null)

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
