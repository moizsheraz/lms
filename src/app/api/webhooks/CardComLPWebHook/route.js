import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import { Course } from "../../../../../backend/model/courses-model";
import { Student } from "../../../../../backend/model/student-model";
import { auth } from "@/auth";

const webhookHandler = async (request) => {
  try {
    const data = await request.json();
    const { ReturnValue, ResponseCode } = data;

    const [studentId, courseId] = ReturnValue.split("_");

    if (!courseId || !studentId) {
      return NextResponse.json(
        { message: "Course ID and Student ID are required" },
        { status: 400 }
      );
    }

    if (ResponseCode === 0) {
      const student = await Student.findById(studentId).lean();
      if (!student) {
        return NextResponse.json(
          { message: "Student not found" },
          { status: 404 }
        );
      }

      const course = await Course.findById(courseId)
        .populate("students", "_id")
        .exec();
      if (!course) {
        return NextResponse.json(
          { message: "Course not found" },
          { status: 404 }
        );
      }

      const isEnrolled = course.students.some((enrolledStudent) =>
        enrolledStudent._id.equals(student._id)
      );
      if (isEnrolled) {
        return NextResponse.json(
          { message: "Student is already enrolled in this course" },
          { status: 400 }
        );
      }

      const purchaseDate = new Date();
      const availableFor = course.availableFor || 3;  // Default to 3 months if not set
      const availableUntil = new Date(purchaseDate);
      availableUntil.setMonth(availableUntil.getMonth() + availableFor);

      const remainingDays = Math.max(0, Math.floor((availableUntil - new Date()) / (1000 * 60 * 60 * 24)));

      course.students.push({
        student: student._id,
        purchaseDate: purchaseDate,
        availableUntil: availableUntil,
        remainingDays: remainingDays,
      });

      await course.save();
      await Student.findByIdAndUpdate(student._id, {
        $addToSet: { purchasedCourses: courseId },
      });

      return NextResponse.json(
        { message: "Student enrolled successfully", course },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Payment failed" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error handling webhook or enrolling student:", error);
    return new NextResponse("Failed to process webhook and enroll student.", {
      status: 500,
    });
  }
};

export const POST = connectDb(webhookHandler);
