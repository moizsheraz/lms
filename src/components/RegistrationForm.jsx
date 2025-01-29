"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SocialLogins from "./SocialLogins";
import { useForm } from "react-hook-form"; // Import react-hook-form
import { registerTeacher } from "@/app/utils/teacher/auth/api";
import { registerStudent } from "@/app/utils/student/auth/api";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const RegistrationForm = () => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const [isStudent, setIsStudent] = useState(true);
  const [errors, setErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false); // State for terms checkbox
  const [phonePrefix, setPhonePrefix] = useState("+1"); // Default phone prefix

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    if (!termsAccepted) {
      setErrors(["You must agree to the terms of service to register."]);
      return;
    }

    setLoading(true);
    setErrors([]);
    setSuccessMessage("");

    try {
      let response;
      const userType = isStudent ? "student" : "teacher";

      // Split the phone number into country code and phone number
      const countryCode = phonePrefix; // Country code selected by the user
      const phoneNumber = data.phoneNumber; // Phone number input by the user

      if (isStudent) {
        response = await registerStudent(
          data.firstName,
          data.lastName,
          data.email,
          data.password,
          data.username,
          phoneNumber,
          countryCode,
          userType
        );
      } else {
        response = await registerTeacher(
          data.firstName,
          data.lastName,
          data.email,
          data.password,
          data.username,
          phoneNumber,
          countryCode,
          userType
        );
      }

      if (response) {
        setSuccessMessage("Registration successful!");
        router.push(
          `/verified-otp?email=${encodeURIComponent(
            data.email
          )}&userType=${userType}`
        );
      }
    } catch (e) {
      console.error(e.message);
      setErrors(e.errors || [e.message]);
    } finally {
      setLoading(false);
    }
  };

  // List of country prefixes
  const countryPrefixes = [
    { code: "+1", key: "US" },
    { code: "+92", key: "PK" },
    { code: "+91", key: "IN" },
    { code: "+972", key: "IL" },
    { code: "+44", key: "UK" },
    { code: "+61", key: "AU" },
    { code: "+81", key: "JP" },
  ];

  return (
    <>
      <div className="flex items-center mb-4 w-full p-4">
        <button
          className={`px-4 py-2 w-full ${
            isStudent
              ? "bg-gradient-to-t from-btnColorOne to-btnColor text-white"
              : "bg-lightCard"
          } rounded-l`}
          onClick={() => setIsStudent(true)}
        >
          {t("registrationLogin.student")}
        </button>
        <button
          className={`px-4 py-2 w-full ${
            !isStudent
              ? "bg-gradient-to-t from-btnColorOne to-btnColor text-white"
              : "bg-lightCard"
          } rounded-r`}
          onClick={() => setIsStudent(false)}
        >
          {t("registrationLogin.teacher")}
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="my-5 p-4 w-full">
        <div className="flex items-center justify-center gap-4">
          <div className="my-2 w-full">
            <label htmlFor="firstName">
              {t("registrationLogin.firstNameLabel")}
            </label>
            <input
              className="p-2 outline-none border rounded-md mt-1 w-full"
              type="text"
              placeholder={t("registrationLogin.firstNamePlaceholder")}
              {...register("firstName", {
                required: "First Name is required",
                minLength: {
                  value: 2,
                  message: "Must be at least 2 characters",
                },
              })}
            />
            {formErrors.firstName && (
              <p className="text-red-500">{formErrors.firstName.message}</p>
            )}
          </div>
          <div className="my-2 w-full">
            <label htmlFor="lastName">
              {t("registrationLogin.lastNameLabel")}
            </label>
            <input
              className="p-2 outline-none border rounded-md mt-1 w-full"
              type="text"
              placeholder={t("registrationLogin.lastNamePlaceholder")}
              {...register("lastName", {
                required: "Last Name is required",
                minLength: {
                  value: 2,
                  message: "Must be at least 2 characters",
                },
              })}
            />
            {formErrors.lastName && (
              <p className="text-red-500">{formErrors.lastName.message}</p>
            )}
          </div>
        </div>
        <div className="my-2 w-full">
          <label htmlFor="username">
            {t("registrationLogin.usernameLabel")}
          </label>
          <input
            className="p-2 outline-none border rounded-md mt-1 w-full"
            type="text"
            placeholder={t("registrationLogin.usernamePlaceholder")}
            {...register("username", {
              required: "Username is required",
              minLength: { value: 3, message: "Must be at least 3 characters" },
            })}
          />
          {formErrors.username && (
            <p className="text-red-500">{formErrors.username.message}</p>
          )}
        </div>
        <div className="my-2 w-full">
          <label htmlFor="email">{t("registrationLogin.emailLabel")}</label>
          <input
            className="p-2 outline-none border rounded-md mt-1 w-full"
            type="email"
            placeholder={t("registrationLogin.emailPlaceholder")}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email format",
              },
            })}
          />
          {formErrors.email && (
            <p className="text-red-500">{formErrors.email.message}</p>
          )}
        </div>
        <div className="my-2 w-full relative">
          <label htmlFor="password">
            {t("registrationLogin.passwordLabel")}
          </label>
          <input
            className="p-2 outline-none border rounded-md mt-1 w-full"
            type={showPassword ? "text" : "password"}
            placeholder={t("registrationLogin.passwordPlaceholder")}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          <div
            className={`absolute ${
              i18n.language === "he" ? "left-3" : "right-3"
            } top-10 cursor-pointer`}
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>

          {formErrors.password && (
            <p className="text-red-500">{formErrors.password.message}</p>
          )}
        </div>
        <div className="flex items-center gap-4 my-2 w-full">
          <div className="w-1/3">
            <label htmlFor="phonePrefix" className="flex gap-2">
              <span className="hidden md:flex">
                {t("registrationLogin.countryLabel")}
              </span>{" "}
            </label>
            <select
              className="p-2 outline-none border rounded-md mt-1 w-full"
              value={phonePrefix}
              onChange={(e) => setPhonePrefix(e.target.value)}
            >
              {countryPrefixes.map((country, index) => (
                <option key={index} value={country.code}>
                  {t(`countries.${country.key}`)}
                </option>
              ))}
            </select>
          </div>

          <div className="w-2/3">
            <label htmlFor="phoneNumber">
              {t("registrationLogin.phoneNumberLabel")}
            </label>
            <input
              className="p-2 outline-none border rounded-md mt-1 w-full"
              type="tel"
              placeholder={t("registrationLogin.phoneNumberPlaceholder")}
              {...register("phoneNumber", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/, // Regex for exactly 10 digits
                  message: "Phone number must be exactly 10 digits",
                },
              })}
            />
            {formErrors.phoneNumber && (
              <p className="text-red-500">{formErrors.phoneNumber.message}</p>
            )}
          </div>
        </div>

        {/* Terms of Service Checkbox */}
        <div className="flex items-center gap-2 my-8">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
          />
          <p className="text-paraColor text-sm">
            {t("registrationLogin.termsParaOne")}
            <Link
              className="text-btnColor underline cursor-pointer"
              href="terms-conditions"
            >
              {" "}
              {t("registrationLogin.termsParaTwo")}
            </Link>
            {t("registrationLogin.termsParaThree")}
          </p>
        </div>

        <button
          type="submit"
          className="bg-gradient-to-t from-btnColorOne to-btnColor my-4 rounded-md w-full text-white p-3 text-lg"
          disabled={loading || !termsAccepted} // Disable button when loading or terms are not accepted
        >
          {loading ? t("pleaseWait") : t("registrationLogin.registerButton")}
        </button>
      </form>

      {/* Show success message */}
      {successMessage && (
        <div className="text-green-500 my-2">
          <p>{successMessage}</p>
        </div>
      )}

      {/* Show errors if any */}
      {errors.length > 0 && (
        <div className="text-red-500">
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}

      <SocialLogins t={t} />
    </>
  );
};

export default RegistrationForm;
