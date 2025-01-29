"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { createCoupon, updateCoupon } from "@/app/utils/admin/coupon/api";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";

const CreateCouponMainPage = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get("id");
  const code = searchParams.get("code");
  const discountPercent = searchParams.get("discountPercent");
  const expirationDate = searchParams.get("expirationDate");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (id) {
      setValue("code", code);
      setValue("discountPercent", discountPercent);
      setValue(
        "expirationDate",
        expirationDate ? expirationDate.slice(0, 10) : ""
      );
    }
  }, [id, code, discountPercent, expirationDate, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage("");
    try {
      const response = id
        ? await updateCoupon({ id, ...data })
        : await createCoupon(data);
      setMessage(response.message);
      if (!id) router.push("/admin/coupon");
    } catch (error) {
      setMessage("Failed to submit coupon");
      console.error("Error submitting coupon:", error);
    } finally {
      setLoading(false);
    }
  };

  const todayDate = new Date().toISOString().split("T")[0]; // Format today's date as YYYY-MM-DD

  return (
    <div>
      <p className="text-headingColor text-lg font-bold my-4">
        {id ? t("editCourseHeading") : t("createCourseHeading")}
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="text-headingColor text-sm lg:flex block items-end gap-3"
      >
        <div className="w-full">
          <label htmlFor="couponcode">{t("createCoupon.title")}</label>
          <input
            id="couponcode"
            type="text"
            placeholder={t("createCoupon.titlePlaceholder")}
            className="outline-none p-3 border rounded-md w-full"
            {...register("code", { required: "Coupon code is required" })}
          />
          {errors.code && <p className="text-red-500">{errors.code.message}</p>}
        </div>
        <div className="w-full">
          <label htmlFor="discount">{t("createCoupon.discountPercent")}</label>
          <input
            id="discount"
            type="number"
            placeholder={t("createCoupon.discountPercentPlaceholder")}
            className="outline-none p-3 border rounded-md w-full"
            {...register("discountPercent", {
              required: "Discount percentage is required",
              validate: (value) =>
                (value >= 1 && value <= 100) ||
                "Discount must be between 1% and 100%",
            })}
          />
          {errors.discountPercent && (
            <p className="text-red-500">{errors.discountPercent.message}</p>
          )}
        </div>

        <div className="w-full">
          <label htmlFor="expirydate">{t("createCoupon.expirationDate")}</label>
          <input
            id="expirydate"
            type="date"
            className="outline-none p-3 border rounded-md w-full"
            min={todayDate} // Restrict to today's date or later
            {...register("expirationDate", {
              required: "Expiration date is required",
              validate: (value) =>
                new Date(value) >= new Date(todayDate) ||
                "Expiration date must be today or in the future",
            })}
          />
          {errors.expirationDate && (
            <p className="text-red-500">{errors.expirationDate.message}</p>
          )}
        </div>
        <div>
          <button
            type="submit"
            disabled={loading}
            className={`bg-gradient-to-t from-btnColorOne to-btnColor px-2 py-3 rounded-md text-white w-auto ${
              loading ? "opacity-50" : ""
            }`}
          >
            {loading
              ? "Please wait"
              : id
              ? "Update"
              : t("createCoupon.createButton")}
          </button>
        </div>
      </form>
      {message && <p className="mt-4 text-green-500">{message}</p>}
    </div>
  );
};

export default CreateCouponMainPage;
