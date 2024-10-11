import { acceptHMRUpdate, defineStore } from "pinia";
import { onMounted, ref } from "vue";
import { authService } from "@/services/authService";
import type { Session } from "@supabase/supabase-js";

export const useStoreUser = defineStore("user", () => {
  const userSession = ref<Session>();

  onMounted(async () => {
    const session = await authService().getUserSession();
    if (session) userSession.value = session;
  });
  return {
    userSession,
  };
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useStoreUser, import.meta.hot));
