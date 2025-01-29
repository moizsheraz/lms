"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const RoleSelection = ({ session }) => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [isExistingUser, setIsExistingUser] = useState(false);
  const router = useRouter(); // Initialize useRouter for navigation

  const checkIfUserExists = async () => {
    const dataToSend = {
      email: session.user.email,
      name: session.user.name,
    };

    try {
      const response = await fetch("/api/student/auth/withGoogle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();
      if (result.isExist) {
        setIsExistingUser(true);
        setSelectedRole(result.userData.role);
        console.log("User exists, role:", result.userData.role);
        // Redirect based on role
        if (result.userData.role === "teacher") {
          router.push("/teacher/dashboard"); // Redirect to teacher dashboard
        } else if (result.userData.role === "student") {
          router.push("/"); // Redirect to student profile
        }
      }
    } catch (error) {
      console.error("Error checking user existence:", error);
    }
  };

  useEffect(() => {
    checkIfUserExists();
  }, []);

  const handleRoleSelection = async (role) => {
    setSelectedRole(role);
    const dataToSend = {
      email: session.user.email,
      name: session.user.name,
    };

    try {
      let response;
      if (role === "Student") {
        response = await fetch("/api/student/auth/withGoogle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        });
      } else {
        response = await fetch("/api/teacher/auth/withGoogle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        });
      }

      const result = await response.json();
      if (response.ok) {
        console.log(`Successfully logged in as ${role}:`, result);
        // Redirect based on selected role
        if (role === "Teacher") {
          router.push("/teacher/dashboard"); // Redirect to teacher dashboard
        } else if (role === "Student") {
          router.push("/student/profile"); // Redirect to student profile
        }
      } else {
        console.error(`Error logging in as ${role}:`, result.error);
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  if (isExistingUser) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded shadow-md">
          <h1 className="text-3xl my-2">
            Welcome back, {session?.user?.name || session?.user?.email} as{" "}
            {selectedRole}
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md">
        {!selectedRole ? (
          <>
            <button
              onClick={() => handleRoleSelection("Teacher")}
              className="w-full bg-blue-500 text-white py-2 rounded mb-2"
            >
              Teacher
            </button>
            <button
              onClick={() => handleRoleSelection("Student")}
              className="w-full bg-green-500 text-white py-2 rounded"
            >
              Student
            </button>
          </>
        ) : (
          <h1 className="text-3xl my-2">
            Welcome, {session?.user?.name || session?.user?.email} as{" "}
            {selectedRole}
          </h1>
        )}
      </div>
    </div>
  );
};

export default RoleSelection;
