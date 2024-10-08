<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/user">User</RouterLink>
      <RouterLink to="/login">Login</RouterLink>
    </nav>
  </header>
  <RouterView />
</template>

<style scoped>
nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}
</style>
