import { NextResponse } from "next/server";
import connectDb from "../../../../../../backend/middleware/db";
import { Coupon } from "../../../../../../backend/model/coupon-model";
import { auth } from "../../../../../auth";
import { Teacher } from "../../../../../../backend/model/teacher-model"; // Import the Teacher model

const updateCouponHandler = async (request) => {
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
  const { id, code, discountPercent, expirationDate } = data;

  if (!id || !code || !discountPercent || !expirationDate) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    const coupon = await Coupon.findByIdAndUpdate(
      id,
      { code, discountPercent, expirationDate },
      { new: true } // Return the updated document
    );

    if (!coupon) {
      return NextResponse.json(
        { message: "Coupon not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Coupon updated successfully", coupon },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating coupon:", error);
    return NextResponse.json(
      { message: "Failed to update coupon" },
      { status: 500 }
    );
  }
};

export const PUT = connectDb(updateCouponHandler);
