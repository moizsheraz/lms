"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense } from "react";
import { verifyStudentOtp } from "@/app/utils/student/auth/api";
import { verifyTeacherOtp } from "@/app/utils/teacher/auth/api";
import { useTranslation } from "react-i18next";

const VerifiedOtpFormContent = () => {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const userType = searchParams.get("userType");
  const updatePassword = searchParams.get("updatePassword") === "true";
  const router = useRouter();

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [otpErrors, setOtpErrors] = useState([false, false, false, false]);

  const handleInputChange = (index, value) => {
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to the next input if current input has a value
      if (value && index < 3) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }

      // Reset error for this input if value is valid
      const newErrors = [...otpErrors];
      newErrors[index] = false;
      setOtpErrors(newErrors);
    }
  };

  const handleKeyDown = (e, index) => {
    // Move to the previous input when backspace is pressed
    if (e.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const otpCode = otp.join(""); // Combine OTP inputs into a single string

    // Validate OTP input
    if (otpCode.length !== 4 || !/^\d{4}$/.test(otpCode)) {
      setOtpErrors([true, true, true, true]); // Set error for all fields
      setLoading(false);
      return;
    }

    try {
      if (userType === "student") {
        await verifyStudentOtp(email, otpCode);
      } else if (userType === "teacher") {
        await verifyTeacherOtp(email, otpCode);
      }

      // Conditional redirection based on updatePassword
      if (updatePassword) {
        router.push(
          `/new-password?email=${encodeURIComponent(
            email
          )}&userType=${userType}`
        );
      } else {
        router.push("/login");
      }
    } catch (err) {
      setError(err.message || "Failed to verify OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full my-4">
      <div
        className="flex items-center gap-2 justify-center lg:justify-around"
        style={{ direction: "ltr" }} // Force LTR direction for OTP inputs
      >
        {otp.map((value, index) => (
          <input
            key={index}
            id={`otp-input-${index}`}
            className={`outline-none border border-gray-300 rounded-lg p-5 lg:w-24 w-16 ${otpErrors[index] ? "border-red-500" : ""
              }`}
            type="text"
            maxLength={1}
            value={value}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onFocus={(e) => e.target.select()} // Select text when input is focused
            onKeyDown={(e) => handleKeyDown(e, index)} // Handle backspace
          />
        ))}
      </div>

      {otpErrors.some((error) => error) && (
        <p className="text-red-500">Please enter a valid 4-digit OTP.</p>
      )}

      {error && <p className="text-red-500">{error}</p>}

      <button
        type="submit"
        className="bg-gradient-to-t from-btnColorOne to-btnColor my-8 rounded-md w-full text-white p-3 text-lg"
        disabled={loading}
      >
        {loading ? "Verifying..." : t("otpVerification.continueButton")}
      </button>
      <p className="text-headingColor text-center text-sm mb-4">{t("otpVerification.otpMessage")}</p>
    </form>
  );
};

// Main form component with Suspense wrapper
const VerifiedOtpForm = () => {
  return (
    <Suspense fallback={<p>Loading OTP form...</p>}>
      <VerifiedOtpFormContent />
    </Suspense>
  );
};

export default VerifiedOtpForm;
