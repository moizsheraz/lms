"use client"
import Image from 'next/image'
import React from 'react'
import ForgotPasswordForm from '../forgotPasswordForm/forgotPasswordForm'
import { useTranslation } from 'react-i18next';

const ForgotPasswordMainPage = () => {
    const { t } = useTranslation();

    return (
        <div className="flex items-center">
            <div className="w-full lg:w-[60%] hidden lg:block">
                <Image className='rounded-r-2xl' src="/images/png/login.png" width={1000} height={1000} />
            </div>
            <div className="flex flex-col justify-center items-center m-4 w-full lg:w-[40%]">
                <h1 className="text-3xl my-3 font-bold text-headingColor">{t("forgotPassword.title")}</h1>
                <p className="text-paraColor text-sm text-center w-52">{t("forgotPassword.prompt")}</p>
                <ForgotPasswordForm t={t} />
            </div>
        </div>
    )
}

export default ForgotPasswordMainPage