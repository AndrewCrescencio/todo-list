<template>
  <div class="about" v-if="account">
    <h1>Account Page</h1>
	<p> Account email: {{  account.data.session.user.email  }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "../services/supabase"; 

const account = ref();

async function getSession() {
	account.value = await supabase.auth.getSession();
	console.log(account.value)
}

getSession();
</script>
