"use client";
import { useEffect, useState } from "react";
import DashboardMainPage from "@/components/admin/dashboardMainPage/dashboardMainPage";
import AdminLayout from "@/components/layout/adminLayout/adminLayout";
import { getTeacherProfile } from "@/app/utils/teacher/auth/api";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/components/common/loading/Loading";

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch the teacher profile on component mount
    const fetchProfile = async () => {
      try {
        const data = await getTeacherProfile();
        setProfile(data.profile);

        // If the user doesn't have admin rights, redirect to the home page
        if (!data.profile.AdminRights) {
          setError("You do not have admin rights.");
          router.push("/"); // Redirect to the home page
        }
      } catch (error) {
        setError(error.message || "An error occurred while fetching profile.");
      }
    };

    fetchProfile();
  }, [router]); // Run this when the component mounts

  // Show loading state if profile is not fetched yet
  if (!profile) {
    return <div><LoadingScreen /></div>;
  }

  // Show error if the user doesn't have admin rights
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <AdminLayout>
      <DashboardMainPage />
    </AdminLayout>
  );
};

export default Dashboard;
