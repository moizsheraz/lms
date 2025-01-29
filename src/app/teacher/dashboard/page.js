"use client";
import { useEffect, useState } from "react";
import TeacherLayout from "@/components/layout/teacherLayout/teacherLayout";
import DashboardMainPage from "@/components/teacher/dashboardMainPage/dashboardMainPage";
import { useRouter } from "next/navigation";
import { getTeacherProfile } from "@/app/utils/teacher/auth/api";
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

        // Check if the profile is not approved, then redirect to /waiting
        if (data.profile.isApproved === false) {
          router.push("/waiting");
        }

        // If the user is an admin, redirect to the home page with an error message
        if (data.profile.isAdmin) {
          setError("You are not a teacher, you cannot access this portal.");
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
    return (
      <div>
        <LoadingScreen />
      </div>
    );
  }

  // Show error if the user is an admin
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <TeacherLayout>
      <DashboardMainPage profile={profile} />
    </TeacherLayout>
  );
};

export default Dashboard;
