import { NextResponse } from "next/server";
import connectDb from "../../../../../../backend/middleware/db";
import { Course } from "../../../../../../backend/model/courses-model";
import { Exam } from "../../../../../../backend/model/exam-schema";
import { Question } from "../../../../../../backend/model/question-model";
import { Teacher } from "../../../../../../backend/model/teacher-model";
import { auth } from "../../../../../auth";

const deleteCourseHandler = async (request, { params }) => {
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
      { message: "Teacher not found", user: user.email },
      { status: 404 }
    );
  }

  const { courseId } = params; // Assuming you're passing the courseId as a route param

  try {
    const course = await Course.findById(courseId);

    if (!course) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }

    // Only the course creator (teacher) can delete the course
    if (
      !(
        teacher.AdminRights ||
        course.teacher.toString() === teacher._id.toString()
      )
    ) {
      return NextResponse.json(
        { message: "You are not authorized to delete this course" },
        { status: 403 }
      );
    }

    // Remove related exams and questions
    const examIds = course.exam; // Assuming course.exam contains an array of exam IDs
    for (const examId of examIds) {
      const exam = await Exam.findById(examId);
      if (exam) {
        // Remove related questions before deleting the exam
        await Question.deleteMany({ _id: { $in: exam.questions } });
        // Use findByIdAndDelete to remove the exam
        await Exam.findByIdAndDelete(examId);
      }
    }

    // Remove the course
    await Course.findByIdAndDelete(courseId); // Use findByIdAndDelete to remove the course

    // Remove course from the teacher's course list
    teacher.courses = teacher.courses.filter(
      (id) => id.toString() !== course._id.toString()
    );
    await teacher.save();

    return NextResponse.json(
      { message: "Course and related exams deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting course:", error);
    return NextResponse.json(
      { message: "Failed to delete course" },
      { status: 500 }
    );
  }
};

export const DELETE = connectDb(deleteCourseHandler);
