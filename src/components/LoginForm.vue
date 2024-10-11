<script setup>
import { reactive, ref } from "vue";
import { supabase } from "../services/supabase";
import { useAuth } from "@/composables/useAuth";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

const { handleLogin, handleLogout, handleForgotPassword } = useAuth();

const { push } = useRouter()

const form = reactive({
	email: '',
	password: '',
	firstName: ''
})

let isLogin = ref(true);

const toggleIsLogin = () => isLogin.value = !isLogin.value

const onSubmit = async () => {
	isLogin.value ? await login() : await createAccount()
}

async function createAccount() {
	const { user, error } = await supabase.auth.signUp({
		email: form.email,
		password: form.password,
		options: {
			data: {
				first_name: form.firstName
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
	try {
		const { data, error } = await handleLogin({ email: form.email, password: form.password })
		if (!error) {
			ElMessage({
				type: 'success',
				message: 'Logged In',
			})
			await push('/todos')
		}
	} catch (e) {
		console.error(e)
	}
}

async function logout() {
	const { error } = await handleLogout();
	if (error) {
		console.error("Logout error:", error);
	} else {
		ElMessage.info("Logged out!");
	}
}
</script>
<template>
	<el-form :model="form" v-bind="$attrs">
		<el-form-item>
			<el-input v-model.trim="form.email" type="email" maxlength="320" required placeholder="Email"
				aria-label="email password field" autocomplete="on" />
		</el-form-item>
		<el-form-item>
			<el-input v-model="form.password" type="password" minlength="8" maxlength="500" required
				placeholder="Password" aria-label="form password field" />
			<p v-if="isLogin" class="my-0" @click="handleForgotPassword">forgot password</p>
		</el-form-item>
		<el-form-item v-if="!isLogin">
			<el-input v-model.trim="form.firstName" type="text" maxlength="64" required placeholder="First Name"
				aria-label="First name for the registration form" />
		</el-form-item>
		<el-form-item>
			<el-button type="primary" class="w-full" @click="onSubmit" aria-label="confirmation button">
				{{ isLogin ? 'Log In' : 'Create new account' }}
			</el-button>
		</el-form-item>

		<el-form-item>
			<p class="text-center w-full mt-0">
				{{
					isLogin ? "Don't have an account?" : 'Already have an account?'
				}}
			</p>
			<el-button @click="toggleIsLogin" type="info" class="w-full"
				:aria-label="isLogin ? 'Create new account' : 'Log In'">
				{{ isLogin ? 'Create new account' : 'Log In' }}
			</el-button>
		</el-form-item>
	</el-form>
</template>