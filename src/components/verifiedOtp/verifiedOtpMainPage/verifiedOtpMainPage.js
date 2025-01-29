"use client"
import Image from "next/image";
import React from "react";
import VerifiedOtpForm from "../verifiedOtpForm/verifiedOtpForm";
import { useTranslation } from "react-i18next";

const VerifiedOtpMainPage = () => {
  const { t } = useTranslation();
  return (
    <div>
      <div className="flex items-center">
        <div className="w-full lg:w-[55%] hidden lg:block">
          <Image src="/images/png/login.png" width={1000} height={1000} />
        </div>
        <div className="flex flex-col justify-center items-center m-4 w-full lg:w-[45%]">
          <h1 className="text-3xl my-3 font-bold text-headingColor">
           {t("otpVerification.title")}
          </h1>
          <p className="text-paraColor text-sm text-center w-60">
          {t("otpVerification.description")}
          </p>
          <VerifiedOtpForm t={t} />
        </div>
      </div>
    </div>
  );
};

export default VerifiedOtpMainPage;
