"use client"
import { subscribeNewsletter } from '@/app/utils/common/newslatter/api';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { IoIosSend } from 'react-icons/io';

const SubsribeSection = () => {
    const { t } = useTranslation();

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
        <div>
            {/* Newsletter Subscription */}
            <div className="w-full mb-6 bg-white border-b p-1 my-4">
                <p className="font-bold text-lg text-center lg:text-left">
                    {t("footerSection.subscribeTitle")}
                </p>
                <p className="text-headingColor text-sm my-4 lg:my-2 text-center lg:text-left">
                    {t("footerSection.subscribeDescription")}
                </p>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex items-center justify-center my-5"
                >
                    <div className="flex items-center justify-between p-2 w-full border sm:w-96 bg-white rounded-full">
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
    )
}

export default SubsribeSection