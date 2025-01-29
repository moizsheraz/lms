import connectDb from "../../../../backend/middleware/db";
import { Category } from "../../../../backend/model/category-model";
import { Teacher } from "../../../../backend/model/teacher-model";
import { NextResponse } from "next/server";
import { auth } from "../../../auth";

const createCategory = async (data) => {
  try {
    const session = await auth();
    const user = session?.user;

    if (!user || !user.email) {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }

    const teacher = await Teacher.findOne({ email: user.email });
    if (!teacher) {
      return NextResponse.json(
        { message: "Only teachers can create categories" },
        { status: 401 }
      );
    }


    const { name, details } = data;

    if (!name || !details) {
      return NextResponse.json(
        { message: "Name and details are required" },
        { status: 400 }
      );
    }

    const category = new Category({ name, details});
    await category.save();

    return NextResponse.json(
      { message: "Category created successfully", category },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create category", error: error.message },
      { status: 500 }
    );
  }
};

const getCategoryById = async (data) => {
  try {
    const { id } = data;
    const category = await Category.findById(id);

    if (!category) {
      return NextResponse.json({ message: "Category not found" }, { status: 404 });
    }

    return NextResponse.json({ category }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch category", error: error.message },
      { status: 500 }
    );
  }
};

const updateCategory = async (req) => {
  try {
    const { id, name, details } =  await req.json();

    if (!id || !name || !details) {
      return NextResponse.json(
        { message: "All fields (id, name, and details) are required." },
        { status: 400 }
      );
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, { name, details }, { new: true });

    if (!updatedCategory) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Category updated successfully", category: updatedCategory },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to update category", error: error.message },
      { status: 500 }
    );
  }
};


const deleteCategory = async (data) => {
  try {
    const { id } = data;
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Category deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete category", error: error.message },
      { status: 500 }
    );
  }
};


const handlePost = async (request) => {
  const { action , ...data } = await request.json();
  switch (action) {
    case "fetch":
      return getCategoryById(data);
    case "create":
      return createCategory(data);
      case "delete":
      return deleteCategory(data);
    default:
      return NextResponse.json({ message: "Invalid action" }, { status: 400 });
  }
};

export const POST = connectDb(handlePost);
export const PUT = connectDb(updateCategory);
