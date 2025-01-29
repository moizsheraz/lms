"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const Chatbot = ({ faq }) => {
  const [questionStack, setQuestionStack] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [isTawkToLoaded, setIsTawkToLoaded] = useState(false);

  const loadTawkToScript = () => {
    if (!isTawkToLoaded) {
      window.Tawk_API = window.Tawk_API || {};
      window.Tawk_LoadStart = new Date();

      const s1 = document.createElement("script");
      const s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = "https://embed.tawk.to/673eb89a2480f5b4f5a16585/1id6g27n0";
      s1.charset = "UTF-8";
      s1.setAttribute("crossorigin", "*");
      s1.onload = () => {
        setIsTawkToLoaded(true);
      };
      s0.parentNode.insertBefore(s1, s0);
    }
  };

  const openQuestion = (question) => {
    setQuestionStack((prevStack) => [...prevStack, question]);
    setFeedback(null);
  };

  const goBack = () => {
    if (feedback) {
      setFeedback(null);
      setQuestionStack([]);
    } else {
      setQuestionStack((prevStack) => prevStack.slice(0, -1));
    }
  };

  const handleFeedback = (isHelpful) => {
    if (isHelpful) {
      setFeedback(t("feedBack"));
    } else {
      setFeedback(t("chatHelp"));
      loadTawkToScript();
    }
  };

  const currentQuestion = questionStack.length
    ? questionStack[questionStack.length - 1]
    : { nestedQuestions: faq };
  const { t } = useTranslation();

  return (
    <div className=" flex items-center justify-center">
      <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg w-full h-full md:w-[500px] md:h-auto md:border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          {t("needHelp")}
        </h2>
        {questionStack.length > 0 && (
          <button
            onClick={goBack}
            className="text-blue-500 hover:underline focus:outline-none mb-2 text-sm"
          >
            {t("back")}
          </button>
        )}
        {!feedback && (
          <>
            <ul className="text-sm space-y-3">
              {currentQuestion.nestedQuestions.map((item, index) => (
                <li key={index} className="mb-2">
                  <button
                    onClick={() => openQuestion(item)}
                    className="text-left text-blue-600 hover:text-blue-800 hover:underline focus:outline-none transition-colors text-base"
                  >
                    <span className="text-gray-400 font-semibold">
                      {index + 1}.
                    </span>{" "}
                    {item.question}
                  </button>
                </li>
              ))}
            </ul>
            {currentQuestion.answer && (
              <div className="mt-5 bg-gray-100 p-4 rounded-md">
                <p className="text-gray-700">{currentQuestion.answer}</p>
                <div className="mt-4 flex justify-between items-center">
                  <p className="text-gray-700 text-sm">
                    {t("helpful")}
                  </p>
                  <div>
                    <button
                      onClick={() => handleFeedback(true)}
                      className="mr-2 bg-green-500 text-white rounded-full px-4 py-1 text-xs hover:bg-green-600 transition-colors"
                    >
                      {t("yes")}
                    </button>
                    <button
                      onClick={() => handleFeedback(false)}
                      className="bg-red-500 text-white rounded-full px-4 py-1 text-xs hover:bg-red-600 transition-colors"
                    >
                      {t("no")}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        {feedback && (
          <div className="mt-5 bg-gray-100 p-4 rounded-md text-center">
            <p className="text-gray-700">{feedback}</p>
            {feedback.includes("Chat") && (
              <button
                onClick={loadTawkToScript}
                className="mt-4 bg-sky-500 text-white rounded-full px-4 py-2 text-sm hover:bg-sky-600 transition-colors"
              >
                {t("openChat")}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
