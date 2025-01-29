"use client";
import React, { useState } from "react";
import { IoIosAdd, IoIosRemove } from "react-icons/io"; // Importing Add and Remove icons

const FaqContent = ({ t }) => {
  const [openIndex, setOpenIndex] = useState(null); // State to manage which question is open

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle visibility
  };

  const questions = [
    {
      question: t("faqSection.question1"),
      answer:
        t("faqSection.answer1"),
    },
    {
      question: t("faqSection.question2"),
      answer:
        t("faqSection.answer2"),
    },
    {
      question: t("faqSection.question3"),
      answer:
        t("faqSection.answer3"),
    },
    {
      question: t("faqSection.question4"),
      answer:
        t("faqSection.answer4"),
    },
    {
      question: t("faqSection.question5"),
      answer:
        t("faqSection.answer5"),
    },
    {
      question: t("faqSection.question6"),
      answer:
        t("faqSection.answer6"),
    },
    {
      question: t("faqSection.question7"),
      answer:
        t("faqSection.answer7"),
    },
    {
      question: t("faqSection.question8"),
      answer:
        t("faqSection.answer8"),
    },
    {
      question: t("faqSection.question9"),
      answer:
        t("faqSection.answer9"),
    },
    {
      question: t("faqSection.question10"),
      answer:
        t("faqSection.answer10"),
    },
  ];

  return (
    <div className="pt-20 pb-10 mb-10 p-2 w-full lg:w-[1000px] rounded-2xl rounded-t-0 mx-auto border border-t-0 lg:shadow-xl">
      <div className="md:w-[800px] w-full mx-auto">
        {questions.map((item, index) => (
          <div key={index}>
            <div
              className="flex items-center justify-between border-black cursor-pointer"
              onClick={() => toggleAnswer(index)}
            >
              {/* Question text */}
              <div className="flex items-center space-x-2">
                <p
                  className={`font-bold transition-colors duration-500 ${openIndex === index
                    ? "text-btnColorOne"
                    : "text-headingColor"
                    }`}
                >
                  {item.question}
                </p>
              </div>
              {/* Toggle between plus and minus icons */}
              {openIndex === index ? (
                <IoIosRemove className="text-btnColorOne transition-transform duration-500" />
              ) : (
                <IoIosAdd className="text-headingColor transition-transform duration-500" />
              )}
            </div>
            <div
              className={`overflow-hidden transition-[max-height] duration-1000 ease-in-out ${openIndex === index ? "max-h-40" : "max-h-0"
                }`}
            >
              <p className="text-paraColor text-sm my-2">{item.answer}</p>
            </div>
            {/* Conditional margin below the answer, but not for the last question */}
            {index !== questions.length - 1 && <div className="mb-10"></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqContent;