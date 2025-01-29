"use client";
import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { updatePassword } from "@/app/utils/student/auth/api";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const NewPasswordFormContent = () => {
  const { t, i18n } = useTranslation(); // Import i18n for language handling
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const userType = searchParams.get("userType");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const onSubmit = async (data) => {
    if (data.newpassword !== data.confirmpassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");
    try {
      const response = await updatePassword(email, userType, data.newpassword);
      setSuccessMessage(response.message || "Password updated successfully!");

      // Redirect to login or profile page after successful password update
      router.push(
        userType === "student" ? "/student/profile" : "/teacher/dashboard"
      );
    } catch (error) {
      setErrorMessage(error.message || "Failed to update password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputIconPosition = i18n.language === "he" ? "left-3" : "right-3"; // Adjust icon position based on language

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="my-4 w-full relative">
        <label htmlFor="newpassword">{t("newPassword.newPasswordLabel")}</label>
        <input
          className="p-2 outline-none border rounded-md mt-1 w-full"
          type={showPassword ? "text" : "password"}
          placeholder={t("newPassword.newPasswordPlaceholder")}
          {...register("newpassword", {
            required: "New password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        <div
          className={`absolute ${inputIconPosition} top-10 cursor-pointer`}
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </div>
        {errors.newpassword && (
          <p className="text-red-500">{errors.newpassword.message}</p>
        )}
      </div>

      <div className="my-4 w-full relative">
        <label htmlFor="confirmpassword">
          {t("newPassword.confirmPasswordLabel")}
        </label>
        <input
          className="p-2 outline-none border rounded-md mt-1 w-full"
          type={showConfirmPassword ? "text" : "password"}
          placeholder={t("newPassword.confirmPasswordPlaceholder")}
          {...register("confirmpassword", {
            required: "Please confirm your password",
            validate: (value) =>
              value === watch("newpassword") || "Passwords do not match",
          })}
        />
        <div
          className={`absolute ${inputIconPosition} top-10 cursor-pointer`}
          onClick={toggleConfirmPasswordVisibility}
        >
          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
        </div>
        {errors.confirmpassword && (
          <p className="text-red-500">{errors.confirmpassword.message}</p>
        )}
      </div>

      {errorMessage && <p className="text-red-500 my-2">{errorMessage}</p>}
      {successMessage && (
        <p className="text-green-500 my-2">{successMessage}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-gradient-to-t from-btnColorOne to-btnColor my-8 rounded-md w-full text-white p-3 text-lg"
      >
        {isSubmitting ? "Updating..." : t("newPassword.continueButton")}
      </button>
    </form>
  );
};

const NewPasswordForm = () => {
  return (
    <Suspense fallback={<p>Loading password form...</p>}>
      <NewPasswordFormContent />
    </Suspense>
  );
};

export default NewPasswordForm;
