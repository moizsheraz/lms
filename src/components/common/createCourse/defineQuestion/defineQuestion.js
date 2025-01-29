"use client";
import React, { useState } from "react";
import { FaCamera } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const DefineQuestion = ({ selectedExam, onAddQuestion }) => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    questionText: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    correctAnswer: "",
    questionImage: "",
    writeHint: "",
    hintImage: "", // New state for hint image
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  const [hintImagePreviewUrl, setHintImagePreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          questionImage: reader.result,
        }));
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleHintImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          hintImage: reader.result,
        }));
        setHintImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddQuestion = () => {
    const {
      questionText,
      option1,
      option2,
      option3,
      option4,
      correctAnswer,
      writeHint,
      questionImage,
      hintImage,
    } = formData;

    if (
      questionText &&
      option1 &&
      option2 &&
      option3 &&
      option4 &&
      correctAnswer
    ) {
      const newQuestion = {
        question: questionText,
        options: [option1, option2, option3, option4],
        correctIndex: parseInt(correctAnswer),
        hint: writeHint,
        questionImage: questionImage,
        hintImage: hintImage, // Include hint image
      };

      onAddQuestion(selectedExam, newQuestion);

      setFormData({
        questionText: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        correctAnswer: "",
        questionImage: "",
        writeHint: "",
        hintImage: "",
      });
      setPreviewUrl(null);
      setHintImagePreviewUrl(null); // Clear hint image preview
    }
  };

  return (
    <div>
      <label htmlFor="questionImage">Upload Question Image</label>
      <div className="relative w-full h-28 mt-1 mb-4 border rounded-md cursor-pointer">
        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={handleImageChange}
        />
        <div className="text-sm my-1 text-red-500">
          <span>{t("imageSize")}</span>
        </div>
        {!previewUrl ? (
          <>
            <FaCamera className="text-paraColor w-10 h-10 mx-auto mt-6" />
            <p className="text-paraColor text-xs my-1 text-center">
              Tap to Choose Image
            </p>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <img
              src={previewUrl}
              alt="Selected"
              className="w-16 h-16 object-cover"
            />
            <p className="text-xs mt-2 text-center text-paraColor">
              Image Selected
            </p>
          </div>
        )}
      </div>

      <label htmlFor="questionText">Question</label>
      <input
        name="questionText"
        value={formData.questionText}
        onChange={handleInputChange}
        className="outline-none w-full border rounded-md p-3 mt-1 mb-4"
        placeholder="Enter your question"
        id="questionText"
      />

      {/* Flex layout: 2 options per row */}
      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((num) => (
          <div key={num}>
            <label htmlFor={`option${num}`}>Option {num}</label>
            <input
              name={`option${num}`}
              value={formData[`option${num}`]}
              onChange={handleInputChange}
              className="outline-none w-full border rounded-md p-3 mt-1 mb-4"
              placeholder={`Option ${num}`}
              id={`option${num}`}
            />
          </div>
        ))}
      </div>

      <label htmlFor="correctAnswer">Correct Answer</label>
      <select
        name="correctAnswer"
        value={formData.correctAnswer}
        onChange={handleInputChange}
        className="outline-none w-full border rounded-md p-3 mt-1 mb-4"
        id="correctAnswer"
      >
        <option value="" disabled>
          Select the correct option
        </option>
        <option value="0">Option 1</option>
        <option value="1">Option 2</option>
        <option value="2">Option 3</option>
        <option value="3">Option 4</option>
      </select>

      <label htmlFor="writeHint">Hint (Optional)</label>
      <textarea
        name="writeHint"
        value={formData.writeHint}
        onChange={handleInputChange}
        className="outline-none w-full border rounded-md p-3 mt-1 mb-4"
        placeholder="Write a hint (if any)"
        id="writeHint"
      />

      {/* Optional: Hint Image Upload */}
      <label htmlFor="hintImage">Upload Hint Image (Optional)</label>
      <div className="relative w-full h-28 mt-1 mb-4 border rounded-md cursor-pointer">
        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={handleHintImageChange}
        />
        <div className="text-sm my-1 text-red-500">
          <span>{t("imageSize")}</span>
        </div>
        {!hintImagePreviewUrl ? (
          <>
            <FaCamera className="text-paraColor w-10 h-10 mx-auto mt-6" />
            <p className="text-paraColor text-xs my-1 text-center">
              Tap to Choose Hint Image
            </p>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <img
              src={hintImagePreviewUrl}
              alt="Hint Image"
              className="w-16 h-16 object-cover"
            />
            <p className="text-xs mt-2 text-center text-paraColor">
              Hint Image Selected
            </p>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={handleAddQuestion}
        className="w-32 p-2 bg-gradient-to-t from-btnColorOne to-btnColor text-white rounded-md mt-7"
      >
        Add Question
      </button>
    </div>
  );
};

export default DefineQuestion;
