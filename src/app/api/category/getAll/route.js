import connectDb from "../../../../../backend/middleware/db";
import { Category } from "../../../../../backend/model/category-model";
import { NextResponse } from "next/server";

const getAllCategories = async () => {
  try {
    const categories = await Category.find({});
    return NextResponse.json({ categories }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch categories", error: error.message },
      { status: 500 }
    );
  }
};

export const GET = connectDb(getAllCategories);
