"use client"
import Chatbot from "@/components/common/chatbot/chatbot";
import TeacherLayout from "@/components/layout/teacherLayout/teacherLayout";
import { useTranslation } from "react-i18next";

const Support = () => {
   const { t } = useTranslation();

  const faq = [
    { question: t("teacherFaq.question1"), answer: t("teacherFaq.answer1"), nestedQuestions: [] },
    { question: t("teacherFaq.question2"), answer: t("teacherFaq.answer2"), nestedQuestions: [] },
    { question: t("teacherFaq.question3"), answer: t("teacherFaq.answer3"), nestedQuestions: [] },
    { question: t("teacherFaq.question4"), answer: t("teacherFaq.answer4"), nestedQuestions: [] },
    { question: t("teacherFaq.question5"), answer: t("teacherFaq.answer5"), nestedQuestions: [] },
    { question: t("teacherFaq.question6"), answer: t("teacherFaq.answer6"), nestedQuestions: [] },
    { question: t("teacherFaq.question7"), answer: t("teacherFaq.answer7"), nestedQuestions: [] },
    { question: t("teacherFaq.question8"), answer: t("teacherFaq.answer8"), nestedQuestions: [] },
    { question: t("teacherFaq.question9"), answer: t("teacherFaq.answer9"), nestedQuestions: [] },
    { question: t("teacherFaq.question10"), answer: t("teacherFaq.answer10"), nestedQuestions: [] },
  ];

  return (
    <TeacherLayout>
      <Chatbot faq={faq} />
    </TeacherLayout>
  );
};

export default Support;
