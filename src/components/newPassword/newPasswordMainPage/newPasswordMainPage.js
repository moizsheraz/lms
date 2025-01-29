"use client"
import React from 'react'
import NewPasswordForm from '../newPasswordForm/newPasswordForm'
import Image from 'next/image'
import { useTranslation } from 'react-i18next';

const NewPasswordMainPage = () => {
    const { t } = useTranslation();
    return (
        <div className="flex items-center">
            <div className="w-full lg:w-[60%] hidden lg:block">
                <Image src="/images/png/login.png" width={1000} height={1000} />
            </div>
            <div className="flex flex-col justify-center items-center m-4 w-full lg:w-[40%]">
                <h1 className="text-3xl my-3 font-bold text-headingColor">{t("newPassword.title")}</h1>
                <p className="text-paraColor text-sm text-center w-40">{t("newPassword.description")}</p>
                <NewPasswordForm />
            </div>
        </div>
    )
}

export default NewPasswordMainPage