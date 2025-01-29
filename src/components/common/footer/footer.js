"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { PiXLogoLight } from "react-icons/pi";
import { useForm } from "react-hook-form";
import { subscribeNewsletter } from "@/app/utils/common/newslatter/api";
import { useTranslation } from "react-i18next";
const Footer = () => {
  const { t } = useTranslation();

  const phoneNumber = "+972526313988"; // WhatsApp number without spaces

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  const [successMessage, setSuccessMessage] = useState("");

  // Handler for form submission
  const onSubmit = async (data) => {
    try {
      await subscribeNewsletter(data.email);
      setSuccessMessage("Successfully subscribed to newsletter!");
      reset(); // Reset the form after successful submission
    } catch (error) {
      console.error("Subscription error:", error);
      setSuccessMessage("Failed to subscribe. Please try again.");
    }
  };

  return (
    <div className="bg-[url('/images/jpg/mapimage.jpg')] bg-cover bg-center text-headingColor p-6 lg:p-12">
      <div className="flex flex-wrap justify-between gap-8">
        {/* Logo and Social Links */}
        <div className="w-full lg:w-[20%] flex flex-col items-center lg:items-start">
          <Image
            className="w-16 h-20"
            src="/images/png/logo.png"
            width={1000}
            height={1000}
            alt="Logo"
          />
          <p className="font-bold text-btnColor text-xl mt-4">Just A Game</p>
          <p className="text-headingColor my-2 text-sm text-center lg:text-left">
           {t("footerSection.logoDescription")}
          </p>
          <div className="flex items-center gap-5 mt-4">
            <FaFacebookF className="cursor-pointer" />
            <FaInstagram className="cursor-pointer" />
            <PiXLogoLight className="cursor-pointer" />
            <FaLinkedin className="cursor-pointer" />
          </div>
        </div>

        {/* Legal Matters */}
        <div className="w-full lg:w-[20%]">
          <p className="font-bold text-lg text-center lg:text-left">
          {t("footerSection.legalMatters")}
          </p>
          <div className="flex flex-col items-center lg:items-start mt-4 space-y-2">
            <Link
              href="/terms-conditions"
              className="text-headingColor cursor-pointer"
            >
            {t("footerSection.termsOfUse")}
            </Link>
            <Link
              href="/privacy-policy"
              className="text-headingColor cursor-pointer"
            >
             {t("footerSection.privacyPolicy")}
            </Link>
            <Link
              href="/cookie-policy"
              className="text-headingColor cursor-pointer"
            >
              {t("footerSection.cookiePolicy")}
            </Link>
            <Link
              href="/refund-policy"
              className="text-headingColor cursor-pointer"
            >
             {t("footerSection.refundPolicy")}
            </Link>
            <Link
              href="/accessibility-statement"
              className="text-headingColor cursor-pointer"
            >
             {t("footerSection.accessibilityStatement")}
            </Link>
          </div>
        </div>

        {/* Contact Us */}
        <div className="w-full lg:w-[20%]">
          <p className="font-bold text-lg text-center lg:text-left">
          {t("footerSection.contactUs")}
          </p>
          <div className="flex flex-col items-center lg:items-start mt-4 space-y-2">
            <p className="text-headingColor block">
              <a href="mailto:service.justagame@gmail.com">
              {t("footerSection.email")}
              </a>
            </p>

            <Link className="text-headingColor block" href="/faq">
            {t("footerSection.faqs")}
            </Link>
            {/* WhatsApp Link */}
            <a
              href={`https://wa.me/${phoneNumber}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className="w-10 h-10 mt-4 cursor-pointer"
                src="/images/png/watsap.png"
                width={1000}
                height={1000}
                alt="WhatsApp"
              />
            </a>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="w-full lg:w-[20%] mb-6">
          <p className="font-bold text-lg text-center lg:text-left">
          {t("footerSection.subscribeTitle")}
          </p>
          <p className="text-headingColor text-sm my-4 lg:my-2 text-center lg:text-left">
          {t("footerSection.subscribeDescription")}
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex items-center justify-center my-6"
          >
            <div className="flex items-center justify-between p-2 w-[90%] sm:w-96 bg-white rounded-full">
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
                className="w-48 outline-none text-headingColor"
                type="email"
                placeholder={t("footerSection.enterEmail")}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-7 h-7 sm:w-8 sm:h-8 text-lg sm:text-xl bg-gradient-to-t to-btnColor from-btnColorOne rounded-full p-1 flex items-center justify-center text-white"
              >
                <IoIosSend />
              </button>
            </div>
          </form>

          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
          {successMessage && (
            <p className="text-green-500 text-xs mt-2">{successMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Footer;
