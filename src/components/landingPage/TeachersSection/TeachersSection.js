import React, { useEffect, useState } from "react";
import { fetchApprovedTeachers } from "@/app/utils/common/blog/api";
import LoadingScreen from "@/components/common/loading/Loading";
import Link from "next/link";

const TeachersSection = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTeachers = async () => {
      try {
        const teacherData = await fetchApprovedTeachers();
        console.log("teacher", teacherData);
        setTeachers(teacherData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getTeachers();
  }, []);

  if (loading) {
    return (
      <>
        <LoadingScreen />
      </>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-8 bg-gray-100">
      <h2 className="text-2xl font-bold text-center mb-6">Meet Our Teachers</h2>

      {/* Desktop View */}
      <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {teachers.map((teacher) => (
          <div
            key={teacher._id}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-200"
          >
            <img
              src={teacher.profileImage || "/default-profile.png"}
              alt={`${teacher.firstName} ${teacher.lastName}`}
              className="w-24 h-24 rounded-full mb-4 object-cover"
            />
            <h3 className="text-lg font-semibold">
              {teacher.firstName} {teacher.lastName}
            </h3>
            <p className="text-gray-500 text-sm">{teacher.bio || ""}</p>
            <p className="text-gray-400 text-xs mt-1">{teacher.email}</p>
            <div className="mt-4">
              <Link
                href={`teacher-profile/${teacher._id}`}
                className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition-colors"
              >
                View Profile
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile View (Slider) */}
      <div className="p-4 block lg:hidden">
        <div
          className="flex gap-4 overflow-x-auto lg:overflow-x-hidden"
          style={{
            /* Hide scrollbar for Webkit browsers */
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none", // IE and Edge
          }}
        >
          {teachers.map((teacher) => (
            <div
              key={teacher._id}
              className="min-w-[80%] sm:min-w-[45%] md:min-w-[30%] lg:w-auto"
            >
              <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-200">
                <img
                  src={teacher.profileImage || "/default-profile.png"}
                  alt={`${teacher.firstName} ${teacher.lastName}`}
                  className="w-24 h-24 rounded-full mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold">
                  {teacher.firstName} {teacher.lastName}
                </h3>
                <p className="text-gray-500 text-sm">{teacher.bio || ""}</p>
                <p className="text-gray-400 text-xs mt-1">{teacher.email}</p>
                <div className="mt-4">
                  <Link
                    href={`teacher-profile/${teacher._id}`}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition-colors"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeachersSection;
