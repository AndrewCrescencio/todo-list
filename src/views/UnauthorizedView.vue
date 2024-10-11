<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>
<template>
	<div class="container mx-auto grid place-content-center" style="height: calc(100dvh - 60px)">
		<p>To use the app you need to be logged in</p>
		<el-button type="primary" :tag="RouterLink" to="/login" class="text-center pb-20">Log in</el-button>
	</div>
</template>
