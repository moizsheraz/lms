// components/AdminLoginForm.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { doCredentialLogin } from "@/app/actions";

const AdminLoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const response = await doCredentialLogin(formData);
     
      if (response.error) {
        setError(response.error.message);
      } else if (response.redirectTo) {
        // Redirect to admin dashboard if the user has admin rights

        router.push("/admin/dashboard");
      } else {
        setError("Unauthorized access.");
      }
    } catch (e) {
      setError("Invalid credentials or user not authorized.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      {error && <div className="text-red-500">{error}</div>}
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          required
          className="w-full p-2 mt-1 border rounded-md"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          required
          className="w-full p-2 mt-1 border rounded-md"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 text-white bg-blue-600 rounded-md"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Log in as Admin"}
      </button>
    </form>
  );
};

export default AdminLoginForm;
