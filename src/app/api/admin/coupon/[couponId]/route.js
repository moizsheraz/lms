import { NextResponse } from "next/server";
import connectDb from "../../../../../../backend/middleware/db";
import { Coupon } from "../../../../../../backend/model/coupon-model";

const getCouponByIdHandler = async (request, { params }) => {
  const { couponId } = params;

  if (!couponId) {
    return NextResponse.json(
      { message: "Coupon ID is required" },
      { status: 400 }
    );
  }

  try {
    const coupon = await Coupon.findById(couponId);

    if (!coupon) {
      return NextResponse.json(
        { message: "Coupon not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Coupon found", coupon },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching coupon:", error);
    return NextResponse.json(
      { message: "Failed to fetch coupon" },
      { status: 500 }
    );
  }
};

export const GET = connectDb(getCouponByIdHandler);
