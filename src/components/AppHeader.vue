<script lang="ts" setup>
import { toggleDark } from '@/composables/dark';
import { useAuth } from '@/composables/useAuth';
import { useStoreUser } from '@/stores/user';
import { ElMessage, ElMessageBox } from 'element-plus';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
const { handleLogout } = useAuth();
const store = useStoreUser()
const { userSession } = storeToRefs(store)
const { push } = useRouter()
const logOut = () => {

  ElMessageBox.confirm(
    'You will need to log back in to access your tasks.',
    'Log out of your account?',
    {
      confirmButtonText: 'Log out',
      confirmButtonClass: 'ep-button--danger',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(async () => {
      await handleLogout()
      push('/')
      ElMessage({
        type: 'success',
        message: 'Logged out, cya',
      })
    })
    .catch(() => { })
}
</script>

<template>

  <el-menu class="fixed top-0 left-0 w-screen" mode="horizontal" router
    style="background-color: var(--ep-bg-color) !important; z-index: 12;">
    <el-menu-item index="/todos">
      Todos
    </el-menu-item>
    <el-menu-item h="full" @click="toggleDark()">
      <button class="border-none w-full bg-transparent cursor-pointer" style="height: var(--ep-menu-item-height)">
        <i inline-flex i="dark:ep-moon ep-sunny" />
      </button>
    </el-menu-item>
    <el-menu-item h="full" @click="logOut()" v-if="userSession?.user">
      <button class="border-none w-full bg-transparent cursor-pointer" style="height: var(--ep-menu-item-height)">
        <i inline-flex i="dark:ep-switch-button ep-switch-button" />
      </button>
    </el-menu-item>
  </el-menu>
</template>