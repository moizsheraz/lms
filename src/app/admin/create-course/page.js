import CreateCourseMainPage from "@/components/admin/createCourse/createCourseMainPage/createCourseMainPage";
import CourseDetail from "@/components/common/createCourse/courseDetail/courseDetail";
import AdminLayout from "@/components/layout/adminLayout/adminLayout";
import React from "react";

const CreateCourse = () => {
  return (
    <AdminLayout>
      {/* <CreateCourseMainPage isAdmin={true} /> */}
      <CourseDetail isAdmin={true} />
    </AdminLayout>
  );
};

export default CreateCourse;
