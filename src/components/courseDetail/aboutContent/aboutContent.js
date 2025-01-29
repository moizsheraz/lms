"use client";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { useRouter } from "next/navigation";
import {
  deleteCourse,
  updateCourseStatus,
} from "@/app/utils/teacher/courses/api";
import { createPayment } from "@/lib/createPayment";
import { fetchStudentProfile } from "@/app/utils/student/auth/api";
import { applyCoupon } from "@/app/utils/admin/coupon/api";
import { useTranslation } from "react-i18next";
import CourseDetail from "@/components/common/createCourse/courseDetail/courseDetail";

const AboutContent = ({ courseData, isTeacher, price, isAdmin }) => {
  console.log("cas", courseData);
  const { t } = useTranslation();
  const router = useRouter();
  const [isActive, setIsActive] = useState(courseData.isActive);
  const [studentData, setStudentData] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState(courseData.price);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchStudentProfile()
      .then((data) => setStudentData(data))
      .catch((error) =>
        console.error("Failed to fetch student profile:", error)
      );
  }, []);

  const isCoursePurchased = () => {
    return studentData?.purchasedCourses.includes(courseData._id);
  };

  const toggleStatus = async () => {
    try {
      const newStatus = !isActive;
      await updateCourseStatus(courseData._id, newStatus);
      setIsActive(newStatus);
    } catch (error) {
      console.error("Failed to update course status:", error);
      alert("Failed to update course status. Please try again.");
    }
  };

  // Apply the coupon code to get the discounted price
  const handleApplyCoupon = async () => {
    try {
      const { discountedPrice } = await applyCoupon(
        couponCode,
        courseData.price
      );
      setDiscountedPrice(discountedPrice);
    } catch (error) {
      console.error("Failed to apply coupon:", error);
      alert(error.response?.data?.message || "Invalid coupon code.");
    }
  };

  const handleBuyCourse = () => {
    const finalPrice = discountedPrice || courseData.price;
    if (studentData && studentData._id) {
      createPayment(
        finalPrice,
        courseData._id,
        studentData._id,
        studentData.email
      )
        .then((URL) => (window.location.href = URL))
        .catch((error) => {
          console.error("Failed to create payment:", error);
          alert("Failed to create payment. Please try again.");
        });
    } else {
      router.push("/login");
    }
  };

  const handleDeleteCourse = async () => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        const response = await deleteCourse(courseData._id);
        alert(response.message);
        router.back();
      } catch (error) {
        alert("Failed to delete course");
      }
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex flex-wrap my-2 items-center justify-between">
        <div className="flex overflow-auto gap-2 items-center">
          {courseData.topic && (
            <div className="p-2 border border-gray-200 rounded-lg w-auto whitespace-nowrap break-words">
              {courseData.topic}
            </div>
          )}
          {courseData.subtopics?.[0] && (
            <div className="p-2 border border-gray-200 rounded-lg w-auto whitespace-nowrap break-words">
              {courseData.subtopics[0]}
            </div>
          )}
          {courseData?.subsubtopics?.[0] && (
            <div className="p-2 border border-gray-200 rounded-lg w-auto whitespace-nowrap break-words">
              {courseData.subsubtopics[0]}
            </div>
          )}
        </div>

        {!isCoursePurchased() && (
          <div className="text-lg text-sky-400">₪{discountedPrice}</div>
        )}
      </div>

      {isTeacher ? (
        <div className="flex flex-wrap justify-between items-center">
          <div>
            <p className="text-headingColor text-lg font-bold my-2">
              {t("teacherCourseDetail.aboutTheCourse")},
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <div onClick={handleDeleteCourse} className="cursor-pointer">
              <FaTrash className="text-red-500" />
            </div>
            <div className="flex items-center gap-2 bg-gradient-to-t from-btnColorOne to-btnColor p-3 rounded-md w-36 text-white justify-center text-sm my-7">
              <button onClick={handleOpenModal} className="block">
                {t("teacherCourseDetail.editCourse")}
              </button>
            </div>
            <div className="flex items-center gap-2 bg-white border border-gray-200 p-2 rounded-md text-gray-950 justify-between">
              <p>
                {isActive
                  ? t("teacherCourseDetail.active")
                  : t("teacherCourseDetail.inactive")}
              </p>
              <div
                onClick={toggleStatus}
                className={`cursor-pointer relative inline-flex items-center w-10 h-6 rounded-full transition-colors duration-300 ${
                  isActive ? "bg-sky-400" : "bg-gray-400"
                }`}
              >
                <span
                  className={`absolute w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                    isActive ? "translate-x-4" : "translate-x-0"
                  }`}
                ></span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-headingColor text-lg font-bold my-2">
          {t("studentCourseDetail.aboutTheCourse")}
        </p>
      )}
      <p className="text-paraColor text-sm my-2">{courseData.description}</p>
      {!isCoursePurchased() && !isTeacher && !isAdmin && (
        <div className="flex gap-2 flex-wrap">
          <div
            className="cursor-pointer flex items-center gap-2 bg-gradient-to-t from-btnColorOne to-btnColor p-3 rounded-md w-36 text-white justify-center text-sm my-7"
            onClick={handleBuyCourse}
          >
            <FiShoppingCart className="animate-bounce duration-500 ease-in-out" />

            <p> {t("buyCourse")}</p>
          </div>
          {/* Coupon input and apply button */}
          <div className="flex gap-2 items-center my-4">
            <input
              type="text"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="border border-gray-300 rounded px-2 py-2.5"
            />
            <button
              onClick={handleApplyCoupon}
              className="bg-sky-400 text-white px-2 py-2.5 rounded"
            >
              {t("applyCoupon")}
            </button>
          </div>
        </div>
      )}

      {/* Modal for editing course */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 z-50 flex justify-center items-center">
          <div className="relative bg-white p-6 rounded-lg w-4/5 h-[500px] overflow-auto">
            <h3 className="text-xl font-bold mb-4">
              {t("editCourseModalTitle")}
            </h3>
            <CourseDetail
              isEdit={true}
              isAdmin={isAdmin}
              courseData={courseData}
            />
            <div className="absolute top-2 right-2 my-2 flex justify-between gap-2">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                x
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutContent;
