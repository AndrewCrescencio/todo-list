<script setup lang="ts">
import { computed } from 'vue';
import { RouterView, useRoute } from 'vue-router'

const route = useRoute();

const hideAppHeader = computed(() => route.meta.hideAppHeader)
</script>

<template>
  <el-config-provider namespace="ep" :z-index="3000" >
    <AppHeader v-if="!hideAppHeader"/>
    <RouterView />
  </el-config-provider>
</template>

<style>
* {
  box-sizing: border-box;
}
body {
  padding-top: 60px;
  scroll-padding-top: 60px;

}
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
