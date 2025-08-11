<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup lang="ts">
// 如果你已经启用 Vue Router（可选）
// 否则你可以改为直接渲染 <Home /> 组件：
</script>

<style>
body {
  margin: 0;
  font-family: system-ui, sans-serif;
  color: #222;
}

#app {
  margin: auto;
  padding: 1rem;
}
</style>
