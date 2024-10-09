<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <el-config-provider namespace="ep">
    <header>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/user">User</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
      </nav>
    </header>
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
