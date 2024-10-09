<script lang="ts" setup>
import { toggleDark } from '@/composables/dark';
</script>

<template>
  <el-menu class="el-menu-demo" mode="horizontal" router>
    <el-menu-item index="/">
      Home
    </el-menu-item>
    <el-menu-item index="/login">
      Login
    </el-menu-item>
    <el-menu-item index="/todos">
      Todos
    </el-menu-item>
    <el-menu-item h="full" @click="toggleDark()">
      <button class="border-none w-full bg-transparent cursor-pointer" style="height: var(--ep-menu-item-height)">
        <i inline-flex i="dark:ep-moon ep-sunny" />
      </button>
    </el-menu-item>
  </el-menu>
</template>
<style>
.el-menu--horizontal>.el-menu-item:last-child {
  margin-left: auto;
}
</style>