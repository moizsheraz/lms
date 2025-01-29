// TeacherMainPage.js
"use client";
import React, { useEffect, useState } from "react";
import TeacherTable from "../teacherTable/teacherTable";
import { fetchAllTeachers } from "@/app/utils/admin/teachers/api";
import LoadingScreen from "@/components/common/loading/Loading";
import { useTranslation } from "react-i18next";

const TeacherMainPage = () => {
  const { t } = useTranslation();
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTeachers = async () => {
      const data = await fetchAllTeachers();
      setTeachers(data);
      setLoading(false);
    };
    getTeachers();
  }, []);

  if (loading) {
    return  <LoadingScreen />;
  }

  return (
    <div>
      <p className="text-headingColor text-2xl font-bold my-4">{t("teachers.title")}</p>
      <TeacherTable t={t} teachers={teachers} isTeacher={true} />
    </div>
  );
};

export default TeacherMainPage;
