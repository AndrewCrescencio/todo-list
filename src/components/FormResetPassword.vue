<script setup>
import { reactive, ref } from "vue";
import { supabase } from "../services/supabase";
import { useAuth } from "@/composables/useAuth";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

const { handleLogin, handleLogout, handleForgotPassword, handleResetPassword, } = useAuth();

const { push } = useRouter()

const form = reactive({
	email: '',
	password: '',
})

const onSubmit = () => {
	handleResetPassword(form.password)
	push('/login')
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
				placeholder="New Password" aria-label="form password field" />
		</el-form-item>

		<el-form-item>
			<el-button type="primary" class="w-full" @click="onSubmit" aria-label="confirmation button">
				Update
			</el-button>
		</el-form-item>
	</el-form>
</template>