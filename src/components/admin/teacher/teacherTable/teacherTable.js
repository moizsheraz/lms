import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { approveTeacher } from "@/app/utils/admin/teachers/api";
import Link from "next/link";

const TeacherTable = ({ teachers, isTeacher,t }) => {
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [showStatusOptions, setShowStatusOptions] = useState(false);

  const handleStatusClick = (teacher) => {
    setSelectedTeacher(teacher);
    setShowStatusOptions(true);
  };

  const updateStatus = async (isApproved) => {
    try {
      await approveTeacher(selectedTeacher._id, isApproved);
      selectedTeacher.isApproved = isApproved;
      setShowStatusOptions(false);
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const statusColor = (status) => {
    return status === "Approved" ? "bg-green-500" : "bg-yellow-500";
  };

  return (
    <div>
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gradient-to-t from-btnColorOne to-btnColor text-white">
              <th className="py-3 px-4 text-left">
                <input type="checkbox" className="form-checkbox h-4 w-4" />
              </th>
              <th className="py-3 px-4 text-left">{t("teachers.name")}</th>
              <th className="py-3 px-4 text-left">{t("teachers.phone")}</th>
              <th className="py-3 px-4 text-left">{t("teachers.email")}</th>
              {isTeacher && <th className="py-3 px-4 text-left">{t("teachers.status")}</th>}
              <th className="py-3 px-4 text-left">{t("teachers.action")}</th>
              <th className="py-3 px-4 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher, index) => (
              <tr
                key={index}
                className="border-t hover:bg-gray-100 transition duration-200"
              >
                <td className="py-3 px-4">
                  <input type="checkbox" className="form-checkbox h-4 w-4" />
                </td>
                <td className="py-3 px-4">
                  {!isTeacher ? (
                    <Link
                      className="block"
                      href={`/admin/student-detail/${teacher._id}`}
                    >
                      {teacher.firstName} {teacher.lastName}
                    </Link>
                  ) : (
                    <Link
                      className="block"
                      href={`/admin/teacher-detail/${teacher._id}`}
                    >
                      {teacher.firstName} {teacher.lastName}
                    </Link>
                  )}
                </td>
                <td className="py-3 px-4">{teacher.phoneNumber || "N/A"}</td>
                <td className="py-3 px-4">{teacher.email}</td>
                {isTeacher && (
                  <td className="py-3 px-4">
                    <span
                      onClick={() => handleStatusClick(teacher)}
                      className={`cursor-pointer text-white px-2 py-1 rounded-full ${statusColor(
                        teacher.isApproved ? "Approved" : "Pending"
                      )}`}
                    >
                      {teacher.isApproved ? "Approved" : "Pending"}
                    </span>
                  </td>
                )}
                <td className="py-3 px-4">Completed</td>
                <td className="py-3 px-4 text-right">
                  <div className="flex justify-end items-center h-full">
                    <BsThreeDotsVertical className="text-gray-600 cursor-pointer hover:text-gray-800 transition" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showStatusOptions && (
          <div className="p-4 fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className=" bg-white p-4 rounded-md shadow-lg">
              <p className="mb-4">Change Status</p>
              <button
                onClick={() => updateStatus(true)}
                className="bg-green-500 text-white mx-1 text-xs px-4 py-2 rounded-md mb-2"
              >
                Approve
              </button>
              <button
                onClick={() => updateStatus(false)}
                className="bg-yellow-500 text-white mx-1 text-xs px-4 py-2 rounded-md"
              >
                Pending
              </button>
              <button
                onClick={() => setShowStatusOptions(false)}
                className="text-gray-600 mt-2"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherTable;
