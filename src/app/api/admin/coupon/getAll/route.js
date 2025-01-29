import { NextResponse } from "next/server";
import connectDb from "../../../../../../backend/middleware/db";
import { Coupon } from "../../../../../../backend/model/coupon-model";

const getCouponsHandler = async () => {
  try {
    const coupons = await Coupon.find({});
    return NextResponse.json({ coupons }, { status: 200 });
  } catch (error) {
    console.error("Error fetching coupons:", error);
    return NextResponse.json(
      { message: "Failed to fetch coupons" },
      { status: 500 }
    );
  }
};

export const POST = connectDb(getCouponsHandler);
