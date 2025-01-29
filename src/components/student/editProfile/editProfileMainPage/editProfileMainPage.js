"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import HeroSection from "../heroSection/heroSection";
import { editPassword } from "@/app/utils/student/auth/api";
import { editTeacherPassword } from "@/app/utils/teacher/auth/api";
import { useTranslation } from "react-i18next";

const EditProfileMainPage = ({ isTeacher }) => {
   const { t, i18n } = useTranslation();
  const [showOldpassword, setShowOldpassword] = useState(false);
  const [showNewpassword, setShowNewpassword] = useState(false);
  const [showConfirmpassword, setShowConfirmpassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loadingPassword, setLoadingPassword] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  const toggleOldpasswordVisibility = () => setShowOldpassword((prev) => !prev);
  const toggleNewpasswordVisibility = () => setShowNewpassword((prev) => !prev);
  const toggleConfirmpasswordVisibility = () =>
    setShowConfirmpassword((prev) => !prev);

  const handlePasswordUpdate = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      setErrorMessage("New password and confirm password do not match.");
      return;
    }

    setLoadingPassword(true);
    try {
      const response = isTeacher
        ? await editTeacherPassword({
            currentpassword: data.oldPassword,
            newpassword: data.newPassword,
          })
        : await editPassword({
            currentpassword: data.oldPassword,
            newpassword: data.newPassword,
          });

      if (response.message === "password updated successfully.") {
        setSuccessMessage("Password updated successfully.");
        setErrorMessage("");
        reset();
      } else {
        setErrorMessage(
          response.errors
            ? response.errors.join(", ")
            : response.message || "Failed to update password."
        );
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setLoadingPassword(false);
    }
  };

  const inputIconPosition = i18n.language === "he" ? "left-3" : "right-3"; // Adjust icon position based on language

  return (
    <div className="px-2">
      <HeroSection isTeacher={isTeacher} />
      <form onSubmit={handleSubmit(handlePasswordUpdate)} className="w-full">
        <p className="text-headingColor text-sm font-bold my-6">
          {t("teacherProfile.changePassword")}
        </p>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}

        <div className="lg:flex block items-center gap-3 my-4">
          <div className="relative w-full shadow-sm lg:my-0 my-2">
            <label className="text-paraColor" htmlFor="oldpassword">
              {t("teacherProfile.oldPassword")}
            </label>
            <input
              className="outline-none w-full border mt-1 rounded-md p-2 text-headingColor"
              id="oldpassword"
              type={showOldpassword ? "text" : "password"}
              placeholder="**********"
              {...register("oldPassword")}
            />
            <span
              onClick={toggleOldpasswordVisibility}
              className={`absolute ${inputIconPosition} top-10 cursor-pointer`}
            >
              {showOldpassword ? (
                <AiFillEyeInvisible className="text-headingColor" />
              ) : (
                <AiFillEye className="text-headingColor" />
              )}
            </span>
          </div>

          <div className="relative w-full shadow-sm lg:my-0 my-2">
            <label className="text-paraColor" htmlFor="newpassword">
              {t("teacherProfile.newPassword")}
            </label>
            <input
              className="outline-none w-full border mt-1 rounded-md p-2 text-headingColor"
              id="newpassword"
              type={showNewpassword ? "text" : "password"}
              placeholder="**********"
              {...register("newPassword")}
            />
            <span
              onClick={toggleNewpasswordVisibility}
              className={`absolute ${inputIconPosition} top-10 cursor-pointer`}
            >
              {showNewpassword ? (
                <AiFillEyeInvisible className="text-headingColor" />
              ) : (
                <AiFillEye className="text-headingColor" />
              )}
            </span>
          </div>

          <div className="relative w-full shadow-sm lg:my-0 my-2">
            <label className="text-paraColor" htmlFor="confirmpassword">
              {t("teacherProfile.confirmPassword")}
            </label>
            <input
              className="outline-none w-full border mt-1 rounded-md p-2 text-headingColor"
              id="confirmpassword"
              type={showConfirmpassword ? "text" : "password"}
              placeholder="**********"
              {...register("confirmPassword")}
            />
            <span
              onClick={toggleConfirmpasswordVisibility}
              className={`absolute ${inputIconPosition} top-10 cursor-pointer`}
            >
              {showConfirmpassword ? (
                <AiFillEyeInvisible className="text-headingColor" />
              ) : (
                <AiFillEye className="text-headingColor" />
              )}
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="text-white p-2 rounded-md w-auto my-6 bg-gradient-to-t from-btnColorOne to-btnColor"
          disabled={loadingPassword}
        >
          {loadingPassword ? t("pleaseWait") : t("teacherProfile.update")}
        </button>
      </form>
    </div>
  );
};

export default EditProfileMainPage;
