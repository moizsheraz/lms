"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { doCredentialLogin } from "@/app/actions";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import { useTranslation } from "react-i18next";

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Password visibility state
  const [loading, setLoading] = useState(false); // Loading state

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true); // Set loading to true
    try {
      const formData = new FormData(event.currentTarget);

      const response = await doCredentialLogin(formData);

      if (!!response.error) {
        console.error(response.error);
        setError(response.error.message);
      } else {
        router.push("/home");
      }
    } catch (e) {
      console.error(e);
      setError("Check your Credentials");
    } finally {
      setLoading(false); // Set loading to false after API call
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const { t, i18n } = useTranslation();

  return (
    <>
      <div className="text-xl text-red-500">{error}</div>
      <form className="my-5 p-4 w-full" onSubmit={onSubmit}>
        <div className="my-4 w-full">
          <label htmlFor="email">{t("loginForm.emailLabel")}</label>
          <br />
          <input
            className="p-2 outline-none border rounded-md mt-1 w-full"
            type="email"
            name="email"
            id="email"
            placeholder={t("loginForm.emailPlaceholder")}
          />
        </div>

        <div className="my-4 w-full relative">
          <label htmlFor="password">{t("loginForm.passwordLabel")}</label>
          <input
            className="p-2 outline-none border rounded-md mt-1 w-full"
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder={t("loginForm.passwordPlaceholder")}
          />
          <div
            className={`absolute ${
              i18n.language === "he" ? "left-3" : "right-3"
            } top-10 cursor-pointer`}
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>

        <div className="flex items-center justify-between my-2">
          <div className="flex items-center gap-2">
            <input type="checkbox" />
            <p className="text-paraColor">{t("loginForm.rememberMe")}</p>
          </div>
          <Link
            href="/forgot-password"
            className="text-btnColor cursor-pointer"
          >
            {t("loginForm.forgotPassword")}
          </Link>
        </div>

        <button
          type="submit"
          className="bg-gradient-to-t from-btnColorOne to-btnColor my-4 rounded-md w-full text-white p-3 text-lg"
          disabled={loading} // Disable button when loading
        >
          {loading ? t("pleaseWait") : t("loginForm.loginButton")}{" "}
          {/* Show loading message */}
        </button>
      </form>
    </>
  );
};

export default LoginForm;
