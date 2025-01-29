import { NextResponse } from "next/server";
import connectDb from "../../../../../../backend/middleware/db";
import { Coupon } from "../../../../../../backend/model/coupon-model";
import { auth } from "../../../../../auth";
import { Teacher } from "../../../../../../backend/model/teacher-model"; // Import the Teacher model

const addCouponHandler = async (request) => {
  const session = await auth();
  const user = session?.user;

  if (!user || !user.email) {
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 401 }
    );
  }

  // Find the user in the Teacher model to check admin rights
  const adminUser = await Teacher.findOne({ email: user.email }).lean();

  if (!adminUser || !adminUser.AdminRights) {
    return NextResponse.json(
      { message: "User does not have admin rights" },
      { status: 403 }
    );
  }

  const data = await request.json();
  const { code, discountPercent, expirationDate } = data;

  if (!code || !discountPercent || !expirationDate) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    const newCoupon = new Coupon({
      code,
      discountPercent,
      expirationDate,
    });

    await newCoupon.save();

    return NextResponse.json(
      { message: "Coupon created successfully", coupon: newCoupon },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating coupon:", error);
    return NextResponse.json(
      { message: "Failed to create coupon" },
      { status: 500 }
    );
  }
};

export const POST = connectDb(addCouponHandler);
