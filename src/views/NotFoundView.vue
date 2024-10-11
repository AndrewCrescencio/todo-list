<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
    <div class="container mx-auto grid place-content-center text-center" style="height: calc(100dvh - 60px)">
        <h1 class="mb-0">Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <el-button type="primary" :tag="RouterLink" to="/" class="text-center pb-20">Home page</el-button>
    </div>
</template>