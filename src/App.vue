<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <el-config-provider namespace="ep">
    <AppHeader />
    <RouterView />
  </el-config-provider>
</template>

<style>
#app {  
  color: var(--ep-text-color-primary);
}
nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}
</style>
