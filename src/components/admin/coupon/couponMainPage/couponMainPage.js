"use client";
import React, { useEffect, useState } from "react";
import CouponCard from "../couponCard/couponCard";
import { getAllCoupons, deleteCoupon } from "@/app/utils/admin/coupon/api";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

const CouponMainPage = () => {
  const { t } = useTranslation();
  const [coupons, setCoupons] = useState([]);
  const router = useRouter();

  const fetchCoupons = async () => {
    try {
      const { coupons } = await getAllCoupons();
      setCoupons(coupons);
    } catch (error) {
      console.error("Failed to fetch coupons:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCoupon(id);
      setCoupons(coupons.filter((coupon) => coupon._id !== id));
    } catch (error) {
      console.error("Failed to delete coupon:", error);
    }
  };

  const handleEdit = (coupon) => {
    const queryParams = new URLSearchParams({
      id: coupon._id,
      code: coupon.code,
      discountPercent: coupon.discountPercent,
      expirationDate: coupon.expirationDate,
    }).toString();

    router.push(`/admin/create-coupon?${queryParams}`);
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between my-4">
        <p className="text-lg font-bold text-headingColor">{t("coupon.couponTitle")}</p>
        <button
          onClick={() => router.push("/admin/create-coupon")}
          className="bg-gradient-to-t from-btnColorOne to-btnColor text-white p-3 text-sm rounded-md"
        >
          + {t("coupon.addCoupon")}
        </button>
      </div>
      {coupons.map((coupon) => (
        <CouponCard
          key={coupon._id}
          heading={coupon.code}
          percent={`${coupon.discountPercent}%`}
          onDelete={() => handleDelete(coupon._id)}
          onEdit={() => handleEdit(coupon)}
        />
      ))}
    </div>
  );
};

export default CouponMainPage;
