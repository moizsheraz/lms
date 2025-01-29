import StudentLayout from "@/components/layout/studentLayout/studentLayout";
import ProfileMainPage from "@/components/student/profile/profileMainPage/profileMainPage";
import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";

const Profile = async () => {
  const session = await getSession();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <StudentLayout>
      <ProfileMainPage />
    </StudentLayout>
  );
};

export default Profile;
