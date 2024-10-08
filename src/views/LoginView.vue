<template>
	<h1>Login</h1>
	<div class="inputContainer">
		<label for="email"> Email: </label>
		<input type="email" id="email" v-model="email">
	</div>

	<div class="inputContainer">
		<label for="email"> Password: </label>
		<input type="password" id="password" v-model="password">
	</div>

	<div class="inputContainer">
		<label for="firstName"> First Name </label>
		<input type="firstName" id="firstName" v-model="firstName">
	</div>

	<div class="buttonContainer">
		<button @click="createAccount"> Create </button>
		<button @click="login"> Login </button>
		<button @click="seeUser"> See user </button>
		<button @click="logout"> Logout </button>
	</div>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "../services/supabase";

let email = ref("");
let password = ref("");
let firstName = ref("");

async function createAccount() {
	const { user, error } = await supabase.auth.signUp({
		email: email.value,
		password: password.value,
		options: {
			data: {
				first_name: firstName.value
			}
		}
	})
	if (error) {
		console.log(error);
	}
	else {
		console.log(user);
	}
}

async function login() {
	console.log("login was called")
	const { data, error } = await supabase.auth.signInWithPassword({
		email: email.value,
		password: password.value
	})
	if (error) {
		console.log(error);
	}
	else {
		console.log(data);
	}
}

async function seeUser() {
	console.log('seeUser was called')
	const localUser = await supabase.auth.getSession();
	console.log(localUser.data.session, '')
}

async function logout() {
	const { error } = await supabase.auth.signOut();

	if (error) {
		console.log(error);
	}
	else {
		console.log("logged out")
	}
}
</script>

<style scoped>
.inputContainer {
	display: flex;
	flex-direction: column;
}

input {
	font-size: 1.5em;
}

.buttonContainer {
	display: flex;
	flex-direction: column;
	margin-top: 1rem;
}

button {
	margin-bottom: 1rem;
	padding: 1rem 2rem 1rem 2rem;
}
</style>