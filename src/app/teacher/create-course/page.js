import CreateCourseMainPage from "@/components/admin/createCourse/createCourseMainPage/createCourseMainPage";
import CourseDetail from "@/components/common/createCourse/courseDetail/courseDetail";
import TeacherLayout from "@/components/layout/teacherLayout/teacherLayout";
import React from "react";

const CreateCourse = () => {
  return (
    <TeacherLayout>
      {/* <CreateCourseMainPage isAdmin={false} /> */}
      <CourseDetail isAdmin={false} />
    </TeacherLayout>
  );
};

export default CreateCourse;
