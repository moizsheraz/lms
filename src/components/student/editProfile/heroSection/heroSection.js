import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoImageOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import Modal from "@/components/common/modal/modal";
import {
  updateTeacherProfile,
  getTeacherProfile,
  deleteTeacherAccount,
} from "@/app/utils/teacher/auth/api";
import {
  fetchStudentProfile,
  deleteStudentAccount,
  updateProfile,
} from "@/app/utils/student/auth/api";
import Link from "next/link";
import Image from "next/image";

const HeroSection = ({ isTeacher }) => {
  const { t } = useTranslation();
  const [profile, setProfile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [imgurl, setImgUrl] = useState(null);
  const [phonePrefix, setPhonePrefix] = useState("+1");
  const inputRef = useRef(null);
  const router = useRouter();
  const [bio, setBio] = useState("");
  const [expertise, setExpertise] = useState([]);
  const [newExpertise, setNewExpertise] = useState("");
  const { register, handleSubmit, reset } = useForm();

  const countryPrefixes = [
    { code: "+1", label: "US" },
    { code: "+92", label: "PK" },
    { code: "+91", label: "IN" },
    { code: "+972", label: "IL" },
    { code: "+44", label: "UK" },
    { code: "+61", label: "AU" },
    { code: "+81", label: "JP" },
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = isTeacher
          ? await getTeacherProfile()
          : await fetchStudentProfile();

        setProfile(isTeacher ? data.profile : data);
        setBio(data.profile.bio || "");
        setExpertise(data.profile.expertise || []);
        if (data?.countryCode) {
          setPhonePrefix(data.countryCode);
        }

        reset(data);
      } catch (error) {
        console.error("Failed to fetch profile:", error.message);
      }
    };
    fetchProfile();
  }, [isTeacher, reset]);

  const handleDelete = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const confirmDelete = async () => {
    setIsLoading(true);
    try {
      if (isTeacher) {
        await deleteTeacherAccount();
      } else {
        await deleteStudentAccount();
      }
      router.push("/login");
    } catch (error) {
      console.error("Account deletion failed:", error.message);
    } finally {
      setIsLoading(false);
      setShowModal(false);
    }
  };

  const handleProfileUpdate = async (data) => {
    setLoadingProfile(true);
    try {
      const phoneNumber = data.phoneNumber;
      const updatedData = {
        ...data,
        bio,
        expertise,
        profileImage: imgurl,
        phoneNumber,
        countryCode: phonePrefix,
      };

      const response = isTeacher
        ? await updateTeacherProfile(updatedData)
        : await updateProfile(updatedData);

      alert(response.message || "Profile updated successfully.");
      reset(updatedData);
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      setLoadingProfile(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImgUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => inputRef.current.click();

  const handleAddExpertise = (e) => {
    if (e.key === "," || e.key === "Enter") {
      e.preventDefault();
      const value = newExpertise.trim();
      if (value && !expertise.includes(value)) {
        setExpertise((prev) => [...prev, value]);
      }
      setNewExpertise("");
    }
  };

  const handleRemoveExpertise = (item) => {
    setExpertise((prev) => prev.filter((exp) => exp !== item));
  };

  return (
    <div className="relative">
      <div className="w-full h-[150px] rounded-xl bg-gradient-to-t from-btnColorOne to-btnColor"></div>
      {isTeacher ? (
        <>
          <div
            className="w-36 h-36 border-4 border-white rounded-xl absolute top-12 left-7 flex items-center justify-center cursor-pointer"
            onClick={handleImageClick}
            style={{
              backgroundImage: imgurl
                ? `url(${imgurl})`
                : profile?.profileImage
                ? `url(${profile.profileImage})`
                : "linear-gradient(to top, rgba(0, 119, 211, 1), rgba(1, 194, 237, 1))",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {!imgurl && !profile?.profileImage && (
              <IoImageOutline className="text-white text-6xl" />
            )}
          </div>

          <input
            type="file"
            ref={inputRef}
            className="hidden"
            onChange={handleImageChange}
            accept="image/*"
          />
          <div className="mt-[50px] text-sm my-1 text-red-500">
            <span>{t("imageSize")}</span>
          </div>
        </>
      ) : (
        <div className="w-36 h-36 border-4 border-white rounded-xl absolute top-12 left-7 flex items-center justify-center ">
          <Image
            src="/images/jpg/profile.jpg"
            className=""
            width={1000}
            height={1000}
          />
        </div>
      )}

      <div className="lg:flex block items-center justify-between mt-16">
        <div>
          <p className="text-headingColor font-bold text-2xl">
            {profile?.firstName} {profile?.lastName}
          </p>
          <p className="text-sm text-paraColor mt-1">{profile?.email} </p>
        </div>
        <div className="flex items-center gap-6 mt-2 lg:mt-0">
          <button
            className="bg-red-600 w-32 text-center text-white p-2 text-sm rounded-md"
            onClick={handleDelete}
          >
            {isLoading ? t("pleaseWait") : t("teacherProfile.deleteAccount")}
          </button>
          <Link
            href="edit-profile"
            className="bg-gradient-to-t from-btnColorOne to-btnColor text-white p-2 text-sm rounded-md w-36 text-center"
          >
            {t("teacherProfile.editProfile")}
          </Link>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(handleProfileUpdate)}
        className="mt-4 w-full"
      >
        {isTeacher && (
          <>
            {/* Bio Section */}
            <div className="my-4">
              <label className="text-paraColor" htmlFor="bio">
                {t("teacherProfile.bio")}
              </label>
              <textarea
                className="outline-none w-full border mt-1 rounded-md p-2 text-headingColor"
                id="bio"
                rows="4"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>

            {/* Expertise Section */}
            <div className="my-4">
              <label className="text-paraColor" htmlFor="expertise">
                {t("teacherProfile.expertise")}
              </label>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                {expertise.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full flex items-center gap-2"
                  >
                    <span>{item}</span>
                    <button
                      type="button"
                      className="text-red-600 font-bold"
                      onClick={() => handleRemoveExpertise(item)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
              <input
                className="outline-none w-full border mt-2 rounded-md p-2 text-headingColor"
                id="expertise"
                type="text"
                value={newExpertise}
                onChange={(e) => setNewExpertise(e.target.value)}
                onKeyDown={handleAddExpertise}
                placeholder="Type expertise and press Enter or Comma"
              />
            </div>
          </>
        )}
        <div className="lg:flex block items-center gap-3 my-4">
          <div className="w-full shadow-sm lg:my-0 my-2">
            <label className="text-paraColor" htmlFor="firstName">
              {t("teacherProfile.firstName")}
            </label>
            <input
              className="outline-none w-full border mt-1 rounded-md p-2 text-headingColor"
              id="firstName"
              type="text"
              placeholder={profile?.firstName || "John"}
              {...register("firstName")}
            />
          </div>
          <div className="w-full shadow-sm lg:my-0 my-2">
            <label className="text-paraColor" htmlFor="lastName">
              {t("teacherProfile.lastName")}
            </label>
            <input
              className="outline-none w-full border mt-1 rounded-md p-2 text-headingColor"
              id="lastName"
              type="text"
              placeholder={profile?.lastName || "Doe"}
              {...register("lastName")}
            />
          </div>
          <div className="w-full shadow-sm lg:my-0 my-2">
            <label className="text-paraColor" htmlFor="username">
              {t("teacherProfile.username")}
            </label>
            <input
              className="outline-none w-full border mt-1 rounded-md p-2 text-headingColor"
              id="username"
              type="text"
              placeholder={profile?.username || "john11"}
              {...register("username")}
            />
          </div>
        </div>

        <div className="lg:flex block items-center gap-3 my-4">
          <div className="w-full shadow-sm lg:my-0 my-2">
            <label className="text-paraColor" htmlFor="email">
              {t("teacherProfile.email")}
            </label>
            <input
              className="outline-none w-full border mt-1 rounded-md p-2 text-headingColor bg-gray-100"
              disabled
              id="email"
              type="email"
              placeholder={profile?.email || t("teacherProfile.emailValue")}
              {...register("email")}
            />
          </div>

          <div className="w-full shadow-sm lg:my-0 my-2">
            <label className="text-paraColor" htmlFor="phoneNumber">
              {t("teacherProfile.phoneNumber")}
            </label>
            <div className="flex items-center border mt-1 rounded-md p-2 text-headingColor">
              <select
                className="p-2 outline-none w-1/4 border-r text-headingColor"
                value={phonePrefix}
                onChange={(e) => setPhonePrefix(e.target.value)}
              >
                {countryPrefixes.map((country, index) => (
                  <option key={index} value={country.code}>
                    {t(`countries.${country.label}`)}
                  </option>
                ))}
              </select>
              <input
                className="outline-none w-3/4 pl-2"
                id="phoneNumber"
                type="text"
                placeholder={
                  profile?.phoneNumber || t("teacherProfile.enterPhoneNumber")
                }
                {...register("phoneNumber")}
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loadingProfile}
          className="text-white p-2 rounded-md w-auto my-6 bg-gradient-to-t from-btnColorOne to-btnColor"
        >
          {loadingProfile ? "Saving..." : t("teacherProfile.updateProfile")}
        </button>
      </form>

      {showModal && (
        <Modal
          showModal={showModal}
          closeModal={closeModal}
          confirmDelete={confirmDelete}
        />
      )}
    </div>
  );
};

export default HeroSection;
