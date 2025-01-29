"use client"
import React from "react";
import RegistrationForm from "@/components/RegistrationForm";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const RegisterPage = () => {
  const { t } = useTranslation();

  return (
    <div className=" grid lg:grid-cols-[55%_45%] h-screen">
      {/* Image Section */}
      <div className="hidden lg:block h-full">
        <Image
          src="/images/png/login.png"
          width={1000}
          height={1000}
          className="h-full w-full object-cover rounded-r-2xl"
          alt="Registration image"
        />
      </div>

      {/* Form Section */}
      <div className="flex flex-col justify-center items-center w-full">
        <h1 className="text-3xl my-3 font-bold text-headingColor">{t("registrationLogin.registerTitle")}</h1>
        <p className="mt-3 mb-10">
        {t("registrationLogin.loginPrompt")}
          <Link href="/login" className="mx-2 underline">
          {t("registrationLogin.loginButton")}
          </Link>
        </p>
        <RegistrationForm t={t} />
      </div>
    </div>
  );
};

export default RegisterPage;
