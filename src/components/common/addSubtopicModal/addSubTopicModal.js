"use client";
import React, { useEffect, useState } from "react";
import { createSubtopic } from "@/app/utils/admin/topics/api";
import { useTranslation } from "react-i18next";

const AddSubtopicModal = ({
  const: { t } = useTranslation(),
  isOpen,
  onClose,
  onSubtopicAdded,
  topicId,
  subtopic,
  onSubtopicEdited,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (subtopic) {
      setTitle(subtopic.title);
      setDescription(subtopic.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [subtopic]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (subtopic) {
        // Editing a subtopic
        const updatedSubtopic = { ...subtopic, title, description };
        await onSubtopicEdited(updatedSubtopic);
      } else {
        // Creating a new subtopic
        const newSubtopic = await createSubtopic(topicId, {
          title,
          description,
        });
        onSubtopicAdded(newSubtopic); // Update state locally if needed
      }
      // Optionally close the modal after submission
      window.location.reload();
      onClose();
    } catch (error) {
      alert("Error: " + error.message); // Handle error if needed
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white p-5 rounded-md shadow-lg">
        <h2 className="text-lg font-bold mb-4">
          {subtopic ?  t("addNewTopic.editTopic2") : t("addNewTopic.heading2")}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">{t("addNewTopic.title")}</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="border rounded-md w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">{t("addNewTopic.description")}</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded-md w-full p-2"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 bg-gray-300 p-2 rounded-md"
              onClick={onClose}
            >
              {t("modalButtons.cancel")}
            </button>
            <button
              type="submit"
              className={`bg-gradient-to-t from-btnColorOne to-btnColor text-white p-2 rounded-md ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading
                ? t("pleaseWait")
                : subtopic
                ? "Update Subtopic"
                :  t("modalButtons.addSubtopic")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSubtopicModal;
