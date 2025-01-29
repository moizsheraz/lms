"use server";

import { signIn, signOut } from "@/auth";
import { getSession } from "@/lib/getSession";
export async function doSocialLogin(formData) {
  const action = formData.get("action");
  await signIn(action, { redirectTo: "/home" });
}

export async function doLogout() {
  await signOut({ redirectTo: "/" });
}

export async function doCredentialLogin(formData) {
  console.log("formData", formData);

  try {
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (response.error) {
      return response; // Return error if login fails
    }

    // Fetch the session to check the user's admin rights
    const session = await getSession();

    if (session?.user) {
      // Redirect to admin dashboard if the user has admin rights
      return { ...response, redirectTo: "/admin/dashboard" };
    } else {
      // Redirect to home for regular users
      return { ...response, redirectTo: "/home" };
    }
  } catch (err) {
    throw err;
  }
}
