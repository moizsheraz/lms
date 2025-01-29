import { NextResponse } from "next/server";
import connectDb from "../../../../../../backend/middleware/db";
import { Course } from "../../../../../../backend/model/courses-model";
import { Teacher } from "../../../../../../backend/model/teacher-model";
import { Blog } from "../../../../../../backend/model/blog-model";

const getTeacherCoursesReviewsHandler = async (request, { params }) => {
  try {
    const { teacherId } = params;
    if (!teacherId) {
      return NextResponse.json(
        { message: "Teacher ID is required" },
        { status: 400 }
      );
    }

    const teacher = await Teacher.findById(teacherId).lean().exec();
    if (!teacher) {
      return NextResponse.json(
        { message: "Teacher not found" },
        { status: 404 }
      );
    }

    const courses = await Course.find({ teacher: teacherId }).lean().exec();
    const blogs = await Blog.find({ teacher: teacherId }).lean().exec();

    const courseReviews = courses.map((course) => {
      const totalStudents = course.students.length;
      const reviews = course.reviews || [];
      const topic = course.topic || "Unknown";

      const ratingCounts = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      };

      reviews.forEach((review) => {
        const rating = review.rating;
        if (ratingCounts[rating] !== undefined) {
          ratingCounts[rating]++;
        }
      });

      const totalRating = reviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );
      const overallRating = reviews.length
        ? (totalRating / reviews.length).toFixed(1)
        : null;

      return {
        courseId: course._id,
        courseName: course.name,
        topic,
        totalStudents,
        reviews,
        ratingCounts,
        overallRating,
      };
    });

    const teacherProfile = {
      profilePicture: teacher.profileImage || null,
      firstName: teacher.firstName,
      lastName: teacher.lastName,
      email: teacher.email,
      areaOfExpertise: teacher.expertise?.join(", ") || "Not specified", // Using expertise field
      averageReviews: courseReviews.length
        ? (
            courseReviews.reduce(
              (acc, course) => acc + (parseFloat(course.overallRating) || 0),
              0
            ) / courseReviews.length
          ).toFixed(1)
        : null,
      totalPurchases: courses.reduce(
        (acc, course) => acc + (course.students.length || 0),
        0
      ),
      bio: teacher.bio || "No bio available",
      links: {
        courses: courses.map((course) => ({
          courseId: course._id,
          courseName: course.name,
          topic: course.topic,
          totalStudents: course.students.length,
          reviews: course.reviews,
        })),
        blogs: blogs.map((blog) => ({
          blogId: blog._id,
          title: blog.title,
          description: blog.description,
          content: blog.content,
          slug: blog.slug,
        })),
      },
    };

    return NextResponse.json(
      {
        message: "Teacher profile, courses, and blogs retrieved successfully",
        teacherProfile,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Error retrieving teacher profile, courses, and blogs:",
      error
    );
    return NextResponse.json(
      {
        message: "Failed to retrieve teacher profile, courses, and blogs",
        error: error.message,
      },
      { status: 500 }
    );
  }
};

export const GET = connectDb(getTeacherCoursesReviewsHandler);
