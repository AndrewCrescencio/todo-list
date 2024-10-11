import { Credentials } from "@/models/credentials";
import { useStoreUser } from "@/stores/user";
import { storeToRefs } from "pinia";

import { ElMessage, ElMessageBox } from "element-plus";
import { authService } from "@/services/authService";

export function useAuth() {
  const userStore = useStoreUser();
  const { userSession } = storeToRefs(userStore);

  async function handleLogin(credentials: Credentials) {
    try {
      const { data, error } = await authService().login({
        email: credentials.email,
        password: credentials.password,
      });
      if (error) {
        console.error("Error thrown:", error);
        //TODO: - mostrar mensagem de erro para o usuário com notify
        alert("Error logging in: " + error.message);
        return {
          data: null,
          error,
        };
      }
      userSession.value = data.session;
      return { data, error: null };
    } catch (error) {
      console.error("Error thrown:", error);
      return {
        data: null,
        error,
      };
    }
  }

  async function handleSignup(credentials: Credentials) {
    try {
      const { email, password } = credentials;
      if (!email || !password) {
        alert("Please provide both your email and password.");
        return;
      }
      const { data, error } = await authService().signUp({ email, password });
      if (error) {
        alert(error.message);
        console.error(error, error.message);
        return { data: null, error };
      }
      alert("Signup successful, confirmation mail should be sent soon!");
      return { data, error: null };
    } catch (err) {
      alert("Fatal error signing up");
      console.error("signup error", err);
    }
  }

  async function handleLogout() {
    try {
      const { error } = await authService().signOut();

      if (error) {
        alert("Error signing out");
        console.error("Error", error);
        return { error };
      }
      return { error: null };

      alert("You have signed out!");
      ElMessage.info("Logged out!");
    } catch (err) {
      alert("Unknown error signing out");
      console.error("Error", err);
    }
  }

  const handleForgotPassword = () => {
    ElMessageBox.prompt("Please input your e-mail", "Reset Password", {
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      inputPattern:
        /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
      inputErrorMessage: "Invalid Email",
    })
      .then(async ({ value }) => {
        try {
          await handleRecoverPassword(value.trim());
          ElMessage({
            type: "success",
            message: `Password recovery email has been sent to ${value}`,
          });
        } catch (e) {
          console.error(e);
        }
      })
      .catch(() => {});
  };

  /**
   * Handles password reset. Will send an email to the given email address.
   */
  async function handleRecoverPassword(email: string) {
    if (!email) {
      ElMessage({
        type: "error",
        message: "Email address is required.",
      });
    } else {
      const { error } = await authService().recoverPasswordForEmail(email);
      if (error) {
        ElMessage({
          type: "error",
          message: error.message,
        });
      }
    }
  }

  async function handleResetPassword(newPassword: string) {
    try {
      const { error } = await authService().resetPassword(newPassword);

      if (error) {
        throw new Error("Error resetting password: " + error.message);
      }

      return ElMessage({
        type: "success",
        message: "Password reset successfully!",
      });
    } catch (err) {
      console.error("Error resetting password", err);
      return "Failed to reset password.";
    }
  }

  return {
    userSession,
    handleLogin,
    handleSignup,
    handleLogout,
    handleForgotPassword,
    handleResetPassword,
  };
}
