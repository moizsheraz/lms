import AdminLayout from "@/components/layout/adminLayout/adminLayout";
import EditProfileMainPage from "@/components/student/editProfile/editProfileMainPage/editProfileMainPage";
import React from "react";

const EditProfile = () => {
  return (
    <AdminLayout>
      <EditProfileMainPage isTeacher={true} />
    </AdminLayout>
  );
};

export default EditProfile;
