"use client"
import LoginForm from "@/components/LoginForm";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();
  
  return (
    <div className="flex items-center">
      <div className="w-full lg:w-[60%] hidden lg:block">
        <Image src="/images/png/login.png" width={1000} height={1000} />
      </div>
      <div className="flex flex-col justify-center items-center m-4 w-full lg:w-[40%]">
        <h1 className="text-3xl my-3 font-bold text-headingColor">{t("loginForm.welcome")}</h1>
        <p className="text-paraColor text-sm text-center w-40">{t("loginForm.prompt")}</p>
        <LoginForm t={t} />
        <p className="my-3 text-paraColor">
        {t("loginForm.registerPrompt")}
          <Link href="register" className="mx-2 underline text-btnColor">
           {t("loginForm.registerLink")}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
