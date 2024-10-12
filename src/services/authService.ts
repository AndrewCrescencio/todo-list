import { supabase } from "@/services/supabase";
import { Session } from "@supabase/supabase-js";
import type { Credentials } from "@/models/credentials";
import { APP_BASE_URL } from "@/constants";

export function authService() {
  async function getUserSession(): Promise<Session | null> {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching user session:", error);
        return null;
      }
      return data.session || null;
    } catch (err) {
      console.error("Unknown problem fetching user session", err);
      return null;
    }
  }

  async function getUserId(): Promise<string | null> {
    const session = await getUserSession();
    return session?.user?.id || null;
  }

  async function login(credentials: Credentials) {
    return await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });
  }

  async function signUp(credentials: Credentials) {
    return await supabase.auth.signUp(credentials);
  }

  async function signOut() {
    return await supabase.auth.signOut();
  }

  async function recoverPasswordForEmail(email: string) {
    return await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${APP_BASE_URL}/reset-password`,
    });
  }

  async function resetPassword(newPassword: string) {
    return await supabase.auth.updateUser({
      password: newPassword,
    });
  }

  return {
    getUserSession,
    getUserId,
    login,
    signUp,
    signOut,
    recoverPasswordForEmail,
    resetPassword,
  };
}
