// File: /pages/api/admin/coupon/applyCoupon.js
import { NextResponse } from "next/server";
import connectDb from "../../../../../../backend/middleware/db";
import { Coupon } from "../../../../../../backend/model/coupon-model";

const applyCouponHandler = async (req) => {
  try {
    const { code, price } = await req.json();

    // Check if coupon exists and is valid
    const coupon = await Coupon.findOne({ code });
    if (!coupon) {
      return NextResponse.json(
        { message: "Invalid coupon code." },
        { status: 400 }
      );
    }

    // Check if the coupon is expired
    if (new Date(coupon.expirationDate) < new Date()) {
      return NextResponse.json(
        { message: "Coupon has expired." },
        { status: 400 }
      );
    }

    // Calculate the discounted price
    const discountedPrice = price - (price * coupon.discountPercent) / 100;

    return NextResponse.json(
      { discountedPrice },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error applying coupon:", error);
    return NextResponse.json(
      { message: "Failed to apply coupon." },
      { status: 500 }
    );
  }
};

export const POST = connectDb(applyCouponHandler);
