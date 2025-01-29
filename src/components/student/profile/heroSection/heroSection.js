"use client";
import Modal from "@/components/common/modal/modal";
import Image from "next/image";
import React, { useState } from "react";
import { deleteStudentAccount } from "@/app/utils/student/auth/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const HeroSection = ({ profile, isAdmin, isTeacher }) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDelete = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const confirmDelete = async () => {
    setIsLoading(true); // Show loading text while API is being called
    try {
      // Call delete account API
      await deleteStudentAccount();

      // Redirect to login after successful deletion
      router.push("/login");
    } catch (error) {
      console.error("Account deletion failed:", error.message);
      // Handle the error case (e.g., display an error message)
    } finally {
      setIsLoading(false); // Stop showing loading text
      setShowModal(false); // Close the modal
    }
  };

  return (
    <div className="relative">
      <div className="w-full h-[150px] rounded-xl bg-gradient-to-t from-btnColorOne to-btnColor"></div>
      {!isTeacher && (
        <Image
          className="w-36 h-36 rounded-xl absolute top-12 left-7"
          src={`${profile.profileImage
              ? `${profile.profileImage}`
              : "/images/jpg/profile.jpg"
            } `}
          width={1000}
          height={1000}
        />
        // <p>hi</p>
      )}
      <div className="lg:flex block items-center justify-between mt-16">
        <div>
          <p className="text-headingColor font-bold text-2xl">
            {profile?.firstName} {profile?.lastName}
          </p>
          <p className="text-sm text-paraColor mt-1">{profile?.email}</p>
        </div>
        {!isAdmin && (
          <div className="flex items-center gap-6 mt-2 lg:mt-0">
            <button
              className="bg-red-600 w-32 text-center text-white p-2 text-sm rounded-md"
              onClick={handleDelete}
            >
              {isLoading ? t("pleaseWait") : t("studentprofile.deleteAccount")}{" "}
              {/* Loading state */}
            </button>
            <Link
              href="edit-profile"
              className="bg-gradient-to-t from-btnColorOne to-btnColor text-white p-2 text-sm rounded-md w-36 text-center"
            >
              {t("studentprofile.editProfile")}
            </Link>
          </div>
        )}
      </div>

      {/* Render the Modal component */}
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        onDelete={confirmDelete}
      />
    </div>
  );
};

export default HeroSection;
