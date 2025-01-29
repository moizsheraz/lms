"use client";
import Image from "next/image";
import React from "react";
import { CiLogout } from "react-icons/ci";
import { signOut } from "next-auth/react";

const WaitingMainPage = ({t}) => {
  const handleLogout = () => {
    signOut({ callbackUrl: "/" }); // Sign out and redirect to "/"
  };
  return (
    <div className="flex items-center">
      <div className="w-full lg:w-[60%] hidden lg:block">
        <Image src="/images/png/login.png" width={1000} height={1000} />
      </div>
      <div className="flex flex-col justify-center items-center m-4 w-full lg:w-[40%]">
        <Image
          className="lg:w-72 w-full"
          src="/images/png/waiting.png"
          width={1000}
          height={1000}
        />
        <h1 className="text-3xl my-3 font-bold text-headingColor">
         {t("waitForApproval.title")}
        </h1>
        <p className="text-paraColor text-sm text-center lg:w-96 w-full">
        {t("waitForApproval.message")}
        </p>
        <div
          className="flex items-center justify-center gap-3 mt-10 bg-red-600 text-white p-2 rounded-md w-36"
          onClick={handleLogout}
        >
          <CiLogout />
          <button className="text-sm"> {t("waitForApproval.logoutButton")}</button>
        </div>
      </div>
    </div>
  );
};

export default WaitingMainPage;
