"use client"
import Chatbot from "@/components/common/chatbot/chatbot";
import StudentLayout from "@/components/layout/studentLayout/studentLayout";
import { useTranslation } from "react-i18next";

const Support = () => {
  const { t } = useTranslation();

  const faq = [
    { question: t("studentFaq.question1"), answer: t("studentFaq.answer1"), nestedQuestions: [] },
    { question: t("studentFaq.question2"), answer: t("studentFaq.answer2"), nestedQuestions: [] },
    { question: t("studentFaq.question3"), answer: t("studentFaq.answer3"), nestedQuestions: [] },
    { question: t("studentFaq.question4"), answer: t("studentFaq.answer4"), nestedQuestions: [] },
    { question: t("studentFaq.question5"), answer: t("studentFaq.answer5"), nestedQuestions: [] },
    { question: t("studentFaq.question6"), answer: t("studentFaq.answer6"), nestedQuestions: [] },
    { question: t("studentFaq.question7"), answer: t("studentFaq.answer7"), nestedQuestions: [] },
    { question: t("studentFaq.question8"), answer: t("studentFaq.answer8"), nestedQuestions: [] },
    { question: t("studentFaq.question9"), answer: t("studentFaq.answer9"), nestedQuestions: [] },
    { question: t("studentFaq.question10"), answer: t("studentFaq.answer10"), nestedQuestions: [] },
  ];

  return (
    <StudentLayout>
      <Chatbot faq={faq} />
    </StudentLayout>
  );
};

export default Support;
