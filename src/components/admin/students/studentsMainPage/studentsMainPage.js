// StudentsMainPage.js
"use client";
import React, { useEffect, useState } from "react";
import TeacherTable from "../../teacher/teacherTable/teacherTable";
import { fetchAllStudents } from "@/app/utils/admin/students/api";
import LoadingScreen from "@/components/common/loading/Loading";
import { useTranslation } from "react-i18next";

const StudentsMainPage = () => {
  const { t } = useTranslation();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStudents = async () => {
      const data = await fetchAllStudents();
      setStudents(data);
      setLoading(false);
    };
    getStudents();
  }, []);

  if (loading) {
    return  <LoadingScreen />;
  }

  return (
    <div>
      <p className="text-headingColor text-2xl font-bold my-4">{t("students.title")}</p>
      <TeacherTable t={t} teachers={students} isTeacher={false} />
    </div>
  );
};

export default StudentsMainPage;
