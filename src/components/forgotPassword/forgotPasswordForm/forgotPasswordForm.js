"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { forgetPassword } from "@/app/utils/teacher/auth/api";

const ForgotPasswordForm = ({t}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const router = useRouter();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setResponseMessage("");

    try {
      const response = await forgetPassword(data.email);
      setResponseMessage(response.message);

      // Redirect to OTP verification page with email, userType, and updatePassword=true
      router.push(
        `/verified-otp?email=${encodeURIComponent(data.email)}&userType=${
          response.userType
        }&updatePassword=true`
      );
    } catch (error) {
      setResponseMessage(error.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="my-4 w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">{t("forgotPassword.emailLabel")}</label>
        <br />
        <input
          className="p-2 outline-none border rounded-md mt-1 w-full"
          type="email"
          name="email"
          id="email"
          placeholder={t("forgotPassword.emailPlaceholder")}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-gradient-to-t from-btnColorOne to-btnColor my-8 rounded-md w-full text-white p-3 text-lg"
        >
          {isSubmitting ? t("pleaseWait") : t("forgotPassword.continueButton")}
        </button>
      </form>

      {responseMessage && <p className="mt-4 text-center">{responseMessage}</p>}
    </div>
  );
};

export default ForgotPasswordForm;
