import TeacherLayout from "@/components/layout/teacherLayout/teacherLayout";
import EditProfileMainPage from "@/components/student/editProfile/editProfileMainPage/editProfileMainPage";
import React from "react";

const EditProfile = () => {
  return (
    <TeacherLayout>
      <EditProfileMainPage isTeacher={true} />
    </TeacherLayout>
  );
};

export default EditProfile;
